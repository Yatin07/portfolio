'use client'

import React from 'react'

type FrameProps = {
  number: string
  caption: string
  aspectRatio: string
  developed: boolean
  isLit: boolean
  onClick: () => void
  children: React.ReactNode
}

export function Frame({
  number,
  caption,
  aspectRatio,
  developed,
  isLit,
  onClick,
  children,
}: FrameProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`Frame ${number} ${caption}. ${developed ? 'Developed. Tap to open' : 'Undeveloped. Tap to develop.'}`}
      style={{
        position: 'relative',
        background: 'var(--surface-darkroom, #16161A)',
        border: '1px solid var(--border-darkroom, #2A2A30)',
        borderRadius: 16,
        padding: '16px 16px 20px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.4s ease',
        boxShadow: isLit
          ? '0 0 25px var(--accent-transparent), inset 0 0 15px var(--accent-transparent)'
          : '0 10px 30px rgba(0,0,0,0.4)',
        borderColor: isLit ? 'var(--accent-fg)' : 'var(--border)',
      }}
    >
      {/* Top Film Sprocket Holes Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, padding: '0 4px' }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 6,
              borderRadius: 2,
              background: '#0C0C0E',
              border: '1px solid var(--border)',
            }}
          />
        ))}
      </div>

      {/* Frame Header Caption */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 11,
          color: isLit ? 'var(--accent-fg)' : 'var(--text-tertiary)',
          marginBottom: 12,
          fontWeight: 600,
          letterSpacing: '0.08em',
          transition: 'color 0.4s ease',
        }}
      >
        <span>{number} · {caption}</span>
        <span>{developed ? '● DEV' : '○ RAW'}</span>
      </div>

      {/* Frame Visual / Preview Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio,
          borderRadius: 10,
          overflow: 'hidden',
          background: '#08080A',
          filter: developed
            ? 'none'
            : 'blur(6px) sepia(80%) hue-rotate(-25deg) brightness(60%)',
          transition: 'filter 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}

        {/* Undeveloped Overlay Hint */}
        {!developed && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(12, 12, 14, 0.4)',
              color: 'var(--accent-fg)',
              fontSize: 12,
              fontFamily: 'var(--font-mono, monospace)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.4s ease',
            }}
          >
            [ Click to Develop ]
          </div>
        )}
      </div>

      {/* Bottom Film Sprocket Holes Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, padding: '0 4px' }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 6,
              borderRadius: 2,
              background: '#0C0C0E',
              border: '1px solid var(--border-darkroom, #2A2A30)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
