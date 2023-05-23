import '../style.css';

import React, { useEffect, useState } from 'react';

import { IIIFContentProvider, useThumbnailPanelContext } from '../context/IIIFResourceContext';
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
  orientation: Orientation;
  overrides?: Partial<Resource>;
}

export const ThumbnailPanel: React.FC<ThumbnailPanelProps> = ({
  children,
  currentResourceId,
  iiifContent,
  onLoad,
  onResourceChanged,
  orientation = 'vertical',
  overrides,
}) => {
  const [error, setError] = useState(false);
  const [resource, setResource] = useState<Resource | undefined>();

  useEffect(() => {
    if (iiifContent) {
      if (typeof iiifContent === 'string') {
        const controller = new AbortController();

        fetch(iiifContent, { signal: controller.signal })
          .then((json) => {
            setResource(json as any);
            if (onLoad) {
              onLoad(json);
            }
          })
          .catch((e) => setError(e));

        return () => {
          controller.abort();
        };
      } else {
        setResource(iiifContent);
        if (onLoad) {
          onLoad(iiifContent);
        }
      }
    }
  }, [iiifContent]);

  return (
    <>
      <span>where is this</span>
      <IIIFContentProvider
        key={resource?.id}
        initialState={{
          currentResourceId: currentResourceId || '',
          isControlled: !currentResourceId,
          onResourceChanged,
          orientation,
          overrides,
          resource,
        }}
      >
        {/* {error && <p>Error: {error.message}</p>} */}
        <ItemsWrapper currentResourceId={currentResourceId} orientation={orientation} overrides={overrides}>
          <>
            <Items onResourceChanged={onResourceChanged} />
            {children}
          </>
        </ItemsWrapper>
      </IIIFContentProvider>
    </>
  );
};

interface ItemsWrapperProps {
  children: React.ReactNode;
  currentResourceId?: string;
  orientation: Orientation;
  overrides?: Partial<Resource>;
}

function ItemsWrapper({ children, currentResourceId, orientation, overrides }: ItemsWrapperProps) {
  const { dispatch } = useThumbnailPanelContext();

  useEffect(() => {
    if (currentResourceId) {
      dispatch({ type: 'updateCurrentId', id: currentResourceId });
    }
  }, [currentResourceId]);

  useEffect(() => {
    dispatch({
      type: 'updateOrientation',
      orientation,
    });
  }, [orientation]);

  useEffect(() => {
    if (overrides && Object.keys(overrides).length > 0) {
      dispatch({
        type: 'updateOverrides',
        overrides,
      });
    }
  }, [overrides]);
  return <>{children}</>;
}
