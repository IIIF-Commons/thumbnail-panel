import ReactDOM from 'react-dom/client';
import React from 'react';
import { Thumbnail, ThumbnailPanel } from './index';
import { Behavior, ViewingDirection, ViewingHint } from '@iiif/vocabulary';
import { useControls } from 'leva';

const Wrapper = () => {
  const [{ iiifContent, ...overrides }, set] = useControls(() => ({
    iiifContent: {
      // https://iiif-commons.github.io/fixtures/
      options: {
        'Non-paged at End':
          'https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json',
        'No Viewing Hint':
          'https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/no_viewing_hint/v2/manifest.json',
        'Right to Left': 'https://iiif.io/api/cookbook/recipe/0010-book-2-viewing-direction/manifest-rtl.json',
      },
    },
    behavior: {
      options: {
        Paged: Behavior.PAGED,
        'Non-Paged': Behavior.NON_PAGED,
        Individuals: Behavior.INDIVIDUALS,
      },
    },
    viewingDirection: {
      options: {
        'Left to Right': ViewingDirection.LEFT_TO_RIGHT,
        'Right to Left': ViewingDirection.RIGHT_TO_LEFT,
      },
    },
  }));

  // here?
  return (
    <>
      <ThumbnailPanel
        iiifContent={iiifContent}
        overrides={overrides}
        onLoad={(resource) => {
          console.log('onLoad', resource);
          set({
            viewingDirection: resource.viewingDirection || ViewingDirection.LEFT_TO_RIGHT,
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
