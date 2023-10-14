import { build } from 'esbuild'
import { Generator } from 'npm-dts'

new Generator({
    entry: 'src/index.ts',
    out: 'dist/index.d.ts',
}).generate()

const shared = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
}

// cjs
build({
    ...shared,
    platform: 'node',
    outfile: 'dist/index.js',
})

// esm
build({
    ...shared,
    platform: 'neutral',
    format: 'esm',
    outfile: 'dist/index.esm.js',
})
