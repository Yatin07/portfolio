"use client";
import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

/* ─── Custom Cursor ─── */
function CustomCursor() {
  const [mode, setMode] = useState('default')
  const [label, setLabel] = useState('VIEW')
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const c = target.closest('[data-cursor]') as HTMLElement | null;
      if (c) { setMode(c.dataset.cursor || 'default'); setLabel(c.dataset.label || 'VIEW') }
    }
    const onLeave = () => setMode('default')
    
    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('[data-cursor], a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    
    const savedTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)

    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <>
      <motion.div style={{
        position: 'fixed', left: cursorX, top: cursorY, width: 8, height: 8, background: 'var(--text-main)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999, x: '-50%', y: '-50%',
        opacity: mode === 'view' ? 0 : 1
      }} />
      <motion.div style={{
        position: 'fixed', left: cursorXSpring, top: cursorYSpring, pointerEvents: 'none', zIndex: 9998, x: '-50%', y: '-50%',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: mode === 'view' ? 'var(--accent)' : 'transparent',
        border: mode === 'view' ? 'none' : '1.5px solid var(--border)',
        boxShadow: mode === 'view' ? '0 0 20px var(--accent-transparent)' : 'none',
        backdropFilter: mode === 'view' ? 'none' : 'blur(2px)'
      }} animate={{
        width: mode === 'view' ? 72 : 36, height: mode === 'view' ? 72 : 36,
      }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        {mode === 'view' && <motion.span initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} style={{ fontSize: 10, color: 'var(--card-bg)', fontWeight: 700, letterSpacing: '0.1em' }}>{label}</motion.span>}
      </motion.div>
    </>
  )
}
/* ─── Scroll Progress ─── */
function ScrollProgress() {
  const sections = ['Home', 'Work', 'About', 'Playground', 'Contact']
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
      const scrollY = window.scrollY + window.innerHeight / 2
      const ids = ['hero', 'work', 'about', 'playground', 'contact']
      let cur = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) cur = i
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 16, zIndex: 50, alignItems: 'flex-end',
    }} className="hidden lg:flex">
      <div style={{ position: 'absolute', right: 2.5, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
      <div style={{
        position: 'absolute', right: 2.5, top: 0, width: 1,
        height: `${progress}%`, background: 'var(--accent)', transition: 'height 0.1s',
      }} />
      {sections.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
          <span style={{
            fontSize: 9, letterSpacing: '0.1em', color: active === i ? 'var(--accent)' : 'var(--text-light)',
            transition: 'color 0.2s', fontWeight: active === i ? 600 : 400,
          }}>{s.toUpperCase()}</span>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: active === i ? 'var(--accent)' : 'var(--border)',
            border: active === i ? '1.5px solid #3157E8' : '1.5px solid #D0D0CA',
            transition: 'all 0.2s',
          }} />
        </div>
      ))}
    </div>
  )
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Playground', href: '#playground' },
    { label: 'Beyond Code', href: '#beyond-code' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = ['work', 'about', 'playground', 'beyond-code', 'contact']
      const scrollY = window.scrollY + 80
      let cur = ''
      ids.forEach(id => { const el = document.getElementById(id); if (el && el.offsetTop <= scrollY) cur = id })
      setActiveSection(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '12px 48px' : '22px 48px',
      background: scrolled ? 'var(--bg-nav)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #E0E0DA' : '1px solid transparent',
      transition: 'all 0.35s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#hero" style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: 'var(--text-main)', textDecoration: 'none', textTransform: 'uppercase' }}>
        Yatin Patil
      </a>
      <div className="hidden md:flex" style={{ gap: 36, alignItems: 'center' }}>
        {links.map(l => {
          const id = l.href.slice(1)
          const isActive = activeSection === id
          return (
            <a key={l.label} href={l.href} style={{
              fontSize: 13, color: isActive ? 'var(--accent)' : 'var(--text-secondary)', textDecoration: 'none',
              position: 'relative', paddingBottom: 4, fontWeight: isActive ? 500 : 400,
              transition: 'color 0.2s',
            }}>
              {l.label}
              <span style={{
                position: 'absolute', bottom: 0, left: 0,
                width: isActive ? '100%' : '0%', height: 1.5, background: 'var(--accent)',
                transition: 'width 0.2s', borderRadius: 1,
              }} />
            </a>
          )
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e66' }} />
          <span className="hidden md:block" style={{ fontSize: 12, color: 'var(--text-muted)' }}>Open to opportunities</span>
        </div>
        <a href="#contact" className="hidden md:block" style={{
          fontSize: 13, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none',
          border: '1.5px solid #3157E820', padding: '6px 14px', borderRadius: 5,
          transition: 'border-color 0.2s',
        }}>
          Contact ↗
        </a>        <button onClick={() => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }} style={{ background: 'transparent', border: '1.5px solid var(--border)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'none', marginLeft: 16 }}>
            <span className='dark-icon' style={{ fontSize: 14 }}>🌓</span>
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"
          style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'none', color: 'var(--text-main)', lineHeight: 1 }}>
          {menuOpen ? '×' : '≡'}
        </button>
      </div>
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--bg-main)', zIndex: 99,
          display: 'flex', flexDirection: 'column', padding: '100px 48px', gap: 36,
        }}>
          {[...links, { label: 'Contact ↗', href: '#contact' }].map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: 36, fontWeight: 600, color: l.label.includes('Contact') ? 'var(--accent)' : 'var(--text-main)',
              textDecoration: 'none', letterSpacing: '-0.02em',
            }}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─── Hero Diagram (organic layout) ─── */
function HeroDiagram() {
  const [active, setActive] = useState<string | null>(null)
  const nodes = [
    { id: 'problem', label: 'Problem', x: 50, y: 10, desc: 'Understanding what actually needs solving.', sub: 'Not the symptom — the root cause.' },
    { id: 'data', label: 'Data', x: 75, y: 35, desc: 'Finding patterns that actually matter.', sub: 'CelebA, custom datasets, real-world sources.' },
    { id: 'model', label: 'Model', x: 30, y: 55, desc: 'Testing different approaches before committing.', sub: 'CNN, RAG, XGBoost — chosen with reason.' },
    { id: 'product', label: 'Product', x: 60, y: 78, desc: 'Turning the technical solution into something usable.', sub: 'FastAPI + React, clean UX, real users.' },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: 280 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 100" preserveAspectRatio="none">
        {[
          [nodes[0], nodes[1]], [nodes[1], nodes[2]], [nodes[2], nodes[3]], [nodes[0], nodes[2]],
        ].map(([a, b], i) => (
          <line key={i}
            x1={a.x} y1={a.y + 5} x2={b.x} y2={b.y + 5}
            stroke={active === a.id || active === b.id ? 'var(--accent)' : 'var(--border)'}
            strokeWidth="0.5" strokeDasharray={active === a.id || active === b.id ? '0' : '2,2'}
            style={{ transition: 'stroke 0.2s' }}
          />
        ))}
      </svg>
      {nodes.map(n => (
        <div key={n.id}
          onMouseEnter={() => setActive(n.id)}
          onMouseLeave={() => setActive(null)}
          style={{
            position: 'absolute', left: `${n.x}%`, top: `${n.y}%`,
            transform: `translate(-50%,-50%) scale(${active === n.id ? 1.05 : 1})`,
            transition: 'transform 0.2s',
            zIndex: active === n.id ? 10 : 1,
            cursor: 'none',
          }}>
          <div style={{
            padding: '7px 16px',
            background: active === n.id ? 'var(--accent)' : 'var(--card-bg)',
            color: active === n.id ? 'var(--card-bg)' : 'var(--text-main)',
            border: `1.5px solid ${active === n.id ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 5, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
            boxShadow: active === n.id ? '0 4px 16px #3157E820' : '0 1px 4px #0000000a',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}>
            {n.label}
          </div>
          {active === n.id && (
            <div style={{
              position: 'absolute', top: '120%', left: '50%', transform: 'translateX(-50%)',
              background: 'var(--text-main)', color: 'var(--card-bg)', padding: '10px 14px',
              borderRadius: 6, fontSize: 11, lineHeight: 1.5, width: 190,
              textAlign: 'left', zIndex: 20,
            }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{n.desc}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>{n.sub}</div>
            </div>
          )}
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--text-light)', textTransform: 'uppercase' }}>
          Hover to explore
        </div>
      </div>
    </div>
  )
}

/* ─── Hero ─── */
function Hero() {
  const [btnHover, setBtnHover] = useState<string | null>(null)

  return (
    <motion.section id="hero" style={{ minHeight: '100vh', padding: '130px 48px 80px', display: 'flex', alignItems: 'center' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 80, alignItems: 'center' }}>

        {/* Left */}
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 28 }}>
            Portfolio — 2026
          </div>
          <h1 style={{
            fontSize: 'clamp(44px,5.5vw,82px)', lineHeight: 1.04, letterSpacing: '-0.03em',
            fontWeight: 600, marginBottom: 28, maxWidth: 600,
          }}>
            I build things that turn{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>problems</span>{' '}
            into{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>products.</span>
          </h1>

          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {[
              { tag: 'AI / ML', active: true },
              { tag: 'DATA', active: false },
              { tag: 'SOFTWARE', active: false },
            ].map(t => (
              <span key={t.tag} style={{
                fontSize: 11, letterSpacing: '0.1em', fontWeight: 600, padding: '5px 12px',
                borderRadius: 4,
                border: `1.5px solid ${t.active ? 'var(--accent)' : 'var(--border)'}`,
                color: t.active ? 'var(--accent)' : 'var(--text-muted)',
                background: t.active ? '#3157E808' : 'transparent',
              }}>{t.tag}</span>
            ))}
          </div>

          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.68, maxWidth: 480, marginBottom: 48 }}>
            I&apos;m Yatin — an Information Technology student exploring AI/ML, data science and software development through real projects, experiments and constant iteration.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#work"
              onMouseEnter={() => setBtnHover('work')}
              onMouseLeave={() => setBtnHover(null)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: btnHover === 'work' ? 'var(--accent)' : 'var(--text-main)',
                color: 'var(--card-bg)', padding: '13px 26px',
                borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                transform: btnHover === 'work' ? 'translateY(-1px)' : 'none',
              }}>
              Explore my work
              <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: btnHover === 'work' ? 'translateY(2px)' : 'none' }}>↓</span>
            </a>
            <a href="#about"
              onMouseEnter={() => setBtnHover('about')}
              onMouseLeave={() => setBtnHover(null)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: `1.5px solid ${btnHover === 'about' ? 'var(--accent)' : 'var(--border-dark)'}`,
                color: btnHover === 'about' ? 'var(--accent)' : 'var(--text-main)',
                padding: '13px 26px', borderRadius: 6, fontSize: 14, fontWeight: 500,
                textDecoration: 'none', transition: 'all 0.2s',
              }}>
              About me
              <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: btnHover === 'about' ? 'translate(2px,-2px)' : 'none' }}>↗</span>
            </a>
          </div>
        </div>

        {/* Right panel */}
        <div className="hidden lg:block">
          <div style={{
            background: 'var(--bg-alt)', border: '1px solid #E0E0DA', borderRadius: 14,
            padding: '32px 28px', position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Currently building</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>AI / Data / Software</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 1, height: 32, background: 'var(--accent)', borderRadius: 1 }} />
                <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em' }}>
                  Selected<br />experiments
                </div>
              </div>
            </div>
            <HeroDiagram />
          </div>
        </div>

      </div>
    </motion.section>
  )
}

/* ─── Process ─── */
function Process() {
  const [active, setActive] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const steps = [
    { n: '01', label: 'PROBLEM', desc: 'Start with the actual problem. Understand what is broken, what is missing, what the user actually needs. Not the first solution that comes to mind.' },
    { n: '02', label: 'APPROACH', desc: 'Explore at least two or three different paths before choosing one. The first idea is rarely the best one. Document the reasoning.' },
    { n: '03', label: 'BUILD', desc: 'Turn the selected approach into a working system. Ship something small, learn from it, then improve. Avoid perfecting before validating.' },
    { n: '04', label: 'RESULT', desc: 'Something that works for the people it was built for — not just technically correct, but useful in practice.' },
    { n: '05', label: 'LEARNING', desc: 'What changed in how I think. Every project leaves a new mental model, a new constraint discovered, a new approach filed away.' },
  ]

  return (
    <motion.section style={{ padding: '80px 48px', background: 'var(--bg-alt)', borderTop: '1px solid #E0E0DA', borderBottom: '1px solid #E0E0DA' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <p style={{ fontSize: 'clamp(20px,2.5vw,32px)', lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--text-main)', marginBottom: 8 }}>
            I don&apos;t just show the final result.
            <br />I show the thinking behind it.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Click any step to expand.</p>
        </div>

        <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
          {steps.map((s, i) => {
            const isExp = expanded === i
            return (
              <div key={s.label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setExpanded(isExp ? null : i)}
                style={{
                  flex: isExp ? '2 1 260px' : '1 1 120px',
                  padding: '24px 20px',
                  borderLeft: i > 0 ? '1px solid #E0E0DA' : 'none',
                  borderTop: `3px solid ${active === i || isExp ? 'var(--accent)' : 'transparent'}`,
                  background: isExp ? 'var(--card-bg)' : active === i ? 'var(--bg-hover)' : 'transparent',
                  cursor: 'none',
                  transition: 'all 0.3s',
                  overflow: 'hidden',
                }}>
                <div style={{ fontSize: 10, letterSpacing: '0.1em', color: active === i || isExp ? 'var(--accent)' : 'var(--text-light)', marginBottom: 10, transition: 'color 0.2s' }}>
                  {s.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.06em', color: 'var(--text-main)', marginBottom: isExp ? 16 : 0 }}>
                  {s.label}
                </div>
                {isExp && (
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: 8, maxWidth: 320 }}>
                    {s.desc}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

/* ─── AI Mockup ─── */
function AIMockup() {
  return (
    <div style={{ width: '100%', maxWidth: 520, background: 'var(--card-bg)', borderRadius: 12, border: '1px solid #E0E0DA', overflow: 'hidden', fontSize: 12, boxShadow: '0 8px 40px #00000010' }}>
      <div style={{ background: 'var(--bg-main)', padding: '10px 16px', borderBottom: '1px solid #E0E0DA', display: 'flex', gap: 7, alignItems: 'center' }}>
        {['#FF5F57','#FEBC2E','#27C93F'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.04em' }}>AI Face Attribute Scanner</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.06em' }}>FEATURED PROJECT</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '20px', borderRight: '1px solid #E0E0DA' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>Input</div>
          <div style={{ background: 'var(--bg-alt)', borderRadius: 8, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, border: '1.5px dashed #D0D0CA' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>⬆</div>
              <div style={{ fontSize: 10, color: 'var(--text-light)' }}>Upload image</div>
            </div>
          </div>
          <div style={{ background: 'var(--accent)', color: 'var(--card-bg)', borderRadius: 5, padding: '8px', textAlign: 'center', fontSize: 11, fontWeight: 600 }}>
            Analyze →
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>Predictions</div>
          {[['Age', '24', 88], ['Gender', 'Male', 94], ['Smile', 'Yes', 72], ['Glasses', 'No', 91], ['Hair', 'Dark', 83]].map(([a, v, c]) => (
            <div key={a as string} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-muted)' }}>{a}</span>
                <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 11 }}>{v} <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>{c}%</span></span>
              </div>
              <div style={{ height: 3, background: 'var(--bg-alt)', borderRadius: 2 }}>
                <div style={{ height: 3, width: `${c}%`, background: `hsl(${220 + (100 - +c)},80%,55%)`, borderRadius: 2, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid #E0E0DA', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 10, letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>01 / Computer Vision</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--accent)', fontWeight: 600 }}>PyTorch · CNN · CelebA</span>
      </div>
    </div>
  )
}

/* ─── RAG Diagram ─── */
function RAGDiagram() {
  const [hovered, setHovered] = useState<number | null>(null)
  const nodes = [
    { label: 'Document', desc: 'PDFs, text files, web pages — raw input.' },
    { label: 'Chunking', desc: 'Split into semantically meaningful segments.' },
    { label: 'Embeddings', desc: 'Vector representation of meaning.' },
    { label: 'FAISS', desc: 'Fast nearest-neighbor similarity search.' },
    { label: 'LLM', desc: 'Generates answer grounded in retrieved context.' },
    { label: 'Answer', desc: 'Accurate, document-grounded response.' },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center', padding: '20px 0' }}>
      {nodes.map((n, i) => (
        <div key={n.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{
              padding: '8px 14px', border: `1.5px solid ${hovered === i ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'none',
              background: hovered === i ? 'var(--accent)' : 'var(--card-bg)',
              color: hovered === i ? 'var(--card-bg)' : 'var(--text-main)',
              transition: 'all 0.15s', position: 'relative',
            }}>
            {n.label}
            {hovered === i && (
              <div style={{
                position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)',
                background: 'var(--text-main)', color: 'var(--card-bg)', padding: '8px 12px',
                borderRadius: 5, fontSize: 11, width: 180, textAlign: 'center', lineHeight: 1.4,
                zIndex: 10, whiteSpace: 'normal',
              }}>{n.desc}</div>
            )}
          </div>
          {i < nodes.length - 1 && <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700 }}>→</span>}
        </div>
      ))}
    </div>
  )
}

/* ─── Complaint Mockup ─── */
function ComplaintMockup() {
  return (
    <div style={{ width: '100%', maxWidth: 420, background: 'var(--card-bg)', border: '1px solid #E0E0DA', borderRadius: 10, overflow: 'hidden', fontSize: 12, boxShadow: '0 4px 20px #00000008' }}>
      <div style={{ background: 'var(--accent)', color: 'var(--card-bg)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Hostel CMS</div>
          <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>Role-based complaint management</div>
        </div>
        <div style={{ fontSize: 10, background: '#ffffff20', padding: '4px 10px', borderRadius: 4, fontWeight: 600 }}>Admin</div>
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>Recent complaints</div>
        {[
          { id: '#042', issue: 'Water leakage – Room 204', status: 'Resolved', color: '#22c55e' },
          { id: '#041', issue: 'Broken fan – Room 118', status: 'In Progress', color: '#f59e0b' },
          { id: '#040', issue: 'Wi-Fi issue – Block B', status: 'Open', color: 'var(--accent)' },
        ].map(c => (
          <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F1ED' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>{c.issue}</div>
              <div style={{ color: 'var(--text-light)', fontSize: 10, marginTop: 2 }}>{c.id}</div>
            </div>
            <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: `${c.color}18`, color: c.color, fontWeight: 700, flexShrink: 0 }}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Project Card ─── */
function ProjectCard({ num, title, category, desc, tech, mockup, liveUrl }: {
  num: string; title: string; category: string; desc: string; tech: string[]; mockup: React.ReactNode; liveUrl?: string
}) {
  const [hovered, setHovered] = useState(false)
  const process = ['Problem', 'Approach', 'Build', 'Result']

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      data-cursor="view" data-label="VIEW"
      style={{
        border: `1px solid ${hovered ? 'var(--border-dark)' : 'var(--border)'}`,
        borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 8px 32px #00000010' : '0 1px 4px #00000006',
        background: 'var(--card-bg)', cursor: 'none',
      }}>
      {/* Mockup */}
      <div style={{
        background: 'var(--bg-main)', borderBottom: '1px solid #E0E0DA',
        padding: '48px', minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
        transition: 'transform 0.4s ease',
        overflow: 'hidden',
      }}>
        {mockup}
      </div>
      {/* Info */}
      <div style={{ padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-light)', fontWeight: 600 }}>{num}</span>
              <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 600 }}>{category}</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', marginBottom: 10 }}>{title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 500, marginBottom: 20 }}>{desc}</p>
            {/* Process trail */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              {process.map((p, i) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-light)', letterSpacing: '0.04em' }}>{p}</span>
                  {i < process.length - 1 && <span style={{ color: 'var(--accent)', fontSize: 10 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 280 }}>
              {tech.map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: '4px 10px', border: '1px solid #E0E0DA',
                  borderRadius: 4, color: 'var(--text-muted)',
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontSize: 12, color: 'var(--card-bg)', fontWeight: 600,
                    background: 'var(--accent)', padding: '6px 14px', borderRadius: 5,
                    textDecoration: 'none', letterSpacing: '0.04em',
                    opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
                  }}>
                  Live demo ↗
                </a>
              )}
              <div style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
                View case study →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Work ─── */
function Work() {
  const projects = [
    { num: '01', title: 'AI Face Attribute Scanner', category: 'COMPUTER VISION / AI / ML', desc: 'A computer vision application that predicts multiple facial attributes from an uploaded image using a CNN trained on the CelebA dataset.', tech: ['Python', 'PyTorch', 'CNN', 'FastAPI', 'React'], mockup: <AIMockup />, liveUrl: 'https://realtime-face-analysis.vercel.app/' },
    { num: '02', title: 'LLM Document Query System', category: 'LLM / RAG / INFORMATION RETRIEVAL', desc: 'A document question-answering system that retrieves relevant information from documents before generating an answer using a language model.', tech: ['Python', 'FAISS', 'LangChain', 'FastAPI'], mockup: <RAGDiagram /> },
    { num: '03', title: 'Hostel Complaint Management', category: 'FULL STACK / REAL-TIME', desc: 'A role-based complaint management system that simplifies issue reporting and tracking between students and hostel administration.', tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'], mockup: <ComplaintMockup /> },
  ]
  return (
    <motion.section id="work" style={{ padding: '100px 48px' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Selected Work</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', maxWidth: 500, lineHeight: 1.1 }}>
              A few problems I&apos;ve spent time trying to solve.
            </h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 280, lineHeight: 1.6 }}>
            Each project has a story behind it — not just a technical description.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {projects.map(p => <ProjectCard key={p.num} {...p} />)}
        </div>
        <div style={{ marginTop: 40, fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          The next experiment is probably already in progress.
        </div>
      </div>
    </motion.section>
  )
}

/* ─── About ─── */
function About() {
  return (
    <motion.section id="about" style={{ padding: '100px 48px', background: 'var(--bg-alt)', borderTop: '1px solid #E0E0DA', borderBottom: '1px solid #E0E0DA' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ background: 'var(--border)', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/5', border: '1px solid #D0D0CA' }}>
            <img src="/src/assets/yatin.jpg"
              alt="Yatin Patil" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <div style={{
            position: 'absolute', bottom: -16, right: -16, background: 'var(--card-bg)',
            border: '1px solid #E0E0DA', padding: '12px 18px', borderRadius: 8,
          }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 3 }}>Yatin Patil / 2026</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>Navi Mumbai, India</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>About</div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>More than the code.</h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
            I&apos;m Yatin, an Information Technology student interested in building practical systems using AI, data and software.
          </p>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
            I enjoy taking an idea apart, understanding how it works, experimenting with different approaches and turning it into something people can actually use.
          </p>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 40 }}>
            I care about the intersection of good engineering and good design — not just solving problems, but solving them in ways that feel right.
          </p>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1.5px solid #171717', color: 'var(--text-main)', padding: '12px 24px',
            borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>Let&apos;s connect ↗</a>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── Exploring ─── */
function Exploring() {
  const [active, setActive] = useState<number | null>(null)
  const items = [
    { n: '01', label: 'AI / ML', desc: 'Neural architectures, training pipelines, model evaluation and the gap between theory and practice.', project: 'AI Face Attribute Scanner' },
    { n: '02', label: 'Data Science', desc: 'Statistical reasoning, exploratory analysis and turning messy data into clean insight.', project: '' },
    { n: '03', label: 'Computer Vision', desc: 'Exploring how machine learning can extract useful information from images.', project: 'AI Face Attribute Scanner' },
    { n: '04', label: 'LLMs', desc: 'Learning how retrieval, embeddings and language models work together.', project: 'LLM Document Query System' },
    { n: '05', label: 'Full Stack', desc: 'Connecting models to real interfaces — APIs, databases, deployment.', project: 'Hostel Complaint Management' },
    { n: '06', label: 'UI/UX', desc: 'Designing interfaces that make technical systems easier to understand and use.', project: '' },
  ]

  return (
    <motion.section style={{ padding: '100px 48px', borderTop: '1px solid #E0E0DA' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Currently exploring</div>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>Currently exploring</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid #E0E0DA' }}>
          {items.map((item, i) => {
            const isActive = active === i
            return (
              <div key={item.label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 24, padding: '20px 0',
                  borderBottom: '1px solid #E0E0DA', cursor: 'none',
                  background: isActive ? 'var(--bg-main)' : 'transparent',
                  paddingLeft: isActive ? 16 : 0,
                  transition: 'background 0.2s, padding 0.2s',
                }}>
                <div style={{ fontSize: 10, color: isActive ? 'var(--accent)' : 'var(--text-light)', letterSpacing: '0.08em', fontWeight: 600, paddingTop: 4, minWidth: 28, transition: 'color 0.2s' }}>
                  {item.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 'clamp(18px,2vw,26px)', fontWeight: 600, letterSpacing: '-0.01em',
                    color: isActive ? 'var(--accent)' : 'var(--text-main)', transition: 'color 0.2s',
                  }}>{item.label}</div>
                  {isActive && (
                    <div style={{ marginTop: 8 }}>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 480 }}>{item.desc}</p>
                      {item.project && (
                        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.04em' }}>
                          Used in: {item.project}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 18, color: isActive ? 'var(--accent)' : 'var(--border)', transition: 'color 0.2s, transform 0.2s', transform: isActive ? 'rotate(0deg)' : 'rotate(-90deg)', paddingTop: 4 }}>
                  ↓
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

/* ─── Skills ─── */
function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; info: string; project: string } | null>(null)
  const cats = [
    { name: 'PROGRAMMING', skills: [
      { name: 'Python', info: 'Primary language', project: 'All AI/ML projects' },
      { name: 'Java', info: 'Backend systems', project: 'Algorithms, OOP' },
      { name: 'SQL', info: 'Data querying', project: 'Hostel CMS, analytics' },
      { name: 'JavaScript', info: 'Web frontend', project: 'React frontends' },
    ]},
    { name: 'AI / ML', skills: [
      { name: 'PyTorch', info: 'Deep learning framework', project: 'Face Attribute Scanner' },
      { name: 'Scikit-learn', info: 'Classical ML', project: 'Classification, regression' },
      { name: 'XGBoost', info: 'Gradient boosting', project: 'Tabular prediction' },
      { name: 'Pandas', info: 'Data manipulation', project: 'All data pipelines' },
    ]},
    { name: 'DEVELOPMENT', skills: [
      { name: 'React', info: 'UI framework', project: 'Face Scanner, CMS' },
      { name: 'FastAPI', info: 'Python API framework', project: 'AI model serving' },
      { name: 'Flutter', info: 'Mobile development', project: 'Experiments' },
      { name: 'REST APIs', info: 'System integration', project: 'All backends' },
    ]},
    { name: 'DATA', skills: [
      { name: 'Power BI', info: 'Business dashboards', project: 'Analytics projects' },
      { name: 'Tableau', info: 'Visual analytics', project: 'Exploratory analysis' },
      { name: 'Plotly', info: 'Interactive charts', project: 'Data visualizations' },
      { name: 'Jupyter', info: 'Research environment', project: 'All experiments' },
    ]},
  ]

  return (
    <motion.section style={{ padding: '100px 48px', borderTop: '1px solid #E0E0DA' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Skills</div>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 60 }}>The tools I reach for.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40, position: 'relative' }}>
          {cats.map(cat => (
            <div key={cat.name}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: 700, marginBottom: 20 }}>{cat.name}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {cat.skills.map(s => (
                  <div key={s.name}
                    onMouseEnter={() => setHoveredSkill(s)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      padding: '10px 14px', borderRadius: 6, cursor: 'none',
                      background: hoveredSkill?.name === s.name ? 'var(--bg-alt)' : 'transparent',
                      border: `1px solid ${hoveredSkill?.name === s.name ? 'var(--border)' : 'transparent'}`,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'all 0.15s',
                    }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: hoveredSkill?.name === s.name ? 'var(--text-main)' : 'var(--text-secondary)' }}>
                      {s.name}
                    </span>
                    {hoveredSkill?.name === s.name && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600 }}>{s.project}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', borderTop: '1px solid #E0E0DA', paddingTop: 24 }}>
          Still learning. Still building.
        </div>
      </div>
    </motion.section>
  )
}

/* ─── How I Work ─── */
function HowIWork() {
  const principles = [
    { n: '01', title: 'Understand', desc: 'Start with the problem rather than the technology. Spend more time understanding what is actually needed than rushing to build.' },
    { n: '02', title: 'Explore', desc: 'Try different approaches before committing. The first solution is rarely the right one — document the reasoning.' },
    { n: '03', title: 'Build', desc: 'Turn the selected idea into a working system. Ship something small, learn from real usage, then improve.' },
    { n: '04', title: 'Iterate', desc: "Test, identify what's not working, and improve. Good systems get better through cycles, not through perfection on the first attempt." },
  ]
  return (
    <motion.section style={{ padding: '100px 48px', background: 'var(--bg-alt)', borderTop: '1px solid #E0E0DA', borderBottom: '1px solid #E0E0DA' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Philosophy</div>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 60 }}>How I work.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)' }}>
          {principles.map((p, i) => (
            <div key={p.n} style={{
              background: 'var(--bg-alt)', padding: '40px 36px',
              position: 'relative',
            }}>
              {i < principles.length - 1 && (
                <div style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--accent)', zIndex: 1 }} className="hidden lg:block">
                  →
                </div>
              )}
              <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 700, marginBottom: 16 }}>{p.n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 14 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ─── Beyond Code ─── */
function BeyondCode() {
  const [hovered, setHovered] = useState<string | null>(null)
  const items = [
    { label: 'Gym', emoji: '🏋️', desc: 'Consistency outside the screen matters too. Showing up every day — whether it\'s for a PR or a pull request.' },
    { label: 'Chess', emoji: '♟', desc: 'Planning several moves ahead. Patience, pattern recognition, and knowing when to sacrifice.' },
    { label: 'Music', emoji: '🎵', desc: 'A completely different way of thinking. Structure hidden inside something that feels effortless.' },
    { label: 'Technology', emoji: '⚡', desc: 'The intersection of things that don\'t obviously belong together. Always exploring something new.' },
    { label: 'Problem Solving', emoji: '◎', desc: 'The habit that crosses every context. Not just in code — in every decision.' },
  ]

  return (
    <motion.section id="beyond-code" style={{ padding: '100px 48px', borderTop: '1px solid #E0E0DA', background: 'var(--bg-main)' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-end', marginBottom: 72 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Beyond Code</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--text-main)' }}>
              The person<br />behind the projects.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 380 }}>
            Good engineers are curious about more than engineering. Here&apos;s what keeps me thinking when I&apos;m away from the screen.
          </p>
        </div>

        {/* Main layout: photo + interests */}
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 64, alignItems: 'start' }}>

          {/* Photo card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 14, overflow: 'hidden', border: '1px solid #E0E0DA',
              aspectRatio: '3/4', background: 'var(--border)',
            }}>
              <img
                src="/src/assets/yatin.jpg"
                alt="Yatin Patil"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              background: 'rgba(248,248,245,0.92)', backdropFilter: 'blur(12px)',
              border: '1px solid #E0E0DA', borderRadius: 10, padding: '14px 18px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>Yatin Patil</div>
              <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.06em' }}>
                IT Student · Navi Mumbai, 2026
              </div>
            </div>
          </div>

          {/* Interest items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid #E0E0DA' }}>
            {items.map((item) => {
              const isHovered = hovered === item.label
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'grid', gridTemplateColumns: '48px 1fr auto',
                    alignItems: 'center', gap: 20, padding: '28px 20px',
                    borderBottom: '1px solid #E0E0DA', cursor: 'none',
                    background: isHovered ? 'var(--card-bg)' : 'transparent',
                    borderRadius: isHovered ? 8 : 0,
                    transition: 'background 0.2s',
                  }}
                >
                  {/* Emoji / number */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    background: isHovered ? '#3157E808' : 'var(--bg-alt)',
                    border: `1.5px solid ${isHovered ? '#3157E840' : 'var(--border)'}`,
                    transition: 'all 0.2s',
                  }}>
                    {item.emoji}
                  </div>

                  {/* Label + desc */}
                  <div>
                    <div style={{
                      fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em',
                      color: isHovered ? 'var(--accent)' : 'var(--text-main)',
                      transition: 'color 0.2s', marginBottom: isHovered ? 6 : 0,
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6,
                      maxHeight: isHovered ? 80 : 0, overflow: 'hidden',
                      opacity: isHovered ? 1 : 0, transition: 'max-height 0.3s ease, opacity 0.25s',
                    }}>
                      {item.desc}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div style={{
                    fontSize: 18, color: isHovered ? 'var(--accent)' : 'var(--text-light)',
                    transform: isHovered ? 'rotate(0deg)' : 'rotate(-45deg)',
                    transition: 'color 0.2s, transform 0.25s',
                  }}>
                    →
                  </div>
                </div>
              )
            })}

            {/* Closing note */}
            <div style={{ padding: '28px 20px 0', fontSize: 13, color: 'var(--text-light)', fontStyle: 'italic' }}>
              These aren&apos;t separate from the work — they inform it.
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── Achievements ─── */
function Achievements() {
  const items = [
    { year: '2026', title: 'Buildathon 2026', desc: 'Built a full-stack application under 24-hour time constraints.' },
    { year: '2026', title: 'SAS Curiosity Cup', desc: 'Global data analytics competition using SAS Viya for business problem solving.' },
    { year: '2025', title: 'IBM SkillsBuild Internship', desc: 'Data Analytics internship focusing on real-world datasets and analytical reporting.' },
    { year: '2025', title: 'Hackathon Finalist', desc: 'Advanced to the final round with an AI-powered prototype.' },
    { year: '2024', title: 'Data Analytics Certifications', desc: 'Industry certifications in data analytics and ML fundamentals.' },
  ]
  return (
    <motion.section style={{ padding: '100px 48px', borderTop: '1px solid #E0E0DA' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Achievements</div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Moments that mattered.</h2>
        </div>
        <div>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 32, paddingBottom: 32, paddingTop: i > 0 ? 32 : 0,
              borderTop: i > 0 ? '1px solid #E0E0DA' : 'none',
            }}>
              <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>{item.year}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ─── Playground ─── */
function Playground() {
  const cards = [
    { title: 'Sentiment Classifier', tag: 'NLP', desc: 'Fine-tuned BERT on movie reviews. How context changes tone detection.' },
    { title: 'Data Dashboard', tag: 'DATA VIZ', desc: 'Built with Plotly and Dash on a real housing dataset.' },
    { title: 'Pathfinding Visualizer', tag: 'ALGORITHMS', desc: 'A* and Dijkstra animated side-by-side on a weighted grid.' },
    { title: 'ChatPDF', tag: 'LLM', desc: 'Upload a PDF, ask questions. RAG in ~200 lines of Python.' },
    { title: 'Face Mask Detector', tag: 'CV', desc: 'Real-time detection using lightweight MobileNet.' },
  ]
  return (
    <motion.section id="playground" style={{ padding: '100px 48px', borderTop: '1px solid #E0E0DA' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Playground</div>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Playground</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 48 }}>Small experiments, prototypes and ideas.</p>
        <div style={{ overflowX: 'auto', paddingBottom: 16, marginLeft: -48, marginRight: -48, paddingLeft: 48, paddingRight: 48 }}>
          <div style={{ display: 'flex', gap: 16, minWidth: 'max-content' }}>
            {cards.map((c, i) => (
              <div key={i} style={{
                width: 260, padding: '28px 24px', background: 'var(--card-bg)',
                border: '1px solid #E0E0DA', borderRadius: 10, flexShrink: 0,
              }}>
                <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 700, marginBottom: 12 }}>{c.tag}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, letterSpacing: '-0.01em' }}>{c.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── Contact ─── */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = () => {
    navigator.clipboard.writeText('yatin.patil@example.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <motion.section id="contact" style={{ padding: '120px 48px', borderTop: '1px solid #E0E0DA', background: 'var(--bg-main)' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>Contact</div>
        <h2 style={{ fontSize: 'clamp(44px,6vw,88px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.04, marginBottom: 24, maxWidth: 700 }}>
          Have something worth building?
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 480, marginBottom: 56 }}>
          I&apos;m interested in interesting problems, useful products and opportunities to learn by building.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={copyEmail} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: copied ? '#22c55e' : 'var(--accent)', color: 'var(--card-bg)', padding: '14px 28px',
            borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'none',
            transition: 'background 0.2s',
          }}>
            {copied ? 'Email copied ✓' : 'Email me ↗'}
          </button>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1.5px solid #D0D0CA', color: 'var(--text-main)', padding: '14px 28px',
            borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none',
          }}>LinkedIn ↗</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1.5px solid #D0D0CA', color: 'var(--text-main)', padding: '14px 28px',
            borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none',
          }}>GitHub ↗</a>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ padding: '40px 48px', borderTop: '1px solid #E0E0DA', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Yatin Patil</div>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)' }}>AI / Data / Software</div>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Work', 'About', 'Playground', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Designed & built with curiosity.</div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Process />
      <BeyondCode />
      <Work />
      <About />
      <Exploring />
      <Skills />
      <HowIWork />
      <Achievements />
      <Playground />
      <Contact />
      <Footer />
    </>
  )
}

