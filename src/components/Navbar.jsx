'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Cpu, Sun, Moon, Monitor, Globe } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLanguage } from '../lib/Providers';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', href: '#home' },
    { id: 'skills', href: '#skills' },
    { id: 'projects', href: '#projects' },
    { id: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    setMounted(true);
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
      const offset = 80;
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

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
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
          background: scrolled ? 'var(--bg-card)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Logo */}
        <a href="#home" onClick={(e) => smoothScroll(e, 'home')} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--text-primary)',
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
                key={item.id}
                href={item.href}
                onClick={(e) => smoothScroll(e, targetId)}
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
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
                {t.nav[item.id]}
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '1px solid var(--border-color)', paddingLeft: '15px' }}>
            {/* Language Toggle */}
            <button onClick={toggleLanguage} style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              transition: 'all 0.3s'
            }}>
              <Globe size={14} />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button onClick={cycleTheme} style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                borderRadius: '4px',
                transition: 'all 0.3s'
              }}>
                {theme === 'system' ? <Monitor size={16} /> : theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

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
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(189, 0, 255, 0.4)';
              e.currentTarget.style.color = 'var(--accent-purple)';
            }}>
              <Cpu size={14} />
              <span>{t.nav.studio}</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            marginLeft: '20px',
            display: 'none'
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
        @media (max-width: 968px) {
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
              background: 'var(--bg-card)',
              backdropFilter: 'blur(16px)',
              borderLeft: '1px solid var(--accent-cyan)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
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
                  key={item.id}
                  href={item.href}
                  onClick={(e) => smoothScroll(e, targetId)}
                  style={{
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-color)'
                  }}
                >
                  {t.nav[item.id]}
                </a>
              );
            })}
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={toggleLanguage} style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: '6px',
                padding: '10px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
              }}>
                <Globe size={16} />
                <span>{lang.toUpperCase()}</span>
              </button>

              {mounted && (
                <button onClick={cycleTheme} style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-cyan)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  borderRadius: '4px',
                }}>
                  {theme === 'system' ? <Monitor size={20} /> : theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              )}
            </div>

            <Link href="/studio" onClick={() => setIsOpen(false)} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--text-primary)',
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
              <span>{t.nav.studio}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
