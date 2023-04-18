import { Behavior, ViewingDirection, ViewingHint } from '@iiif/vocabulary';
import { Collection, Manifest } from '@iiif/presentation-3';
import { Thumbnail, ThumbnailPanel } from './index';

import { Orientation } from './types/options';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useControls } from 'leva';
import { useState } from 'react';

const Wrapper = () => {
  const url = new URL(window.location.href);
  const contentState = url.searchParams.get('iiif-content');

  const options = {
    ...(contentState && { 'iiif-content': contentState }),
    'Non-paged at End':
      'https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json',
    'No Viewing Hint':
      'https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/no_viewing_hint/v2/manifest.json',
    'Right to Left': 'https://iiif.io/api/cookbook/recipe/0010-book-2-viewing-direction/manifest-rtl.json',
    'Top to bottom': 'https://iiif.io/api/cookbook/recipe/0010-book-2-viewing-direction/manifest-ttb.json',
    'Bottom to top':
      'https://gist.githubusercontent.com/stephenwf/c47dc115059ca0c4f97eb8376ecf8302/raw/933e74cbf9a90b0c0c3f627c508c29dc876f1b66/btt.json',
    Continuous: 'https://iiif.io/api/cookbook/recipe/0011-book-3-behavior/manifest-continuous.json',
  };

  const [resource, setResource] = useState<Manifest | Collection>();

  const [{ iiifContent, currentResourceId, orientation }, setIIIFContent] = useControls(() => ({
    iiifContent: {
      // https://iiif-commons.github.io/fixtures/
      options: options,
    },
    currentResourceId: '',
    orientation: {
      options: {
        Default: 'vertical',
        horizontal: 'horizontal',
        vertical: 'vertical',
      },
    },
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

  return (
    <>
      <ThumbnailPanel
        iiifContent={iiifContent}
        // @ts-ignore
        overrides={overrides}
        onLoad={(resource) => {
          // console.log('onLoad', resource);
          setResource(resource);
          setOverrides({
            viewingDirection: resource.viewingDirection || ViewingDirection.LEFT_TO_RIGHT,
          });
        }}
        currentResourceId={currentResourceId}
        orientation={orientation as Orientation}
        onResourceChanged={(resourceId?: string) => {
          // console.log(resourceId);
          setIIIFContent({
            currentResourceId: resourceId,
          });
        }}
      />
      <button
        onClick={() => {
          let prevResourceId: string | undefined;

          if (resource) {
            const currentResourceIndex = resource.items.findIndex((item) => {
              return item.id === currentResourceId;
            });

            if (currentResourceIndex !== -1 && currentResourceIndex !== 0) {
              prevResourceId = resource.items[currentResourceIndex - 1].id;
            }

            setIIIFContent({
              currentResourceId: prevResourceId as string,
            });
          }
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          let nextResourceId: string | undefined;

          if (resource) {
            const currentResourceIndex = resource.items.findIndex((item) => {
              return item.id === currentResourceId;
            });

            if (currentResourceIndex !== -1 && currentResourceIndex !== resource.items.length - 1) {
              nextResourceId = resource.items[currentResourceIndex + 1].id;

              setIIIFContent({
                currentResourceId: nextResourceId as string,
              });
            } else {
              // default to first
              setIIIFContent({
                currentResourceId: resource.items[0].id as string,
              });
            }
          }
        }}
      >
        Next
      </button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);
