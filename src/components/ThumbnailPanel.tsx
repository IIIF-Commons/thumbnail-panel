import * as Presentation3 from '@iiif/presentation-3';
import { IIIFContentProvider, useThumbnailPanelContext } from '../context/IIIFResourceContext';
import React, { useMemo } from 'react';
import { Thumbnail } from './Thumbnail';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';
import { getValue } from '@iiif/vault-helpers';
import '../style.css';
import { Options } from 'src/types/options';

const Items = () => {
  const { resource, isLoaded, options } = useThumbnailPanelContext();
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

  const onKeyDown = (e: any) => {
    if (e.keyCode === 40) {
      const next = 1 + Number(e.currentTarget.getAttribute('data-index'));
      console.log(`div[data-index="${next}"]`);
      const nextElement = (e.currentTarget as HTMLDivElement).parentElement?.parentElement?.querySelector(
        `div[data-index="${next}"]`
      ) as HTMLElement;
      nextElement.focus();
    }
  };

  return (
    <div dir={dir} thumbnail-panel="" data-orientation={options?.orientation}>
      <h3>{getValue(resource.label)}</h3>
      <span>{options?.orientation}</span>

      {seq.map((row, rowIdx) => {
        return (
          <div thumbnail-group="" key={rowIdx}>
            {row.map((idx, itemIdx) => (
              <div thumbnail-item="" tabIndex={idx === 0 ? 0 : -1} key={itemIdx} data-index={idx} onKeyDown={onKeyDown}>
                <Thumbnail key={idx} item={items[idx]} />
              </div>
            ))}
          </div>
        );
      })}

      {/* <p>{resource.behavior}</p>
      <p>{resource.viewingDirection || 'left-to-right'}</p>
      {resource?.items.map((item, index) => (
        <>
          <Thumbnail key={index} item={item} />
        </>
      ))} */}
    </div>
  );
};

interface ThumbnailPanelProps {
  iiifContent: string;
  overrides?: Partial<Presentation3.Collection | Presentation3.Manifest>;
  options: Options;
  onLoad?: (resource: any) => void;
}

export const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({ iiifContent, options, overrides, onLoad }) => {
  return (
    <IIIFContentProvider resource={iiifContent} overrides={overrides} options={options} onLoad={onLoad}>
      <Items />
    </IIIFContentProvider>
  );
};
