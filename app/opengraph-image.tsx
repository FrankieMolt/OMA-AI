import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            borderRadius: '24px',
            marginBottom: '40px',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        
        <h1
          style={{
            fontSize: '80px',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: '20px',
            textAlign: 'center',
            background: 'linear-gradient(to right, #fff, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          OMA Infrastructure
        </h1>
        
        <p
          style={{
            fontSize: '32px',
            color: '#a1a1aa',
            maxWidth: '800px',
            textAlign: 'center',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Build, deploy, and monitor autonomous AI agents at scale. The standard for agentic compute.
        </p>
      </div>
    ),
    { ...size }
  );
}