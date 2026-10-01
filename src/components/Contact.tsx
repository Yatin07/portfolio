
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Download, Linkedin, Github } from 'lucide-react'

export function Contact() {
  const [hover, setHover] = useState(false)

  return (
    <section style={{ padding: '150px 48px', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'var(--bg-main)' }}>
      <h2 style={{ fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: 24 }}>
        Have something <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>worth building?</span>
      </h2>
      <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 60 }}>
        I'm currently looking for UI/UX Designer roles. Let's make something effortless.
      </p>
      
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 80, flexWrap: 'wrap' }}>
        <motion.a href="mailto:yatin@example.com" data-cursor="view" data-label="EMAIL" 
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ padding: '20px 40px', background: 'var(--text-main)', color: 'var(--bg-main)', borderRadius: 100, fontSize: 18, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          Let's talk <motion.span animate={{ x: hover ? 5 : 0 }}><ArrowRight size={20} /></motion.span>
        </motion.a>
        
        <motion.a href="/resume.pdf" target="_blank"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ padding: '20px 40px', border: '1.5px solid var(--border)', color: 'var(--text-main)', borderRadius: 100, fontSize: 18, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          Resume <Download size={20} />
        </motion.a>
      </div>

      <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        <a href="https://linkedin.com/in/yatin-patil" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><Linkedin size={28} /></a>
        <a href="https://github.com/Yatin07" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><Github size={28} /></a>
      </div>
    </section>
  )
}
