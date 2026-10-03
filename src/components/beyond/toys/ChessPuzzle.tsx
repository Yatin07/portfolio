'use client'

import { useState, useEffect, useRef } from 'react'
import { Chess } from 'chess.js'
import { hobbies } from '../../../data/hobbies'
import { RotateCcw, HelpCircle, Eye, CheckCircle2, AlertTriangle } from 'lucide-react'

const START_FEN = 'q1QN3k/4r1pp/8/8/8/8/5PPP/6K1 w - - 0 1'

const UNICODE_PIECES: Record<string, string> = {
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙'
}

type Props = {
  soundEnabled: boolean
}

export default function ChessPuzzle({ soundEnabled }: Props) {
  const [game, setGame] = useState<Chess>(() => new Chess(START_FEN))
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [status, setStatus] = useState<'playing' | 'solved' | 'failed'>('playing')
  const [feedback, setFeedback] = useState<string>('White to move. Mate in 1 or get mated in 1.')
  const [attempts, setAttempts] = useState<number>(0)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [solvedIn, setSolvedIn] = useState<number | null>(null)
  const [showHint, setShowHint] = useState<boolean>(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Web Audio sound synthesizer for move & checkmate
  const playSound = (type: 'move' | 'mate' | 'wrong') => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'move') {
        osc.frequency.setValueAtTime(400, ctx.currentTime)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
        osc.start()
        osc.stop(ctx.currentTime + 0.1)
      } else if (type === 'mate') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1) // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2) // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        osc.start()
        osc.stop(ctx.currentTime + 0.4)
      } else if (type === 'wrong') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(180, ctx.currentTime)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
        osc.start()
        osc.stop(ctx.currentTime + 0.2)
      }
    } catch {}
  }

  // Timer tick
  useEffect(() => {
    if (status === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((t) => t + 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [status])

  const resetGame = () => {
    const newG = new Chess(START_FEN)
    setGame(newG)
    setSelectedSquare(null)
    setStatus('playing')
    setFeedback('White to move. Mate in 1 or get mated in 1.')
    setTimeElapsed(0)
    setSolvedIn(null)
    setShowHint(false)
  }

  const handleSquareClick = (square: string) => {
    if (status !== 'playing') return

    if (!selectedSquare) {
      const piece = game.get(square as any)
      if (piece && piece.color === 'w') {
        setSelectedSquare(square)
      }
      return
    }

    if (selectedSquare === square) {
      setSelectedSquare(null)
      return
    }

    // Try move
    makeMove(selectedSquare, square)
  }

  const makeMove = (from: string, to: string) => {
    const gameCopy = new Chess(game.fen())
    try {
      const move = gameCopy.move({ from, to, promotion: 'q' })
      if (!move) {
        // Invalid move or selecting another white piece
        const targetPiece = game.get(to as any)
        if (targetPiece && targetPiece.color === 'w') {
          setSelectedSquare(to)
        } else {
          setSelectedSquare(null)
        }
        return
      }

      // Legal move made
      setGame(gameCopy)
      setSelectedSquare(null)

      if (gameCopy.isCheckmate()) {
        // Solved!
        setStatus('solved')
        setSolvedIn(timeElapsed)
        setFeedback(`Solved in ${timeElapsed}s! Double check from Knight & Queen.`)
        playSound('mate')
        return
      }

      // Wrong move
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      playSound('wrong')

      // Check if Black has mate in 1 (e.g. Re1#)
      const blackMoves = gameCopy.moves({ verbose: true })
      const blackMateMove = blackMoves.find((m) => {
        const testGame = new Chess(gameCopy.fen())
        testGame.move(m)
        return testGame.isCheckmate()
      })

      if (blackMateMove) {
        // Black plays mate in 1
        gameCopy.move(blackMateMove)
        setGame(gameCopy)
        setStatus('failed')
        setFeedback(`Mated. ${blackMateMove.san} — never miss the back rank.`)
      } else if (blackMoves.length > 0) {
        // Black plays first available response
        gameCopy.move(blackMoves[0])
        setGame(gameCopy)
        setStatus('failed')
        setFeedback('Not mate. Black is still breathing.')
      } else {
        setStatus('failed')
        setFeedback('Move failed to deliver mate.')
      }
    } catch {
      setSelectedSquare(null)
    }
  }

  const revealSolution = () => {
    const solvedGame = new Chess(START_FEN)
    solvedGame.move({ from: 'd8', to: 'f7' })
    setGame(solvedGame)
    setStatus('solved')
    setSolvedIn(timeElapsed)
    setFeedback('Revealed: Nf7# is a double check leading to instant checkmate!')
  }

  // Board grid setup
  const boardGrid = game.board()

  return (
    <div style={{ width: '100%', maxWidth: 460, margin: '0 auto', textTransform: 'none' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 13, color: 'var(--text-tertiary)', transition: 'color 0.4s ease' }}>
          TIMER: <span style={{ color: 'var(--text-primary)', fontWeight: 700, transition: 'color 0.4s ease' }}>{timeElapsed}s</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--accent-fg)', transition: 'color 0.4s ease' }}>
          TASK: MATE IN 1
        </div>
      </div>

      {/* Dynamic Feedback Banner */}
      <div
        role="region"
        aria-live="polite"
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          marginBottom: 16,
          fontSize: 13,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background:
            status === 'solved'
              ? 'rgba(0, 230, 118, 0.15)'
              : status === 'failed'
              ? 'rgba(255, 75, 58, 0.15)'
              : 'var(--bg-hover)',
          border:
            status === 'solved'
              ? '1px solid rgba(0, 230, 118, 0.4)'
              : status === 'failed'
              ? '1px solid rgba(255, 75, 58, 0.4)'
              : '1px solid var(--border)',
          color:
            status === 'solved'
              ? '#00E676'
              : status === 'failed'
              ? 'var(--accent-fg)'
              : 'var(--text-primary)',
          transition: 'all 0.4s ease',
        }}
      >
        {status === 'solved' && <CheckCircle2 size={16} />}
        {status === 'failed' && <AlertTriangle size={16} />}
        {feedback}
      </div>

      {/* Custom Clean Chess Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          width: '100%',
          aspectRatio: '1',
          border: '2px solid var(--border-darkroom, #2A2A30)',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {boardGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const file = String.fromCharCode(97 + colIndex)
            const rank = 8 - rowIndex
            const squareName = `${file}${rank}`
            const isDark = (rowIndex + colIndex) % 2 === 1
            const isSelected = selectedSquare === squareName
            const piece = cell

            return (
              <button
                key={squareName}
                onClick={() => handleSquareClick(squareName)}
                aria-label={`Square ${squareName} ${piece ? `${piece.color === 'w' ? 'White' : 'Black'} ${piece.type}` : 'empty'}`}
                style={{
                  background: isSelected
                    ? 'rgba(255, 122, 92, 0.6)'
                    : isDark
                    ? '#1E1E24'
                    : '#2D2D36',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(22px, 5vw, 32px)',
                  cursor: status === 'playing' ? 'pointer' : 'default',
                  border: 'none',
                  outline: isSelected ? '2px solid var(--safelight-accent, #FF4B3A)' : 'none',
                  color: piece?.color === 'w' ? '#FFFFFF' : '#A0A0B0',
                  userSelect: 'none',
                  transition: 'background 0.15s ease',
                }}
              >
                {piece ? UNICODE_PIECES[piece.color === 'w' ? piece.type.toUpperCase() : piece.type] : ''}
              </button>
            )
          })
        )}
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={resetGame}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid var(--border-darkroom, #2A2A30)',
            color: '#F3EEE7',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>

        {attempts >= 2 && status !== 'solved' && (
          <button
            onClick={() => setShowHint(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 20,
              background: 'rgba(255, 183, 3, 0.15)',
              border: '1px solid rgba(255, 183, 3, 0.3)',
              color: '#FFB703',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <HelpCircle size={14} /> Hint
          </button>
        )}

        {attempts >= 4 && status !== 'solved' && (
          <button
            onClick={revealSolution}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 20,
              background: 'rgba(255, 75, 58, 0.15)',
              border: '1px solid rgba(255, 75, 58, 0.3)',
              color: '#FF4B3A',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Eye size={14} /> Reveal Solution
          </button>
        )}
      </div>

      {showHint && (
        <div style={{ marginTop: 12, fontSize: 12, color: '#FFB703', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)' }}>
          Hint: Think double check — move Knight to d8-f7!
        </div>
      )}

      {/* Optional Real Personal Facts (Rendered ONLY if filled in) */}
      {(hobbies.chess?.handle || hobbies.chess?.openingFavourite || hobbies.chess?.rating) && (
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border-darkroom, #2A2A30)', fontSize: 12, color: 'var(--muted-darkroom, #9A958E)', textAlign: 'center' }}>
          {hobbies.chess.handle && <span>Handle: {hobbies.chess.handle} </span>}
          {hobbies.chess.rating && <span>| Rating: {hobbies.chess.rating} </span>}
          {hobbies.chess.openingFavourite && <span>| Fav Opening: {hobbies.chess.openingFavourite}</span>}
        </div>
      )}
    </div>
  )
}
