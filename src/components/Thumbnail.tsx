import { Canvas, Collection, Manifest } from '@iiif/presentation-3';
import React, { useEffect, useState } from 'react';

import { createThumbnailHelper, getValue } from '@iiif/vault-helpers';
import { useThumbnailPanelContext } from '../context/IIIFResourceContext';

interface ThumbnailProps {
  item: Canvas | Collection | Manifest;
  onClick?: (resourceId?: string) => void;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ item, onClick }) => {
  const helper = createThumbnailHelper(); // no vault
  const [thumb, setThumb] = useState<any>();
  const { resource } = useThumbnailPanelContext();
  const thumbnailSize = (resource as any)?.thumbnailSize || 200;

  useEffect(() => {
    async function getData() {
      const response = await helper.getBestThumbnailAtSize(item as any, {
        width: thumbnailSize,
        height: thumbnailSize,
      });
      setThumb(response.best as any);
    }

    item && getData();
  }, [item]);

  return (
    <button
      data-testid="thumbnail-wrapper"
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
        {console.log(item)}
        <figcaption>{getValue(item.label)}</figcaption>
      </figure>
    </button>
  );
};
