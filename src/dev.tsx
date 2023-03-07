import ReactDOM from 'react-dom/client';
import React from 'react';
import { Thumbnail, ThumbnailPanel } from './index';
import { Behavior, ViewingDirection, ViewingHint } from '@iiif/vocabulary';
import { useControls } from 'leva';

const Wrapper = () => {
  const [{ iiifContent }, setIIIFContent] = useControls(() => ({
    iiifContent: {
      // https://iiif-commons.github.io/fixtures/
      options: {
        'Non-paged at End':
          'https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json',
        'No Viewing Hint':
          'https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/no_viewing_hint/v2/manifest.json',
        'Right to Left': 'https://iiif.io/api/cookbook/recipe/0010-book-2-viewing-direction/manifest-rtl.json',
        'Top to bottom': 'https://iiif.io/api/cookbook/recipe/0010-book-2-viewing-direction/manifest-ttb.json',
        'Bottom to top':
          'https://gist.githubusercontent.com/stephenwf/c47dc115059ca0c4f97eb8376ecf8302/raw/933e74cbf9a90b0c0c3f627c508c29dc876f1b66/btt.json',
        Continuous: 'https://iiif.io/api/cookbook/recipe/0011-book-3-behavior/manifest-continuous.json',
      },
    },
    currentResourceId: "",
  }));

  const [{ ...overrides }, setOverrides] = useControls('overrides', () => ({
    behavior: {
      options: {
        Default: undefined,
        Paged: Behavior.PAGED,
        'Non-Paged': Behavior.NON_PAGED,
        Individuals: Behavior.INDIVIDUALS,
        Continuous: Behavior.CONTINUOUS,
      },
    },
    viewingDirection: {
      options: {
        Default: undefined,
        'Left to Right': ViewingDirection.LEFT_TO_RIGHT,
        'Right to Left': ViewingDirection.RIGHT_TO_LEFT,
      },
    },
    thumbnailSize: {
      value: 256,
    },
  }));

  const [{ ...options }] = useControls('options', () => ({
    orientation: {
      options: {
        Default: 'vertical',
        horizontal: 'horizontal',
        vertical: 'vertical',
      },
    },
  }));

  // here?
  return (
    <>
      <ThumbnailPanel
        iiifContent={iiifContent}
        // @ts-ignore
        overrides={overrides}
        // @ts-ignore
        options={options}
        onLoad={(resource) => {
          console.log('onLoad', resource);
          setOverrides({
            viewingDirection: resource.viewingDirection || ViewingDirection.LEFT_TO_RIGHT,
          });
        }}
        onResourceChanged={(resourceId?: string) => {
          console.log(resourceId);
          setIIIFContent({
            currentResourceId: resourceId,
          });
        }}
      />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);
