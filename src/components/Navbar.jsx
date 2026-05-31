'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = navItems.map(item => document.getElementById(item.href.replace('#', '')));
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: scrolled ? '15px 30px' : '25px 30px',
          background: scrolled ? 'rgba(10, 15, 31, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 170, 255, 0.15)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center'
        }}
      >
        {/* Logo */}
        <a href="#home" onClick={(e) => smoothScroll(e, 'home')} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#fff',
          textDecoration: 'none',
          fontFamily: 'var(--font-header)',
          fontSize: '1.2rem',
          fontWeight: '900',
          letterSpacing: '2px'
        }}>
          <Terminal size={22} style={{ color: 'var(--accent-cyan)', filter: 'drop-shadow(0 0 5px rgba(0,170,255,0.5))' }} />
          <span>NEO<span style={{ color: 'var(--accent-cyan)' }}>//</span>CORE</span>
        </a>

        {/* Desktop Nav Items */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          marginLeft: 'auto'
        }} className="desktop-menu">
          {navItems.map((item) => {
            const targetId = item.href.replace('#', '');
            const isActive = activeSection === targetId;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => smoothScroll(e, targetId)}
                style={{
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  position: 'relative',
                  padding: '5px 0',
                  transition: 'color 0.3s'
                }}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--accent-cyan)',
                      boxShadow: 'var(--glow-cyan)'
                    }}
                  />
                )}
              </a>
            );
          })}
          
          {/* Admin Studio link */}
          <Link href="/studio" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--accent-purple)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            border: '1px solid rgba(189, 0, 255, 0.4)',
            padding: '5px 12px',
            borderRadius: '4px',
            background: 'rgba(189, 0, 255, 0.05)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = 'var(--glow-purple)';
            e.currentTarget.style.borderColor = 'var(--accent-purple)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(189, 0, 255, 0.4)';
            e.currentTarget.style.color = 'var(--accent-purple)';
          }}>
            <Cpu size={14} />
            <span>STUDIO</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            marginLeft: '20px',
            display: 'none' // will be shown via CSS media queries
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* CSS overrides for desktop/mobile layouts */}
      <style jsx global>{`
        .desktop-menu {
          display: flex;
        }
        .mobile-toggle {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
            margin-left: auto !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '280px',
              height: '100vh',
              background: 'rgba(10, 15, 31, 0.95)',
              backdropFilter: 'blur(16px)',
              borderLeft: '1px solid rgba(0, 170, 255, 0.2)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
              zIndex: 999,
              padding: '100px 30px 40px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {navItems.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => smoothScroll(e, targetId)}
                  style={{
                    color: isActive ? 'var(--accent-cyan)' : '#fff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  {item.name}
                </a>
              );
            })}
            
            <Link href="/studio" onClick={() => setIsOpen(false)} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              border: '1px solid var(--accent-purple)',
              padding: '10px',
              borderRadius: '4px',
              background: 'rgba(189, 0, 255, 0.15)',
              marginTop: 'auto',
              boxShadow: 'var(--glow-purple-border)'
            }}>
              <Cpu size={16} />
              <span>CMS STUDIO</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
