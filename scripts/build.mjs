import { build } from 'vite';
import chalk from 'chalk';
import { defineConfig } from './base-config.mjs';
import { execa } from 'execa';

(async () => {
  const DIST = 'dist';

  // Main UMD build.
  buildMsg('UMD');
  const umdConfig = defineConfig({
    entry: `src/index.umd.ts`,
    globalName: 'IIIFThumbnailPanel',
    name: 'index',
    outDir: DIST,
  });
  await build({
    ...umdConfig,
    // Allow the component to get passed into a browser import w/o erroring
    // on process.env...
    define: { 'process.env.NODE_ENV': '"production"' },
  });

  buildMsg('@iiif/thumbnail-panel');
  await build(
    defineConfig({
      entry: `src/index.tsx`,
      name: 'index',
      outDir: `${DIST}/bundle`,
      external: ['react', 'react-dom', 'react-dom/client'],
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
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
