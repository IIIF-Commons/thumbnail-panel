import { Canvas, Collection, Manifest } from '@iiif/presentation-3';
import React, { useEffect, useRef, useState } from 'react';

import { createThumbnailHelper } from '@iiif/vault-helpers';
import { useThumbnailPanelContext } from '../context/IIIFResourceContext';
import { useIsInView } from '../hooks/useIsInView';

interface ThumbnailProps {
  item: Canvas | Collection | Manifest;
  onClick?: (resourceId?: string) => void;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ item, onClick }) => {
  const helper = createThumbnailHelper(); // no vault
  const [thumb, setThumb] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);
  const { resource } = useThumbnailPanelContext();
  const isInView = useIsInView(ref);
  const thumbnailSize = (resource as any)?.thumbnailSize || 200;

  useEffect(() => {
    if (isInView && item && !thumb) {
      getData();
    }

    async function getData() {
      const response = await helper.getBestThumbnailAtSize(item as any, {
        width: thumbnailSize,
        height: thumbnailSize,
      });
      setThumb(response.best as any);
    }
  }, [item, isInView]);

  return (
    <div data-testid="thumbnail-wrapper" ref={ref}>
      <button
        data-testid="thumbnail-button"
        onClick={() => {
          if (onClick) {
            onClick(resource?.id);
          }
        }}
      >
        <figure>
          <div
            style={{
              backgroundColor: '#f0f0f0',
              width: `${thumbnailSize}px`,
              height: `${thumbnailSize}px`,
              objectFit: 'contain',
            }}
          >
            {thumb ? (
              <img src={thumb.id} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} data-testid="thumb-image" />
            ) : (
              <></>
            )}
          </div>
          <figcaption>{item.id}</figcaption>
        </figure>
      </button>
    </div>
  );
};
