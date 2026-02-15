import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { supabase } from '@/lib/supabase';
import { buildShortUrl } from '@/lib/shortener';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;
    const { searchParams } = new URL(request.url);
    
    // Options
    const format = searchParams.get('format') || 'svg'; // svg, png
    const size = parseInt(searchParams.get('size') || '300');
    const color = searchParams.get('color') || '#000000';
    const bgColor = searchParams.get('bg') || '#FFFFFF';
    const errorCorrection = searchParams.get('errorCorrection') || 'M'; // L, M, Q, H
    
    
    
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Database not available in demo mode' },
        { status: 503 }
      );
    }
    
    // Fetch the link
    const { data: link, error: linkError } = await supabase
      .from('links')
      .select('short_code, custom_domain, is_active')
      .eq('short_code', shortCode)
      .single();
    
    if (linkError || !link) {
      return NextResponse.json(
        { success: false, error: 'Link not found' },
        { status: 404 }
      );
    }
    
    if (!link.is_active) {
      return NextResponse.json(
        { success: false, error: 'Link is inactive' },
        { status: 410 }
      );
    }
    
    const shortUrl = buildShortUrl(link.short_code, link.custom_domain);
    
    // Generate QR code
    const qrOptions: QRCode.QRCodeToStringOptions = {
      type: 'svg',
      width: size,
      margin: 2,
      color: {
        dark: color,
        light: bgColor
      },
      errorCorrectionLevel: errorCorrection as QRCode.QRCodeErrorCorrectionLevel
    };
    
    if (format === 'png') {
      const qrPngOptions: QRCode.QRCodeToBufferOptions = {
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: bgColor
        },
        errorCorrectionLevel: errorCorrection as QRCode.QRCodeErrorCorrectionLevel
      };
      
      const buffer = await QRCode.toBuffer(shortUrl, qrPngOptions);
      
      return new NextResponse(new Uint8Array(buffer), {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
          'Content-Disposition': `inline; filename="${shortCode}.png"`
        }
      });
    } else {
      const svgString = await QRCode.toString(shortUrl, qrOptions);
      
      return new NextResponse(svgString, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
          'Content-Disposition': `inline; filename="${shortCode}.svg"`
        }
      });
    }
    
  } catch (error) {
    console.error('QR code generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
