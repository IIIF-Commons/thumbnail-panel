import * as Presentation3 from '@iiif/presentation-3';
import { IIIFContentProvider, useResource } from '../context/IIIFResourceContext';
import React from 'react';
import { Thumbnail } from './Thumbnail';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';
import { getValue } from '@iiif/vault-helpers';

const Items = () => {
  const { resource, isLoaded } = useResource();
  const sequence = createSequenceHelper();

  if (!isLoaded || !resource) {
    return <></>;
  }

  //ignore type checking on resource (expecting ManifestNormalized)
  //@ts-ignore
  const [items, seq] = sequence.getManifestSequence(resource, {
    disablePaging: false,
  });

  console.log(`seq`, seq);

  return (
    <div>
      <h3>{getValue(resource.label)}</h3>
      <p>{resource.behavior}</p>
      <p>{resource.viewingDirection || 'left-to-right'}</p>
      {resource?.items.map((item, index) => (
        <>
          <Thumbnail key={index} item={item} />
        </>
      ))}
    </div>
  );
};

interface ThumbnailPanelProps {
  iiifContent: string;
  overrides?: Partial<Presentation3.Collection | Presentation3.Manifest>;
  onLoad?: (resource: any) => void;
}

export const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({ iiifContent, overrides, onLoad }) => {
  return (
    <IIIFContentProvider resource={iiifContent} overrides={overrides} onLoad={onLoad}>
      <Items />
    </IIIFContentProvider>
  );
};
