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
    next,
    prev,
    state: { isEnd, isStart },
  } = useThumbnailPanelContext();

  const { handleNextClick, resourceId: nextResourceId } = next;
  const { handlePrevClick, resourceId: prevResourceId } = prev;

  return (
    <div
      style={{
        padding: '1rem 0',
      }}
    >
      <button onClick={handlePrevClick} disabled={isStart} data-id={prevResourceId}>
        Prev
      </button>
      <button onClick={handleNextClick} disabled={isEnd} data-id={nextResourceId}>
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
