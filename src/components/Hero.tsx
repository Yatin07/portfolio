
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const [btnHover, setBtnHover] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <motion.section id="hero" style={{ minHeight: '100vh', padding: '130px 48px 80px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', y, zIndex: 10 }}>
        
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 28 }}>
          UI/UX Designer
        </div>
        
        <h1 style={{
          fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1.05, letterSpacing: '-0.04em',
          fontWeight: 700, marginBottom: 24, maxWidth: 900, color: 'var(--text-main)'
        }}>
          Designing interfaces that feel completely{' '}
          <motion.span 
            whileHover={{ scale: 1.05, letterSpacing: '0.02em' }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            style={{ color: 'var(--accent)', fontStyle: 'italic', display: 'inline-block', cursor: 'none' }}
            data-cursor="view" data-label="EFFORTLESS"
          >
            effortless.
          </motion.span>
        </h1>

        <p style={{ fontSize: 20, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 600, marginBottom: 48, fontWeight: 400 }}>
          I'm Yatin, crafting intuitive, data-driven experiences for complex digital products.
        </p>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <motion.a href="#work" data-cursor="view" data-label="WORK"
            onMouseEnter={() => setBtnHover('work')} onMouseLeave={() => setBtnHover(null)} 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{
              background: 'var(--text-main)', color: 'var(--bg-main)', padding: '16px 32px',
              borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
            View Work <motion.span animate={{ x: btnHover === 'work' ? 5 : 0 }}><ArrowRight size={18} /></motion.span>
          </motion.a>
          <motion.a href="#about" 
            whileHover={{ opacity: 0.7 }}
            style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none' }}>
            About Me
          </motion.a>
        </div>
      </motion.div>

      {/* Decorative blurred blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: 400, height: 400, background: 'var(--accent)', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%', pointerEvents: 'none' }} />
    </motion.section>
  )
}
