'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import Link from 'next/link';

export default function StudioPage() {
  const isConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'mock_project_id';

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1f', color: '#fff', fontFamily: 'monospace' }}>
      {!isConfigured && (
        <div style={{
          background: 'rgba(0, 170, 255, 0.1)',
          borderBottom: '2px solid #00aaff',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 0 15px rgba(0, 170, 255, 0.2)'
        }}>
          <h2 style={{ color: '#00aaff', margin: '0 0 10px 0', textShadow: '0 0 8px #00aaff' }}>
            ⚡ CMS MOCK MODE ACTIVE
          </h2>
          <p style={{ margin: '5px 0', fontSize: '14px', color: '#94a3b8' }}>
            Sanity CMS is currently running in fallback mode using local mock content. 
            To link this website to your live Sanity account:
          </p>
          <div style={{
            background: '#0d1527',
            padding: '12px',
            borderRadius: '6px',
            display: 'inline-block',
            textAlign: 'left',
            margin: '10px 0',
            border: '1px solid #1e293b',
            fontSize: '13px',
            lineHeight: '1.6'
          }}>
            1. Create a project at <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" style={{ color: '#00aaff' }}>sanity.io</a> or run <code style={{ color: '#00aaff' }}>npx sanity init</code><br />
            2. Grab your Project ID and add it to your <code style={{ color: '#00d4ff' }}>.env.local</code> file:<br />
            <code style={{ color: '#ffffff' }}>NEXT_PUBLIC_SANITY_PROJECT_ID=your_id_here</code>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Link href="/" style={{
              color: '#00aaff',
              textDecoration: 'none',
              border: '1px solid #00aaff',
              padding: '6px 15px',
              borderRadius: '4px',
              transition: 'all 0.3s',
              background: 'transparent'
            }} onMouseEnter={e => { e.target.style.background = '#00aaff'; e.target.style.color = '#000'; }}
               onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#00aaff'; }}>
              Back to Portfolio
            </Link>
          </div>
        </div>
      )}
      <NextStudio config={config} />
    </div>
  );
}
