import React from 'react';
import { IIIFContentProvider, useResource } from '../context/IIIFResourceContext';
import { Thumbnail } from './Thumbnail';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';

const Items = () => {
  const { resource, isLoaded } = useResource();
  const sequence = createSequenceHelper();

  if (!isLoaded || !resource) return <></>;

  //ignore type checking on resource (expecting ManifestNormalized)
  //@ts-ignore
  const [items, seq] = sequence.getManifestSequence(resource, {
    disablePaging: false,
  });

  console.log(`seq`, seq);

  return (
    <div>
      {resource?.items.map((item) => (
        <>
          <Thumbnail item={item} />
        </>
      ))}
    </div>
  );
};

interface ThumbnailPanelProps {
  iiifContent: string;
}

export const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({ iiifContent }) => {
  return (
    <IIIFContentProvider resource={iiifContent}>
      <Items />
    </IIIFContentProvider>
  );
};
