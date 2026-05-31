import React from 'react';
import { ArrowLeft, Cpu } from 'lucide-react';

export function StudioNavbar(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Custom Global Cyber Header */}
      <div style={{
        background: '#0a0f1f',
        borderBottom: '1px solid rgba(0, 170, 255, 0.2)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'monospace',
        height: '50px',
        boxSizing: 'border-box'
      }}>
        {/* Return Button */}
        <a 
          href="/" 
          style={{
            color: '#00aaff',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = '#00aaff'}
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </a>

        {/* CMS Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(189, 0, 255, 0.7)',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          <Cpu size={14} />
          <span>CYBER_CMS_NODE_V1.0</span>
        </div>
      </div>

      {/* Render the default Sanity Navbar directly below */}
      {props.renderDefault(props)}
    </div>
  );
}
