import * as Presentation3 from '@iiif/presentation-3';
import { IIIFContentProvider, useResource } from '../context/IIIFResourceContext';
import React, { useMemo } from 'react';
import { Thumbnail } from './Thumbnail';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';
import { getValue } from '@iiif/vault-helpers';

const Items = () => {
  const { resource, isLoaded } = useResource();
  const sequence = createSequenceHelper();

  const [items, seq] = useMemo(() => {
    if (!resource) {
      //@ts-ignore
      return [];
    }
    //ignore type checking on resource (expecting ManifestNormalized)
    //@ts-ignore
    const [items, seq] = sequence.getManifestSequence(resource, {
      disablePaging: false,
    });

    // if (resource.viewingDirection === 'bottom-to-top') {
    //   return [items, seq.reverse()]
    // }

    return [items, seq];
  }, [resource]);

  if (!isLoaded || !resource || !seq || !items) {
    return <></>;
  }

  const dir = resource.viewingDirection === 'left-to-right' ? 'ltr' : 'rtl';

  const onKeyDown = (e) => {
    if (e.keyCode === 40) {
      const next = 1 + Number(e.currentTarget.getAttribute('data-index'));
      console.log(`div[data-index="${next}"]`);
      (e.currentTarget as HTMLDivElement).parentElement?.parentElement
        ?.querySelector(`div[data-index="${next}"]`)
        ?.focus();
    }
  };

  return (
    <div dir={dir}>
      <h3>{getValue(resource.label)}</h3>

      {seq.map((row, rowIdx) => {
        return (
          <div
            style={{
              padding: 10,
              background: '#f9f9f9',
              display: 'flex',
              flexWrap: 'nowrap',
            }}
          >
            {row.map((idx) => (
              <div
                tabIndex={idx === 0 ? 0 : -1}
                key={rowIdx}
                data-index={idx}
                style={{ display: 'flex', background: '#ddd', borderRadius: 5, margin: 5 }}
                onKeyDown={onKeyDown}
              >
                <Thumbnail key={idx} item={items[idx]} />
              </div>
            ))}
          </div>
        );
      })}

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
