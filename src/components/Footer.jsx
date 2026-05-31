'use client';

import { Github, Instagram, Linkedin, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/Providers';

export default function Footer({ socials }) {
  const { t } = useLanguage();
  const socialLinks = [
    { icon: <Github size={20} />, url: socials?.github || 'https://github.com', label: 'GitHub' },
    { icon: <Instagram size={20} />, url: socials?.instagram || 'https://instagram.com', label: 'Instagram' },
    { icon: <Linkedin size={20} />, url: socials?.linkedin || 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer style={{
      borderTop: '1px solid rgba(0, 170, 255, 0.1)',
      background: 'rgba(10, 15, 31, 0.8)',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        zIndex: 5
      }}>
        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              style={{
                color: 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'var(--bg-secondary)',
                padding: '10px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              whileHover={{
                y: -4,
                color: 'var(--accent-cyan)',
                borderColor: 'var(--accent-cyan)',
                boxShadow: '0 0 10px rgba(0, 170, 255, 0.4)'
              }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Brand System Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <Cpu size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span>PORTFOLIO_NODE_SECURE</span>
        </div>

        {/* Copy */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          letterSpacing: '1.5px',
          textTransform: 'uppercase'
        }}>
          &copy; {new Date().getFullYear()} NEO // CORE. {t.footer.rights.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
