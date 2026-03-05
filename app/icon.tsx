import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          borderRadius: '50%',
        }}
      >
        <div style={{
          width: '80%',
          height: '80%',
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          fontFamily: 'sans-serif'
        }}>
          O
        </div>
      </div>
    ),
    { ...size }
  );
}