
'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Process } from '../components/Process'
import { SelectedWork } from '../components/SelectedWork'
import { BeyondPixels } from '../components/BeyondPixels'
import { About } from '../components/About'
import { HowIWork } from '../components/HowIWork'
import { Moments } from '../components/Moments'
import { Contact } from '../components/Contact'
import { ScrollCanvas } from '../components/ScrollCanvas'


const MAGIC_THEMES = [
  { id: 'portra', name: 'Portra (warm peach)', accent: '#FF9E7D', bgTrans: 'rgba(255, 158, 125, 0.18)' },
  { id: 'cinestill', name: 'CineStill (teal-orange)', accent: '#00E5FF', bgTrans: 'rgba(0, 229, 255, 0.18)' },
  { id: 'trix', name: 'Tri-X (monochrome)', accent: '#E0E0E0', bgTrans: 'rgba(224, 224, 224, 0.18)' },
  { id: 'velvia', name: 'Velvia (vivid green)', accent: '#00E676', bgTrans: 'rgba(0, 230, 118, 0.18)' },
  { id: 'purplehaze', name: 'Purple Haze (violet)', accent: '#9D4EDD', bgTrans: 'rgba(157, 78, 221, 0.18)' },
]

export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorMode, setCursorMode] = useState('default')
  const [cursorLabel, setCursorLabel] = useState('')
  const [themeIdx, setThemeIdx] = useState(-1)
  const [isMagicActive, setIsMagicActive] = useState(false)
  const [magicToast, setMagicToast] = useState<string | null>(null)

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerMagic = () => {
    // Cycle: 0 -> 1 -> 2 -> 3 -> 4 -> 5 (default off) -> 0...
    const nextIdx = (themeIdx + 1) % (MAGIC_THEMES.length + 1)
    setThemeIdx(nextIdx)

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)

    // Remove any inline overrides to allow CSS variables in globals.css to govern completely
    document.documentElement.style.removeProperty('--accent')
    document.documentElement.style.removeProperty('--accent-transparent')

    if (nextIdx < MAGIC_THEMES.length) {
      const active = MAGIC_THEMES[nextIdx]
      setIsMagicActive(true)
      document.documentElement.dataset.theme = active.id
      setMagicToast(`Film Stock: ${active.name}`)

      toastTimeoutRef.current = setTimeout(() => {
        setMagicToast(null)
      }, 2400)
    } else {
      setIsMagicActive(false)
      delete document.documentElement.dataset.theme
      setMagicToast('Reset to Default Stock')

      toastTimeoutRef.current = setTimeout(() => {
        setMagicToast(null)
      }, 2400)
    }
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      try {
        const target = e.target as HTMLElement | null
        if (target && typeof target.closest === 'function') {
          const viewEl = target.closest('[data-cursor]') as HTMLElement | null
          if (viewEl) {
            setCursorMode(viewEl.getAttribute('data-cursor') || 'default')
            setCursorLabel(viewEl.getAttribute('data-label') || '')
            return
          }
        }
      } catch { }
      setCursorMode('default')
      setCursorLabel('')
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 't') return
      if (e.ctrlKey || e.metaKey || e.altKey) return

      const target = e.target as HTMLElement | null
      const activeEl = document.activeElement as HTMLElement | null
      const targetTag = target?.tagName.toLowerCase() || ''
      const activeTag = activeEl?.tagName.toLowerCase() || ''

      if (
        ['input', 'textarea', 'select'].includes(targetTag) ||
        ['input', 'textarea', 'select'].includes(activeTag) ||
        target?.isContentEditable ||
        activeEl?.isContentEditable ||
        target?.getAttribute('contenteditable') === 'true' ||
        activeEl?.getAttribute('contenteditable') === 'true'
      ) {
        return
      }

      triggerMagic()
    }

    window.addEventListener('mousemove', onMouseMove, { capture: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('mousemove', onMouseMove, { capture: true })
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [themeIdx])

  return (
    <div style={{ background: 'transparent', color: 'var(--text-main)', minHeight: '100vh' }}>

      {/* Sticky Nav — clickable Magic button & white dark glass blur */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 200, backdropFilter: 'blur(16px)', background: 'rgba(5, 5, 5, 0.6)',
        borderBottom: '1px solid var(--border)',
        transition: 'border-color 0.4s ease'
      }}>
        <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>YATIN.</div>

        <button
          onClick={triggerMagic}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            background: 'var(--bg-hover)',
            border: '1px solid var(--accent)',
            borderRadius: 20,
            padding: '6px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 0 15px var(--accent-transparent)',
            transition: 'all 0.4s ease',
          }}
        >
          Press 'T' for magic ✨
        </button>
      </nav>

      {/* Floating Magic Toast */}
      <AnimatePresence>
        {magicToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: 84,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 300,
              padding: '10px 24px',
              borderRadius: 30,
              background: 'rgba(15, 15, 20, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--accent)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px var(--accent-transparent)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.05em',
              transition: 'color 0.4s ease, border-color 0.4s ease',
            }}
          >
            {magicToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <motion.div
        data-testid="custom-cursor"
        className="hide-on-mobile"
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999999,
          x: cursorPos.x, y: cursorPos.y, translateX: '-50%', translateY: '-50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <motion.div
          animate={{
            width: cursorMode === 'view' ? 80 : 12,
            height: cursorMode === 'view' ? 80 : 12,
            background: cursorMode === 'view' ? 'var(--accent)' : 'var(--text-primary)',
            opacity: cursorMode === 'view' ? 0.9 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {cursorMode === 'view' && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-text)', letterSpacing: '0.1em' }}>{cursorLabel}</span>}
        </motion.div>
      </motion.div>

      <ScrollCanvas />

      {/* Page sections — transparent background so background portrait face remains continuously visible */}
      <div style={{ position: 'relative', zIndex: 20, background: 'transparent' }}>
        <Process />
        <SelectedWork />
        <BeyondPixels />
        <About />
        <HowIWork />
        <Moments />
        <Contact />
      </div>

    </div>
  )
}

