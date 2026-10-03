
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Download, Linkedin, Github } from 'lucide-react'

export function Contact() {
  const [hover, setHover] = useState(false)

  return (
    <section style={{ padding: '150px 48px', textAlign: 'center', borderTop: '1px solid var(--border)', background: '#0C0C0E', transition: 'border-color 0.4s ease' }}>
      <h2 style={{ fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: 24, color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>
        Have something <span style={{ color: 'var(--accent-fg)', fontStyle: 'italic', transition: 'color 0.4s ease' }}>worth building?</span>
      </h2>
      <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 60, transition: 'color 0.4s ease' }}>
        I'm currently looking for UI/UX Designer roles. Let's make something effortless.
      </p>
      
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 80, flexWrap: 'wrap' }}>
        <motion.a href="mailto:yatinpatilyp07@gmail.com" data-cursor="view" data-label="EMAIL" 
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ padding: '20px 40px', background: 'var(--accent)', color: 'var(--accent-text)', borderRadius: 100, fontSize: 18, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 24px var(--accent-transparent)', transition: 'background 0.4s ease, color 0.4s ease' }}>
          Let's talk <motion.span animate={{ x: hover ? 5 : 0 }}><ArrowRight size={20} /></motion.span>
        </motion.a>
        
        <motion.a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ padding: '20px 40px', border: '1.5px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-hover)', borderRadius: 100, fontSize: 18, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'color 0.4s ease, border-color 0.4s ease' }}>
          Resume <Download size={20} />
        </motion.a>
      </div>

      <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        <a aria-label="LinkedIn Profile" href="https://www.linkedin.com/in/yatinpatil07" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)', transition: 'color 0.4s ease' }}><Linkedin size={28} /></a>
        <a aria-label="GitHub Profile" href="https://github.com/Yatin07" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)', transition: 'color 0.4s ease' }}><Github size={28} /></a>
      </div>
    </section>
  )
}
