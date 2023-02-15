import { ThumbnailPanel } from './index';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useManifest } from './use-manifest';
import { useControls } from 'leva';

const $el = document.getElementById('root');
if (!$el) {
  throw new Error();
}
const root = ReactDOM.createRoot($el);

function App() {
  const { name, manifestId, aNumber, anything } = useControls({
    manifestId: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
    name: 'World',
    aNumber: 0,
    anything: 'testing',
  });

  const manifest = useManifest(manifestId);

    

  return (
    <>
      {name} {aNumber} {anything}
      <ThumbnailPanel />
      <pre>{JSON.stringify(manifest, null, 2)}</pre>
    </>
  );
}

//

root.render(<App />);
