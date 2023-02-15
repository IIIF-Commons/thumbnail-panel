import React from 'react';
import ReactDOM from 'react-dom/client';
import { Thumbnail, ThumbnailPanel } from './index';

const bookFixture = 'https://iiif.io/api/cookbook/recipe/0009-book-1/manifest.json';

const Wrapper = () => {
  return (
    <>
      <ThumbnailPanel iiifContent={bookFixture} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);
