import { Canvas, Collection, Manifest } from '@iiif/presentation-3';
import React, { useEffect, useState } from 'react';
import { createThumbnailHelper } from '@iiif/vault-helpers';
import { useResource } from '../context/IIIFResourceContext';

interface ThumbnailProps {
  item: Canvas | Collection | Manifest;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ item }) => {
  const helper = createThumbnailHelper(); // no vault
  const [thumb, setThumb] = useState();
  const { resource } = useResource();
  const thumbnailSize = resource?.thumbnailSize || 200;

  useEffect(() => {
    async function getData() {
      const response = await helper.getBestThumbnailAtSize(item, {
        width: thumbnailSize,
        height: thumbnailSize,
      });
      setThumb(response.best);
    }

    item && getData();
  }, [item]);

  if (!thumb) {
    return null;
  }

  return (
    <figure>
      <div style={{ width: `${thumbnailSize}px`, height: `${thumbnailSize}px`, objectFit: 'contain' }}>
        <img src={thumb.id} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
      <figcaption>{item.id}</figcaption>
    </figure>
  );
};
