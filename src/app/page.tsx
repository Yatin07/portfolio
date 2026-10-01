
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { SelectedWork } from '../components/SelectedWork'
import { BeyondPixels } from '../components/BeyondPixels'

export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorMode, setCursorMode] = useState('default')
  const [cursorLabel, setCursorLabel] = useState('')

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      const viewEl = target.closest('[data-cursor]') as HTMLElement
      if (viewEl) {
        setCursorMode(viewEl.getAttribute('data-cursor') || 'default')
        setCursorLabel(viewEl.getAttribute('data-label') || '')
      } else {
        setCursorMode('default')
        setCursorLabel('')
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Easter egg: T for Theme
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't') {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', newTheme)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
      
      {/* Sticky Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '24px 48px', display: 'flex', justifyContent: 'space-between', zIndex: 100, mixBlendMode: 'difference' }}>
         <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', color: '#fff' }}>YATIN.</div>
         <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', opacity: 0.6 }}>Press 'T' for magic</div>
      </nav>

      {/* Custom Cursor */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          x: cursorPos.x, y: cursorPos.y, translateX: '-50%', translateY: '-50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <motion.div 
          animate={{ 
            width: cursorMode === 'view' ? 80 : 12, 
            height: cursorMode === 'view' ? 80 : 12,
            background: cursorMode === 'view' ? 'var(--accent)' : 'var(--text-main)',
            opacity: cursorMode === 'view' ? 0.9 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {cursorMode === 'view' && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--bg-main)', letterSpacing: '0.1em' }}>{cursorLabel}</span>}
        </motion.div>
      </motion.div>

      <Hero />
      <Process />
      <SelectedWork />
      <BeyondPixels />
      
      {/* Contact Section placeholder */}
      <section style={{ padding: '150px 48px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: 40 }}>
          Have something <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>worth building?</span>
        </h2>
        <a href="mailto:yatin@example.com" data-cursor="view" data-label="EMAIL" style={{
          padding: '20px 40px', background: 'var(--text-main)', color: 'var(--bg-main)', borderRadius: 100, fontSize: 18, fontWeight: 600, textDecoration: 'none', display: 'inline-block'
        }}>Let's talk</a>
      </section>

    </div>
  )
}
