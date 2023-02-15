import { Canvas, Collection, Manifest } from '@iiif/presentation-3';
import React from 'react';

interface ThumbnailProps {
  item: Canvas | Collection | Manifest;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ item }) => {
  return <div>{item.id}</div>;
};
