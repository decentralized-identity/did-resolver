// @ts-check
import { renameSync, copyFileSync, rmSync } from 'fs'

// ESM: rename .js -> .mjs, .d.ts -> .d.mts, keep a .d.ts copy for legacy consumers
renameSync('lib/esm/index.js', 'lib/index.mjs')
renameSync('lib/esm/index.js.map', 'lib/index.mjs.map')
renameSync('lib/esm/index.d.ts', 'lib/index.d.mts')
copyFileSync('lib/index.d.mts', 'lib/index.d.ts')
renameSync('lib/esm/index.d.ts.map', 'lib/index.d.ts.map')

// CJS: rename .js -> .cjs, .d.ts -> .d.cts
renameSync('lib/cjs/index.js', 'lib/index.cjs')
renameSync('lib/cjs/index.js.map', 'lib/index.cjs.map')
renameSync('lib/cjs/index.d.ts', 'lib/index.d.cts')

// clean up temp dirs
rmSync('lib/esm', { recursive: true })
rmSync('lib/cjs', { recursive: true })
