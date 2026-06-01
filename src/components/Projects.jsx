'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../lib/Providers';

export default function Projects({ projects }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Extract all unique tags
  const allTags = ['ALL', ...new Set(projects.flatMap(p => p.tags || []))];

  // Filter projects
  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.tags && p.tags.includes(activeFilter));

  return (
    <section id="projects">
      <div className="section-header" style={{ display: 'flex', flexDirection: 'column', md: 'row', justifyContent: 'between', alignItems: 'start', md: 'center', marginBottom: '50px' }}>
        <div>
          <span className="section-subtitle">{t.projects.subtitle}</span>
          <h2 className="section-title text-glow-cyan">{t.projects.title}</h2>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginTop: '20px',
          fontFamily: 'var(--font-mono)',
          width: '100%'
        }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              style={{
                background: activeFilter === tag ? 'rgba(0, 170, 255, 0.15)' : 'rgba(13, 21, 39, 0.5)',
                color: activeFilter === tag ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: activeFilter === tag ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.05)',
                padding: '6px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.3s',
                boxShadow: activeFilter === tag ? 'var(--glow-cyan-border)' : 'none'
              }}
              onMouseEnter={e => {
                if (activeFilter !== tag) {
                  e.target.style.borderColor = 'rgba(0, 170, 255, 0.3)';
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={e => {
                if (activeFilter !== tag) {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <motion.div 
        layout
        className="grid-2"
        style={{ minHeight: '350px' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={project.id || project.title}
              className="cyber-card project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: 0,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
              }}
              whileHover={{
                y: -6,
                borderColor: 'var(--accent-cyan)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 170, 255, 0.2)'
              }}
            >
              {/* Sci-fi corners */}
              <div className="cyber-corner corner-tl" />
              <div className="cyber-corner corner-tr" />
              <div className="cyber-corner corner-bl" />
              <div className="cyber-corner corner-br" />

              {/* Project Image Panel */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '220px',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }} className="project-image-container">
                {/* Visual scanline or tech grid inside image container */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(rgba(0,170,255,0.1), transparent)',
                  zIndex: 2,
                  pointerEvents: 'none',
                  opacity: 0.3
                }} />
                
                {/* Render project image or a beautiful placeholder */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="proj-img"
                  />
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    gap: '10px',
                    color: 'var(--text-muted)'
                  }}>
                    <Layers size={40} style={{ color: 'var(--accent-cyan)' }} />
                    <span className="mono-font" style={{ fontSize: '0.85rem' }}>IMAGE_NOT_LOADED</span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
              }}>
                {/* Tech Tags */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '14px'
                }}>
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="mono-font"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--accent-cyan)',
                        background: 'rgba(0, 170, 255, 0.06)',
                        border: '1px solid rgba(0, 170, 255, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '3px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  letterSpacing: '0.5px'
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  flexGrow: 1
                }}>
                  {project.description}
                </p>

                {/* Project Links */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginTop: 'auto',
                  paddingTop: '15px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--accent-cyan)',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.target.style.color = 'var(--accent-cyan)'}
                    >
                      <ExternalLink size={14} />
                      <span>{t.projects.live}</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >
                      <Github size={14} />
                      <span>{t.projects.github}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Sci-fi zoom on image hover */}
      <style jsx global>{`
        .project-card:hover .proj-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
