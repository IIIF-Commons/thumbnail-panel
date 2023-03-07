import { Canvas, Collection, Manifest } from '@iiif/presentation-3';
import React, { useEffect, useState } from 'react';
import { createThumbnailHelper } from '@iiif/vault-helpers';
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

  if (!thumb) {
    return null;
  }

  return (
    <button onClick={() => {
      if (onClick) {
        onClick(resource?.id)
      }
    }}>
      <figure>
        <div style={{ width: `${thumbnailSize}px`, height: `${thumbnailSize}px`, objectFit: 'contain' }}>
          <img src={thumb.id} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <figcaption>{item.id}</figcaption>
      </figure>
    </button>
  );
};
