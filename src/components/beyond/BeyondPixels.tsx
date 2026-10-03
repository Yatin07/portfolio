'use client'

import React, { useState } from 'react'
import { ContactSheet } from './ContactSheet'
import { Volume2, VolumeX, Camera } from 'lucide-react'

/*
 * SUBTEXT CHOICES FOR OWNER:
 * 1. "What I tinker with when the linter finally stops yelling." (Chosen Default)
 * 2. "Proof that I exist outside of VS Code and terminal tabs."
 * 3. "The analogue playground where I test ideas off-screen."
 */

export function BeyondPixels() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)

  return (
    <section
      id="beyond"
      style={{
        position: 'relative',
        padding: '140px 48px',
        zIndex: 10,
        background: '#0C0C0E',
        color: '#F3EEE7',
        /* Darkroom CSS variables */
        ['--bg-darkroom' as any]: '#0C0C0E',
        ['--surface-darkroom' as any]: '#16161A',
        ['--border-darkroom' as any]: '#2A2A30',
        ['--text-darkroom' as any]: '#F3EEE7',
        ['--muted-darkroom' as any]: '#9A958E',
        ['--safelight-accent' as any]: 'var(--accent, #FF4B3A)',
        ['--safelight-glow' as any]: '#FF7A5C',
      }}
    >
      {/* Subtle Film Grain CSS Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent-fg)',
                fontWeight: 700,
                marginBottom: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'color 0.4s ease',
              }}
            >
              <Camera size={14} /> DARKROOM CONTACT SHEET
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)',
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                margin: '0 0 12px',
                lineHeight: 1.05,
                transition: 'color 0.4s ease',
              }}
            >
              Beyond <span style={{ fontStyle: 'italic', color: 'var(--accent-fg)', transition: 'color 0.4s ease' }}>Pixels.</span>
            </h2>

            <p style={{ fontSize: 16, color: 'var(--text-tertiary)', margin: 0, maxWidth: 540, transition: 'color 0.4s ease' }}>
              What I tinker with when the linter finally stops yelling.
            </p>
          </div>

          {/* Single Global Sound Toggle */}
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            aria-label={soundEnabled ? 'Disable section sounds' : 'Enable section sounds'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 30,
              background: soundEnabled ? 'var(--accent-transparent)' : 'var(--bg-hover)',
              border: '1px solid var(--border)',
              color: soundEnabled ? 'var(--accent-fg)' : 'var(--text-tertiary)',
              fontSize: 12,
              fontFamily: 'var(--font-mono, monospace)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{soundEnabled ? 'SOUND: ON' : 'SOUND: OFF'}</span>
          </button>
        </div>

        {/* 6-Frame Contact Sheet Grid */}
        <ContactSheet soundEnabled={soundEnabled} />
      </div>
    </section>
  )
}
