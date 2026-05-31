'use client';

import { motion } from 'framer-motion';
import { Terminal, ShieldAlert, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero({ profile }) {
  const handleConnectClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '40px',
        alignItems: 'center',
        width: '100%'
      }} className="hero-container">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 170, 255, 0.08)',
            border: '1px solid rgba(0, 170, 255, 0.3)',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--accent-cyan)',
            boxShadow: 'var(--glow-cyan-border)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent-cyan)',
              boxShadow: 'var(--glow-cyan)',
              animation: 'pulse 2s infinite'
            }} />
            SYSTEMS: ONLINE
          </div>

          <h2 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            INIT_STATION // PORTFOLIO_V1
          </h2>

          <h1 style={{
            fontFamily: 'var(--font-header)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            letterSpacing: '-1px',
            marginBottom: '12px'
          }}>
            {profile.greeting || "Hi, I'm"} <span style={{ 
              color: 'var(--accent-cyan)',
              textShadow: '0 0 15px rgba(0,170,255,0.4)' 
            }}>{profile.name || 'NEO'}</span>
          </h1>

          <h3 className="mono-font text-glow-cyan" style={{
            fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
            color: '#fff',
            marginBottom: '20px',
            borderRight: '2px solid var(--accent-cyan)',
            width: 'fit-content',
            paddingRight: '8px',
            animation: 'blink 1s step-end infinite'
          }}>
            {profile.title || 'Full-Stack Developer'}
          </h3>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            maxWidth: '560px',
            marginBottom: '40px'
          }}>
            {profile.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a 
              href="#contact" 
              onClick={handleConnectClick} 
              className="btn-cyber"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Terminal size={18} />
              <span>Let's Connect</span>
            </a>
            
            <a 
              href="#projects" 
              className="btn-cyber"
              style={{ 
                color: 'var(--accent-purple)', 
                borderColor: 'var(--accent-purple)',
                boxShadow: 'var(--glow-purple-border)',
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(189, 0, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'var(--glow-purple)';
                e.currentTarget.style.textShadow = '0 0 8px rgba(189, 0, 255, 0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'var(--glow-purple-border)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              <span>View Projects</span>
            </a>
          </div>
        </motion.div>

        {/* Right: Glowing Avatar Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.25 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
          className="hero-avatar-wrapper"
        >
          {/* Sci-Fi Decorative Rings */}
          <div className="sci-fi-ring ring-outer" />
          <div className="sci-fi-ring ring-middle" />
          <div className="sci-fi-ring ring-inner" />

          {/* Hexagon Decorative Corners */}
          <div className="avatar-frame">
            <div style={{
              position: 'relative',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--accent-cyan)',
              boxShadow: '0 0 30px rgba(0, 170, 255, 0.6), inset 0 0 20px rgba(0, 170, 255, 0.3)',
              background: 'var(--bg-secondary)',
              zIndex: 5
            }}>
              <Image 
                src={profile.avatar || '/images/profile_glow.jpg'} 
                alt={profile.name || 'Neo Avatar'} 
                fill
                priority
                sizes="(max-width: 768px) 280px, 280px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          zIndex: 10
        }}
        onClick={(e) => {
          e.preventDefault();
          const next = document.getElementById('skills');
          if (next) window.scrollTo({ top: next.offsetTop - 80, behavior: 'smooth' });
        }}
      >
        <span>SCROLL_DOWN</span>
        <ChevronDown size={16} style={{ color: 'var(--accent-cyan)' }} />
      </motion.div>

      {/* Sci-Fi Decorative CSS */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.4; transform: scale(1); }
        }
        @keyframes rotate-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-counter-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: var(--accent-cyan); }
        }

        .sci-fi-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(0, 170, 255, 0.2);
          pointer-events: none;
        }

        .ring-outer {
          width: 380px;
          height: 380px;
          border: 1px dashed rgba(189, 0, 255, 0.25);
          animation: rotate-clockwise 30s linear infinite;
        }

        .ring-middle {
          width: 340px;
          height: 340px;
          border: 2px dotted rgba(0, 170, 255, 0.2);
          animation: rotate-counter-clockwise 20s linear infinite;
        }

        .ring-inner {
          width: 305px;
          height: 305px;
          border: 1px double rgba(0, 170, 255, 0.4);
          box-shadow: 0 0 15px rgba(0, 170, 255, 0.1);
        }

        .avatar-frame {
          position: relative;
          padding: 10px;
        }

        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 60px !important;
            padding-top: 40px;
          }
          .hero-container > div:first-child {
            order: 2;
          }
          .hero-avatar-wrapper {
            order: 1;
          }
          h3 {
            margin-left: auto;
            margin-right: auto;
          }
          .sci-fi-ring {
            transform: scale(0.8);
          }
          .ring-outer { width: 320px; height: 320px; }
          .ring-middle { width: 290px; height: 290px; }
          .ring-inner { width: 260px; height: 260px; }
          .avatar-frame div {
            width: 220px !important;
            height: 220px !important;
          }
        }
      `}</style>
    </section>
  );
}
