import * as Presentation3 from '@iiif/presentation-3';

import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Orientation } from 'src/types/options';
import { fetch } from '@iiif/vault-helpers/fetch';

interface IIIFContentContext {
  currentResourceId: string | undefined;
  error: string | any | null;
  isLoaded: boolean;
  orientation: Orientation;
  resource?: Presentation3.Manifest | Presentation3.Collection;
}

export const ReactContext = createContext<IIIFContentContext>({
  currentResourceId: undefined,
  error: null,
  isLoaded: false,
  orientation: 'vertical',
  resource: undefined,
});

export function useThumbnailPanelContext() {
  return useContext(ReactContext);
}

export function IIIFContentProvider(props: {
  resource: string | any;
  children: ReactNode;
  overrides?: Partial<Presentation3.Manifest | Presentation3.Collection>;
  currentResourceId: string | undefined;
  orientation: Orientation;
  onLoad?: (resource?: Presentation3.Manifest | Presentation3.Collection) => void;
  onResourceChanged?: (resourceId: string) => void;
}) {
  const { currentResourceId, orientation, onLoad, overrides } = props;
  const [resource, setResource] = useState<Presentation3.Manifest | Presentation3.Collection>();
  const mergedResource = useMemo(() => {
    if (!overrides || !resource) {
      return resource;
    }

    const values = Object.fromEntries(Object.entries(overrides).filter(([, value]) => typeof value !== 'undefined'));

    return Object.assign({}, resource, values || {});
  }, [resource, ...Object.values(overrides || {})]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!props.resource) {
      return;
    }

    // if it's a url to a manifest
    if (typeof props.resource === 'string') {
      const controller = new AbortController();

      fetch(props.resource, { signal: controller.signal })
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
      // it's an id of a specific resource within a manifest
      setResource(props.resource);
      if (onLoad) {
        onLoad(props.resource);
      }
    }
  }, [props.resource]);

  const value = useMemo(() => {
    return { resource: mergedResource, error, isLoaded: !!resource, orientation, currentResourceId };
  }, [mergedResource, error, orientation, currentResourceId]);

  return <ReactContext.Provider value={value}>{props.children}</ReactContext.Provider>;
}
