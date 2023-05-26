import { IIIFContentProvider, useThumbnailPanelContext } from './context/IIIFResourceContext';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThumbnailPanel } from './index';
import { useState } from 'react';

const Wrapper = () => {
  const url = new URL(window.location.href);
  const contentState = url.searchParams.get('iiif-content');
  const [currentId, setCurrentId] = useState<string | undefined>('');

  return (
    <>
      <IIIFContentProvider>
        <div
          style={{
            background: '#333',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
          }}
        >
          <h2>Viewer</h2>
          <dl>
            <dt>Current Resource ID:</dt>
            <dd>{currentId}</dd>
          </dl>
        </div>
        <NavWrapperTest />
        <ThumbnailPanel
          iiifContent={
            contentState ||
            `https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json`
          }
          orientation={`vertical`}
          onResourceChanged={({ resourceIds }) => {
            setCurrentId(resourceIds.current);
          }}
        ></ThumbnailPanel>
      </IIIFContentProvider>
    </>
  );
};

function NavWrapperTest() {
  const {
    state: { isEnd, isStart, next, prev },
  } = useThumbnailPanelContext();

  return (
    <div
      style={{
        padding: '1rem 0',
      }}
    >
      <button onClick={prev?.handlePrevClick} disabled={isStart} data-id={prev?.resourceId}>
        Prev
      </button>
      <button onClick={next?.handleNextClick} disabled={isEnd} data-id={next?.resourceId}>
        Next
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);
