import '../style.css';
import { useThumbnailPanelContext } from '../context/IIIFResourceContext';
import React, { useEffect, useState } from 'react';

import Items from './Items';
import { Orientation } from 'src/types/options';
import { type OnResourceChanged, type Resource } from 'src/types/types';
import { fetch } from '@iiif/vault-helpers/fetch';

interface ThumbnailPanelProps {
  children?: React.ReactNode;
  currentResourceId?: string;
  iiifContent: string;
  onLoad?: (resource: any) => void;
  onResourceChanged?: OnResourceChanged;
  orientation?: Orientation;
  overrides?: Partial<Resource>;
}

export const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({
  currentResourceId,
  iiifContent,
  onLoad,
  onResourceChanged,
  orientation = 'vertical',
  overrides,
}) => {
  const [error, setError] = useState(false);
  const { dispatch } = useThumbnailPanelContext();

  useEffect(() => {
    if (currentResourceId) {
      dispatch({
        type: 'updateCurrentId',
        id: currentResourceId,
      });
    }
  }, [currentResourceId]);

  useEffect(() => {
    if (!iiifContent) {
      return;
    }

    const controller = new AbortController();

    fetch(iiifContent, { signal: controller.signal })
      .then((json) => {
        // Update Context with ThumbnailPanel config props
        dispatch({
          type: 'initialize',
          payload: {
            currentResourceId: currentResourceId || '',
            isControlled: !!currentResourceId,
            isLoaded: true,
            onResourceChanged,
            resource: json,
            orientation,
            overrides,
          },
        });
        if (onLoad) {
          onLoad(json);
        }
      })
      .catch((e) => setError(e));

    return () => {
      controller.abort();
    };
  }, [iiifContent]);

  return <Items onResourceChanged={onResourceChanged} />;
};
