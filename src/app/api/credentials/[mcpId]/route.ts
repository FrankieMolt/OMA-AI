import { NextRequest, NextResponse } from 'next/server';
import { upsertCredential, getCredentialForMCP, deleteCredential } from '@/lib/db/sqlite';
import { encryptCredential, validateAPIKey } from '@/lib/credentials';

export const dynamic = 'force-dynamic';

function getWalletFromRequest(request: NextRequest): string | null {
  return request.headers.get('x-wallet-address') || null;
}

function validateHexAddress(addr: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(addr);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mcpId: string }> }
) {
  try {
    const wallet = getWalletFromRequest(request);
    if (!wallet || !validateHexAddress(wallet)) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 401 });
    }

    const mcpId = (await params).mcpId;
    const creds = getCredentialForMCP(wallet, mcpId);

    return NextResponse.json({
      success: true,
      mcp_id: mcpId,
      fields: creds.map(c => ({
        field_name: c.field_name,
        has_key: true,
        updated_at: c.updated_at,
      })),
    });
  } catch (error) {
    console.error('Credential get error:', error);
    return NextResponse.json({ error: 'Failed to fetch credentials' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ mcpId: string }> }
) {
  try {
    const wallet = getWalletFromRequest(request);
    if (!wallet || !validateHexAddress(wallet)) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 401 });
    }

    const body = await request.json();
    const { field_name, value } = body as { field_name: string; value: string };

    if (!field_name || typeof field_name !== 'string') {
      return NextResponse.json({ error: 'field_name is required' }, { status: 400 });
    }

    const validation = validateAPIKey(value || '', field_name);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const mcpId = (await params).mcpId;
    const payload = encryptCredential(value, wallet);

    upsertCredential({
      user_id: wallet,
      mcp_id: mcpId,
      field_name,
      encrypted_value: payload.encrypted_value,
      iv: payload.iv,
      auth_tag: payload.auth_tag,
    });

    return NextResponse.json({
      success: true,
      mcp_id: mcpId,
      field_name,
      message: field_name + ' saved and encrypted for ' + mcpId,
    });
  } catch (error) {
    console.error('Credential save error:', error);
    return NextResponse.json({ error: 'Failed to save credential' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ mcpId: string }> }
) {
  try {
    const wallet = getWalletFromRequest(request);
    if (!wallet || !validateHexAddress(wallet)) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fieldName = searchParams.get('field');

    if (!fieldName) {
      return NextResponse.json({ error: 'field query param required' }, { status: 400 });
    }

    const mcpId = (await params).mcpId;
    deleteCredential(wallet, mcpId, fieldName);

    return NextResponse.json({
      success: true,
      message: fieldName + ' deleted for ' + mcpId,
    });
  } catch (error) {
    console.error('Credential delete error:', error);
    return NextResponse.json({ error: 'Failed to delete credential' }, { status: 500 });
  }
}
