# React.js Usage

## Installation

First, be sure to install the `@iiif/thumbnail-panel` package.

```bash
npm i @iiif/thumbnail-panel
```

## Components and Hooks

### IIIFContentProvider

Wrapping React Context for the `ThumbnailPanel` component.

```jsx
<IIIFContentProvider>
  <ThumbnailPanel iiifContent="..." />
</IIIFContentProvider>
```

### ThumbnailPanel

Primary UI component for `@iiif/thumbnail-panel`:

```jsx
<ThumbnailPanel iiifContent="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json" />
```

#### Props

| Prop                | Type                     | Required? | Default    |
| ------------------- | ------------------------ | --------- | ---------- |
| `currentResourceId` | string (Canvas URI)      | --        | --         |
| `iiifContent`       | string (Manifest URI)    | Yes       | --         |
| `onResourceChanged` | callback                 | --        | --         |
| `orientation`       | `horizontal`, `vertical` | --        | `vertical` |
| `overrides`         | object                   | --        | --         |

### useThumbnailPanelContext()

React Hook for handling resource changes.

```jsx
const { isEnd, isStart, next, prev } = useThumbnailPanelContext();
```

## Example

```tsx
import { IIIFContentProvider, ThumbnailPanel } from "@iiif/thumbnail-panel";

function MyApp() {
  return (
    <IIIFContentProvider>
      <Controls />
      <ThumbnailPanel
        iiifContent="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json"
        orientation="horizontal"
      />
    </IIIFContentProvider>
  );
}

function Controls() {
  const { isEnd, isStart, next, prev } = useThumbnailPanelContext();

  const { handleNextClick, resourceId: nextResourceId } = next;
  const { handlePrevClick, resourceId: prevResourceId } = prev;

  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={isStart}
        data-id={prevResourceId}
      >
        Prev
      </button>
      <button
        onClick={handleNextClick}
        disabled={isEnd}
        data-id={nextResourceId}
      >
        Next
      </button>
    </>
  );
}
```
