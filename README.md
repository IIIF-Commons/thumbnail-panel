# Thumbnail panel

[Demo](https://thumbnail-panel.netlify.app/) | [Code Sandbox](https://codesandbox.io/dashboard/repositories/github/IIIF-Commons/thumbnail-panel)

```bash
npm i @iiif/thumbnail-panel
```

## Development

To start a local development environment, clone the repo, and run:

```bash
yarn install
yarn start
```

A consuming environment for developing is available via the `src/dev.tsx` component.

## Usage

The app will export React components, and also a vanilla JavaScript bundled version.

### Vanilla JavaScript

### React

```jsx
import { ThumbnailPanel } from "@iiif/thumbnail-panel";

...
<ThumbnailPanel
    iiifContent="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json"
    currentResourceId=""
    orientation="vertical"
/>

```

## Publishing
Checkout the `main` branch, and ensure it is up-to-date.

Run `npm version [major | minor | patch]` for example:
```
npm version patch
```

This will update the `package.json` version and create a git tag. Then push both the main/tag.

```
git push origin main 0.0.8
```

Then the GitHub action will pick up the tag and publish it to NPM :tada:
