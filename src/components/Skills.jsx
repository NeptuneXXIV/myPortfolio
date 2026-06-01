'use client';

import { motion } from 'framer-motion';
import { Layout, Server, Figma, Cpu, Code } from 'lucide-react';
import { useLanguage } from '../lib/Providers';

export default function Skills({ skills }) {
  const { t } = useLanguage();
  // Get unique categories from skills
  const uniqueCategories = [...new Set(skills.map(s => s.category || 'Other'))];

  // Map to dynamic categories structure
  const categories = uniqueCategories.map(catName => {
    const catSkills = skills.filter(s => (s.category || 'Other') === catName);
    
    // Determine glow color: use the color of the first skill, or fall back to cyan
    const firstSkill = catSkills[0];
    const glowColor = firstSkill?.glowColor || 'var(--accent-cyan)';
    
    // Set styles and icon
    let icon = <Cpu size={24} style={{ color: glowColor }} />;
    let glowStyle = `0 0 8px ${glowColor}50, inset 0 0 8px ${glowColor}10`;
    
    const lowerCat = catName.toLowerCase();
    if (lowerCat.includes('front') || lowerCat.includes('client') || lowerCat.includes('web')) {
      icon = <Layout size={24} style={{ color: glowColor }} />;
    } else if (lowerCat.includes('back') || lowerCat.includes('server') || lowerCat.includes('api') || lowerCat.includes('db') || lowerCat.includes('cloud')) {
      icon = <Server size={24} style={{ color: glowColor }} />;
    } else if (lowerCat.includes('ui') || lowerCat.includes('ux') || lowerCat.includes('figma') || lowerCat.includes('design')) {
      icon = <Figma size={24} style={{ color: glowColor }} />;
    } else if (lowerCat.includes('code') || lowerCat.includes('dev')) {
      icon = <Code size={24} style={{ color: glowColor }} />;
    }

    return {
      title: catName,
      icon,
      glowColor,
      glowStyle,
      skills: catSkills
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 55 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="skills">
      <div className="section-header">
        <span className="section-subtitle">{t.skills.subtitle}</span>
        <h2 className="section-title text-glow-cyan">{t.skills.title}</h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid-3"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="cyber-card"
            style={{
              border: `1px solid rgba(255, 255, 255, 0.05)`,
              boxShadow: cat.glowStyle
            }}
            whileHover={{ 
              y: -8, 
              borderColor: cat.glowColor,
              boxShadow: `0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px ${cat.glowColor}55`
            }}
          >
            {/* Cyber Decorative Corners */}
            <div className="cyber-corner corner-tl" style={{ borderColor: cat.glowColor }} />
            <div className="cyber-corner corner-tr" style={{ borderColor: cat.glowColor }} />
            <div className="cyber-corner corner-bl" style={{ borderColor: cat.glowColor }} />
            <div className="cyber-corner corner-br" style={{ borderColor: cat.glowColor }} />

            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                background: `${cat.glowColor}15`,
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${cat.glowColor}40`
              }}>
                {cat.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.3rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {cat.title}
              </h3>
            </div>

            {/* Skills List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cat.skills.map((skill, sIdx) => (
                <div key={skill.id || sIdx}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{ color: 'var(--text-primary)' }}>{skill.title}</span>
                    <span style={{ color: skill.glowColor || cat.glowColor }}>{skill.level}%</span>
                  </div>

                  {/* Progress Bar Container */}
                  <div style={{
                    height: '6px',
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {/* Glowing Fill */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                      style={{
                        height: '100%',
                        borderRadius: '3px',
                        background: skill.glowColor || cat.glowColor,
                        boxShadow: `0 0 8px ${skill.glowColor || cat.glowColor}`
                      }}
                    />
                  </div>
                </div>
              ))}
              
              {cat.skills.length === 0 && (
                <p style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  padding: '20px 0'
                }}>
                  NO_DATA_AVAILABLE
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
