import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { claims } from '../../src/data/claims';

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe('content integrity', () => {
  it('has no placeholders or filler text in src', () => {
    const bad = /\\[ADD REAL DETAIL\\]|lorem ipsum|TODO|FIXME|coming soon|your name here/i;
    const hits = walk('src')
      .filter((f) => /\\.(tsx?|md|json)$/.test(f))
      .filter((f) => bad.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });

  it('every claim is verified and has evidence', () => {
    for (const c of claims) {
      expect(c.status, `${c.id} must be verified`).toBe('verified');
      expect(c.evidence.trim().length, `${c.id} needs evidence`).toBeGreaterThan(3);
    }
  });

  it('claim ids are unique', () => {
    const ids = claims.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
