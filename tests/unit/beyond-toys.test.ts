import { describe, it, expect } from 'vitest'
import { Chess } from 'chess.js'
import { generateValidTwoSum } from '../../src/components/beyond/toys/TwoSum'

describe('Darkroom Toys Logic Integrity', () => {
  describe('Chess Puzzle (FEN: q1QN3k/4r1pp/8/8/8/8/5PPP/6K1 w - - 0 1)', () => {
    const FEN = 'q1QN3k/4r1pp/8/8/8/8/5PPP/6K1 w - - 0 1'

    it('has exactly one mating move for White (Nf7#)', () => {
      const game = new Chess(FEN)
      const moves = game.moves({ verbose: true })

      const matingMoves = moves.filter((m) => {
        const testGame = new Chess(FEN)
        testGame.move(m)
        return testGame.isCheckmate()
      })

      expect(matingMoves.length).toBe(1)
      expect(matingMoves[0].san).toBe('Nf7#')
      expect(matingMoves[0].from).toBe('d8')
      expect(matingMoves[0].to).toBe('f7')
    })

    it('gives Black a mate in 1 (Re1#) if White misses the mate or passes', () => {
      const game = new Chess(FEN)
      // White plays non-mating move e.g. Qd7
      game.move('Qd7')

      const blackMoves = game.moves({ verbose: true })
      const blackMatingMoves = blackMoves.filter((m) => {
        const testGame = new Chess(game.fen())
        testGame.move(m)
        return testGame.isCheckmate()
      })

      expect(blackMatingMoves.length).toBeGreaterThanOrEqual(1)
      expect(blackMatingMoves.some((m) => m.san === 'Re1#')).toBe(true)
    })
  })

  describe('TwoSum Tiny Puzzle Generator', () => {
    it('always generates exactly one valid pair across 500 random iterations', () => {
      for (let i = 0; i < 500; i++) {
        const { nums, target } = generateValidTwoSum()
        expect(nums.length).toBe(8)

        // Count all pairs summing to target
        let validPairsCount = 0
        for (let a = 0; a < nums.length; a++) {
          for (let b = a + 1; b < nums.length; b++) {
            if (nums[a] + nums[b] === target) {
              validPairsCount++
            }
          }
        }

        expect(validPairsCount, `Iteration ${i} failed to have exactly 1 pair`).toBe(1)
      }
    })
  })
})
