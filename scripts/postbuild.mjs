// @ts-check
import { renameSync, copyFileSync, rmSync } from 'fs'

// ESM: rename .js -> .mjs, .d.ts -> .d.mts, keep a .d.ts copy for legacy consumers
renameSync('lib/esm/resolver.js', 'lib/resolver.mjs')
renameSync('lib/esm/resolver.js.map', 'lib/resolver.mjs.map')
renameSync('lib/esm/resolver.d.ts', 'lib/resolver.d.mts')
copyFileSync('lib/resolver.d.mts', 'lib/resolver.d.ts')
renameSync('lib/esm/resolver.d.ts.map', 'lib/resolver.d.ts.map')

// CJS: rename .js -> .cjs, .d.ts -> .d.cts
renameSync('lib/cjs/resolver.js', 'lib/resolver.cjs')
renameSync('lib/cjs/resolver.js.map', 'lib/resolver.cjs.map')
renameSync('lib/cjs/resolver.d.ts', 'lib/resolver.d.cts')

// clean up temp dirs
rmSync('lib/esm', { recursive: true })
rmSync('lib/cjs', { recursive: true })
