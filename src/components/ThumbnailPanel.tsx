import '../style.css';

import React, { useEffect, useState } from 'react';

import { useThumbnailPanelContext } from '../context/IIIFResourceContext';
import Items from './Items';
import { Orientation } from 'src/types/options';
import { type OnResourceChanged, type Resource } from 'src/types/types';
import { fetch } from '@iiif/vault-helpers/fetch';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';

interface ThumbnailPanelProps {
  children?: React.ReactNode;
  currentResourceId?: string;
  iiifContent: string;
  onLoad?: (resource: any) => void;
  onResourceChanged?: OnResourceChanged;
  orientation: Orientation;
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
  const { state, dispatch } = useThumbnailPanelContext();

  useEffect(() => {
    if (!iiifContent) {
      return;
    }

    const controller = new AbortController();

    fetch(iiifContent, { signal: controller.signal })
      .then((json) => {
        // Create sequences to help group resource items
        const sequence = createSequenceHelper();
        // @ts-ignore
        const [, sequences] = sequence.getManifestSequence(json, {
          disablePaging: false,
        });

        // Update Context with ThumbnailPanel config props
        dispatch({
          type: 'initialize',
          payload: {
            currentResourceId,
            isControlled: !!currentResourceId,
            isLoaded: true,
            onResourceChanged,
            resource: json,
            orientation,
            overrides,
            sequences,
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
