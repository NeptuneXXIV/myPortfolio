'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../lib/Providers';

export default function Contact({ profile }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('idle');
        alert('Failed to transmit message payload.');
      }
    } catch (error) {
      console.error('Transmission error:', error);
      setStatus('idle');
      alert('Transmission failed. Network anomaly detected.');
    }
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact">
      <div className="section-header">
        <span className="section-subtitle">{t.contact.subtitle}</span>
        <h2 className="section-title text-glow-cyan">{t.contact.title}</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: '40px',
        width: '100%'
      }} className="contact-grid">
        
        {/* Left Side: System Metadata Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cyber-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxShadow: 'var(--glow-cyan-border)',
            border: '1px solid rgba(0, 170, 255, 0.1)'
          }}
        >
          <div className="cyber-corner corner-tl" />
          <div className="cyber-corner corner-tr" />
          <div className="cyber-corner corner-bl" />
          <div className="cyber-corner corner-br" />

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)'
          }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '15px', fontFamily: 'var(--font-header)' }}>
              NODE_INFO
            </h4>
            <p>NAME: <span style={{ color: 'var(--accent-cyan)' }}>{profile.name || 'NEO'}</span></p>
            <p>LOCATION: <span style={{ color: 'var(--accent-cyan)' }}>{profile.location || 'GRID_SECTOR_7'}</span></p>
            <p>EMAIL: <a href={`mailto:${profile.email}`} style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>{profile.email || 'neo@cyberstack.io'}</a></p>
            <p style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
              SECURE_HANDSHAKE: ACTIVE
            </p>
            <p>ENCRYPTION: AES_256_GCM</p>
          </div>

          <div style={{
            background: 'rgba(0, 170, 255, 0.05)',
            border: '1px dashed rgba(0, 170, 255, 0.2)',
            padding: '15px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '5px' }}>
              &gt; STATUS_LOG:
            </span>
            Waiting for payload dispatch. Fill out the terminal fields to transmit your message block.
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* Input Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }} className="form-row">
              
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter alias"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '12px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  className="cyber-input"
                />
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '12px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  className="cyber-input"
                />
              </div>
            </div>

            {/* Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                {t.contact.message}
              </label>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Transmission details..."
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  borderRadius: '4px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'all 0.3s'
                }}
                className="cyber-input"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-cyber"
              style={{
                alignSelf: 'start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                justifyContent: 'center',
                height: '50px'
              }}
            >
              {status === 'idle' && (
                <>
                  <Send size={18} />
                  <span>{t.contact.send}</span>
                </>
              )}
              {status === 'sending' && (
                <>
                  <Terminal size={18} className="spin-icon" />
                  <span>{t.contact.sending}</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-green)' }} />
                  <span style={{ color: 'var(--accent-green)' }}>TRANSMISSION_SUCCESSFUL</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Cyber Input Glow and Form responsiveness styles */}
      <style jsx global>{`
        .cyber-input:focus {
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 10px rgba(0, 170, 255, 0.25), inset 0 0 8px rgba(0, 170, 255, 0.05);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
