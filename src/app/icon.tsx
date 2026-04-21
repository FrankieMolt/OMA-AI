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
          background: '#09090B',
          borderRadius: '8px',
        }}
      >
        {/* Outer ring */}
        <svg width="32" height="32" viewBox="0 0 32 32" style={{ position: 'absolute' }}>
          <circle cx="16" cy="16" r="11" fill="none" stroke="#8B5CF6" strokeWidth="2.5" />
          <circle cx="16" cy="16" r="5" fill="#8B5CF6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
