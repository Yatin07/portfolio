
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

export function SelectedWork() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%'])

  const projects = [
    {
      title: 'Face Attribute Analysis',
      role: 'Product Designer & Developer',
      problem: 'AI results were too technical for everyday users.',
      decision: 'Designed a friendly, human-readable slider interface instead of raw JSON output.',
      github: 'https://github.com/Yatin07/realtime-face-analysis',
      live: 'https://realtime-face-analysis.vercel.app/',
      Prototype: () => {
         const [val, setVal] = useState(50)
         return (
           <div data-testid="face-slider" style={{ padding: 24, background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border)' }}>
             <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Confidence Slider <span style={{fontSize: 10, color: 'var(--text-muted)'}}>(Sample data)</span></div>
             <input aria-label="Confidence Slider" type="range" min="0" max="100" value={val} onChange={e=>setVal(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
             <div style={{ marginTop: 16, fontSize: 32, fontWeight: 700, color: val > 75 ? 'var(--accent)' : 'var(--text-main)' }}>{val}% Match</div>
           </div>
         )
      }
    },
    {
      title: 'Document Q&A Experience',
      role: 'UX Designer & Developer (RAG)',
      problem: 'Users could not verify where the AI got its answers.',
      decision: 'Created a dual-pane view highlighting source snippets alongside answers.',
      github: 'https://github.com/Yatin07/RAG_chatbot',
      Prototype: () => {
         const [open, setOpen] = useState(false)
         return (
           <div data-testid="doc-qa-question-0" style={{ padding: 24, background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
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
      github: 'https://github.com/Yatin07/HostelComplaintApp',
      Prototype: () => {
         const [status, setStatus] = useState(0)
         const states = ['Open', 'In Progress', 'Resolved']
         return (
           <div data-testid="hostel-complaint-0" style={{ padding: 24, background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setStatus((status+1)%3)}>
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
              <div style={{ width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--accent-fg)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 24, transition: 'color 0.4s ease' }}>SELECTED WORK 0{i+1}</div>
                  <h3 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 32, color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>{p.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32, color: 'var(--text-secondary)', transition: 'color 0.4s ease' }}>
                    <div><strong style={{ display: 'block', fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', transition: 'color 0.4s ease' }}>Role</strong> {p.role}</div>
                    <div><strong style={{ display: 'block', fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', transition: 'color 0.4s ease' }}>Problem</strong> {p.problem}</div>
                    <div><strong style={{ display: 'block', fontSize: 12, color: 'var(--accent-fg)', textTransform: 'uppercase', transition: 'color 0.4s ease' }}>Decision</strong> {p.decision}</div>
                  </div>

                  {/* Project External Links */}
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 22px',
                          borderRadius: 30,
                          background: 'var(--accent)',
                          color: 'var(--accent-text)',
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          boxShadow: '0 4px 14px var(--accent-transparent)',
                          transition: 'background 0.4s ease, color 0.4s ease',
                        }}
                      >
                        Live Demo <ExternalLink size={14} />
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 22px',
                          borderRadius: 30,
                          border: '1px solid var(--border)',
                          color: 'var(--text-primary)',
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'var(--bg-hover)',
                          transition: 'color 0.4s ease, border-color 0.4s ease',
                        }}
                      >
                        GitHub Code <Github size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <div style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 32, border: '1px solid var(--border)', boxShadow: '0 40px 80px rgba(0,0,0,0.05)', transition: 'border-color 0.4s ease' }}>
                  <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 24, textAlign: 'center', transition: 'color 0.4s ease' }}>Interactive Prototype</p>
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
