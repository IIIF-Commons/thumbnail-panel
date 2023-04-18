import '../style.css';

import * as Presentation3 from '@iiif/presentation-3';

import { IIIFContentProvider, useThumbnailPanelContext } from '../context/IIIFResourceContext';
import React, { useMemo } from 'react';

import { Orientation } from 'src/types/options';
import { Thumbnail } from './Thumbnail';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';
import { getValue } from '@iiif/vault-helpers';

const Items = ({ onResourceChanged }: { onResourceChanged?: (resourceId?: string) => void }) => {
  const { resource, isLoaded, currentResourceId, orientation } = useThumbnailPanelContext();
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
      `div[data-index="${next}"]`;
      const nextElement = (e.currentTarget as HTMLDivElement).parentElement?.parentElement?.querySelector(
        `div[data-index="${next}"]`
      ) as HTMLElement;
      nextElement.focus();
    }
  };

  const isCurrentGroup = (groupIdx: number) => {
    const foundIdx = seq.findIndex((group) => {
      const resourceIdx = items.findIndex((resource) => {
        return resource.id === currentResourceId;
      });
      return group.includes(resourceIdx);
    });

    return foundIdx === groupIdx;
  };

  return (
    <div dir={dir} thumbnail-panel="" data-orientation={orientation}>
      <h3>{getValue(resource.label)}</h3>
      <span>{orientation}</span>

      {seq.map((group, groupIdx) => {
        // console.log('group', group);
        return (
          <div thumbnail-group="" key={groupIdx} data-selected={isCurrentGroup(groupIdx)}>
            {group.map((idx, itemIdx) => (
              <div
                thumbnail-item=""
                tabIndex={idx === 0 ? 0 : -1}
                key={itemIdx}
                data-index={idx}
                onKeyDown={onKeyDown}
                data-selected={currentResourceId === items[idx]?.id}
              >
                <Thumbnail
                  key={idx}
                  item={items[idx]}
                  onClick={() => {
                    // todo: set state
                    if (onResourceChanged) {
                      // console.log(idx);
                      onResourceChanged(items[idx]?.id);
                    }
                  }}
                />
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
  currentResourceId: string | undefined;
  iiifContent: string;
  onLoad?: (resource: any) => void;
  onResourceChanged?: (resourceId?: string) => void;
  orientation: Orientation;
  overrides?: Partial<Presentation3.Collection | Presentation3.Manifest>;
}

export const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({
  iiifContent,
  orientation,
  currentResourceId,
  overrides,
  onLoad,
  onResourceChanged,
}) => {
  return (
    <IIIFContentProvider
      resource={iiifContent}
      overrides={overrides}
      orientation={orientation}
      currentResourceId={currentResourceId}
      onLoad={onLoad}
    >
      <Items onResourceChanged={onResourceChanged} />
    </IIIFContentProvider>
  );
};
