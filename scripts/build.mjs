import { build } from 'vite';
import { defineConfig } from './base-config.mjs';
import chalk from 'chalk';
import { execa } from 'execa';

(async () => {
  const DIST = 'dist';

  // Main UMD build.
  buildMsg('UMD');
  await build(
    defineConfig({
      entry: `src/index.umd.ts`,
      globalName: 'IIIFThumbnailPanel',
      name: 'index',
      outDir: DIST,
    })
  );

  buildMsg('@iiif/thumbnail-panel');
  await build(
    defineConfig({
      entry: `src/index.tsx`,
      name: 'index',
      outDir: `${DIST}/bundle`,
    })
  );

  buildMsg('Types');

  listItem('@iiif/thumbnail-panel');
  await execa('./node_modules/.bin/dts-bundle-generator', [`--out-file=${DIST}/index.d.ts`, './src/index.tsx']);

  function buildMsg(name) {
    console.log(chalk.grey(`\n\nBuilding ${chalk.blue(name)}\n`));
  }
  function listItem(name) {
    console.log(chalk.gray(`- ${chalk.green(name)}`));
  }
})();
