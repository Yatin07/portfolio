
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export function SelectedWork() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%'])

  const projects = [
    {
      title: 'Face Attribute Analysis',
      role: 'Product Designer',
      problem: 'AI results were too technical for everyday users.',
      decision: 'Designed a friendly, human-readable slider interface instead of raw JSON output.',
      Prototype: () => {
         const [val, setVal] = useState(50)
         return (
           <div data-testid="face-slider" style={{ padding: 24, background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border)' }}>
             <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Confidence Slider <span style={{fontSize: 10, color: 'var(--text-muted)'}}>(Sample data)</span></div>
             <input type="range" min="0" max="100" value={val} onChange={e=>setVal(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
             <div style={{ marginTop: 16, fontSize: 32, fontWeight: 700, color: val > 75 ? 'var(--accent)' : 'var(--text-main)' }}>{val}% Match</div>
           </div>
         )
      }
    },
    {
      title: 'Document Q&A Experience',
      role: 'UX Designer',
      problem: 'Users could not verify where the AI got its answers.',
      decision: 'Created a dual-pane view highlighting source snippets alongside answers.',
      Prototype: () => {
         const [open, setOpen] = useState(false)
         return (
           <div data-testid="face-slider" style={{ padding: 24, background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
             <div style={{ fontSize: 16, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               Where is the data stored? <span style={{fontSize: 10, color: 'var(--text-muted)', marginRight: 8}}>(Sample data)</span><span>{open ? '-' : '+'}</span>
             </div>
             {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: 16, padding: 12, background: 'var(--accent-transparent)', borderRadius: 8, fontSize: 14 }}>
               <strong style={{ color: 'var(--accent)' }}>Source highlight:</strong> Section 4.2 states data is stored locally.
             </motion.div>}
           </div>
         )
      }
    },
    {
      title: 'Hostel Complaint Management',
      role: 'UI/UX Designer & Dev',
      problem: 'Reporting issues was chaotic and untracked.',
      decision: 'A simple Kanban-style swipe interface for students and wardens.',
      Prototype: () => {
         const [status, setStatus] = useState(0)
         const states = ['Open', 'In Progress', 'Resolved']
         return (
           <div data-testid="face-slider" style={{ padding: 24, background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setStatus((status+1)%3)}>
             <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Issue: AC not working <span style={{fontSize: 10, color: 'var(--text-muted)'}}>(Sample data)</span></div>
             <div style={{ display: 'flex', gap: 8 }}>
               {states.map((s, i) => (
                 <div key={s} style={{ flex: 1, height: 4, background: i <= status ? 'var(--accent)' : 'var(--border)', borderRadius: 2 }} />
               ))}
             </div>
             <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>{states[status]} (Tap to update)</div>
           </div>
         )
      }
    }
  ]

  return (
    <section ref={targetRef} id="work" style={{ height: '300vh', background: 'var(--bg-main)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ x, display: 'flex', width: '300vw' }}>
          {projects.map((p, i) => (
            <div key={i} style={{ width: '100vw', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 24 }}>SELECTED WORK 0{i+1}</div>
                  <h3 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 32 }}>{p.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
                    <div><strong style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Role</strong> {p.role}</div>
                    <div><strong style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Problem</strong> {p.problem}</div>
                    <div><strong style={{ display: 'block', fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase' }}>Decision</strong> {p.decision}</div>
                  </div>
                </div>
                <div style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 32, border: '1px solid var(--border)', boxShadow: '0 40px 80px rgba(0,0,0,0.05)' }}>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, textAlign: 'center' }}>Interactive Prototype</p>
                  <p.Prototype />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
