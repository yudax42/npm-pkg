import fs from 'node:fs'
import path from 'node:path'
import { mkdir, rm } from 'node:fs/promises'
import { cwd } from 'node:process'
import { Generator } from 'npm-dts'
import { build } from 'esbuild'
import { dependencies, devDependencies } from '../package.json'

const stdout = console

const targets: Parameters<typeof build>[0][] = [
  {
    platform: 'node',
    outfile: 'dist/index.js',
  },
  {
    platform: 'neutral',
    format: 'esm',
    outfile: 'dist/index.esm.js',
  },
]

async function prepare() {
  const dist = path.join(cwd(), 'dist')

  if (fs.existsSync(dist))
    await rm(dist, { recursive: true })

  await mkdir(dist)
}

async function generateTypes() {
  const generator = new Generator({
    entry: 'src/index.ts',
    output: 'dist/index.d.ts',
  })

  await generator.generate()
}

async function buildTargets() {
  for (const target of targets) {
    await build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      minify: true,
      treeShaking: true,
      external: Object.keys(devDependencies).concat(Object.keys(dependencies)),
      ...target,
    })
  }
}

async function main() {
  stdout.log('Building...')
  await prepare()

  stdout.log('Building targets...')
  await buildTargets()

  stdout.log('Generating types...')
  await generateTypes()

  stdout.log('Done!')
}

main()
