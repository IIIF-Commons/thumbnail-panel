# Thumbnail panel

### [View Documentation](https://iiif-commons.netlify.app/docs/thumbnail-panel/overview) | [View Demo](https://thumbnail-panel.netlify.app/)

The `@iiif/thumbnail-panel` component is designed for implementations in consuming applications where a user can provide pressable thumbnails representing the Canvas `items` of a Manifest. This component is intended to complement a canvas component such as OpenSeadragon, Canvas Panel, or an HTML5 video element. The thumbnail-panel is designed to interpret CLIENT requirements of the Manifest and Canvas layout `behavior` (or `viewingHint`) and `viewingDirection` properties according the [IIIF Presentation 3.0 API specification](https://iiif.io/api/presentation/3.0/).

## Installation

```bash
npm i @iiif/thumbnail-panel
```

## Development

To start a local development environment, clone the repo, and run:

```bash
yarn install
yarn start
```

## Development Code Sandbox

[Development Code Sandbox](https://codesandbox.io/dashboard/repositories/github/IIIF-Commons/thumbnail-panel)

## Publishing

Checkout the `main` branch, and ensure it is up-to-date.

Run `npm version [major | minor | patch]` for example:

```
npm version patch
```

This will update the `package.json` version and create a git tag. Then push both the main/tag.

```
git push origin main v0.0.8
```

Then the GitHub action will pick up the tag and publish it to NPM :tada:
