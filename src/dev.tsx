import { Behavior, ViewingDirection, ViewingHint } from '@iiif/vocabulary';
import { Collection, Manifest } from '@iiif/presentation-3';
import { IIIFContentProvider, useThumbnailPanelContext } from './context/IIIFResourceContext';
import React, { useEffect } from 'react';

import { Orientation } from './types/options';
import ReactDOM from 'react-dom/client';
import { ResourceIds } from './types/types';
import { ThumbnailPanel } from './index';
import { useControls } from 'leva';
import { useState } from 'react';

const Wrapper = () => {
  const url = new URL(window.location.href);
  const contentState = url.searchParams.get('iiif-content');
  const { dispatch, state } = useThumbnailPanelContext();

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
  const [resourceIds, setResourceIds] = useState<ResourceIds>({
    current: '',
    next: undefined,
    previous: undefined,
  });

  const [{ iiifContent, currentResourceId, orientation }, setLevaControls] = useControls(() => ({
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
      value: 125,
    },
  }));

  useEffect(() => {
    setLevaControls({
      currentResourceId: resourceIds.current,
    });
  }, [resourceIds.current]);

  useEffect(() => {
    dispatch({
      type: 'updateOrientation',
      orientation: orientation as Orientation,
    });
  }, [orientation]);

  useEffect(() => {
    if (state.resource) {
      dispatch({
        type: 'updateOverrides',
        overrides: overrides as any,
      });
    }
  }, [overrides.behavior, overrides.viewingDirection, overrides.thumbnailSize]);

  const handleNavClick = (direction: 'next' | 'previous') => {
    const newId = resourceIds[direction];

    if (!newId) {
      return;
    }
    setLevaControls({
      currentResourceId: newId,
    });
  };

  return (
    <>
      <ThumbnailPanel
        iiifContent={iiifContent}
        // @ts-ignore
        overrides={overrides}
        onLoad={(resource) => {
          setResource(resource);
          setOverrides({
            viewingDirection: resource.viewingDirection || ViewingDirection.LEFT_TO_RIGHT,
          });
        }}
        currentResourceId={currentResourceId}
        orientation={orientation as Orientation}
        onResourceChanged={({ resourceIds }) => {
          setResourceIds(resourceIds);
        }}
      />
      <button onClick={() => handleNavClick('previous')} disabled={!resourceIds.previous}>
        Prev
      </button>
      <button onClick={() => handleNavClick('next')} disabled={!resourceIds.next}>
        Next
      </button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IIIFContentProvider>
      <Wrapper />
    </IIIFContentProvider>
  </React.StrictMode>
);
