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

The app will export React components, and also a vanilla JavaScript bundled version (coming soon).

### Vanilla JavaScript

### React

The `ThumbnailPanel` component can be used in a _controlled_ or _uncontrolled_ way. [What is controlled vs uncontrolled?](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).

#### Controlled

```tsx
import { ThumbnailPanel } from "@iiif/thumbnail-panel";

// Somewhere here you'll have to keep track of which
// "resource" is "active".  Handle user events and
// continually pass in whichever resourceId you want
// to be active.

...
<ThumbnailPanel
    currentResourceId="someResourceId"
    iiifContent="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json"
    onResourceChanged={(resourceId?: string) => {
        console.log("resourceId", resourceId);
        // Now you can pass around the current thumbnail item to
        // other parts of your app which need to know about it.
    }}
    orientation="vertical"
/>

```

#### Uncontrolled

```tsx
import { ThumbnailPanel } from "@iiif/thumbnail-panel";

function MyApp() {
    ...

    return (
        <ThumbnailPanel
            iiifContent="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json"
            onResourceChanged={(resourceId?: string) => console.log("resourceId", resourceId)}
            orientation="vertical"
        >
            <Nav />
        </ThumbnailPanel>
    )
}

function Nav() {
    const { isEnd, isStart, next, prev } = useThumbnailPanelContext();

    const { handleNextClick, resourceId: nextResourceId } = next;
    const { handlePrevClick, resourceId: prevResourceId } = prev;

    return (
        <>
            <button onClick={handlePrevClick} disabled={isStart} data-id={prevResourceId}>
                Prev
            </button>
            <button onClick={handleNextClick} disabled={isEnd} data-id={nextResourceId}>
                Next
            </button>
        </>
    );
}

```

#### useThumbnailPanelContext()

Helper hook, details coming soon...

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
