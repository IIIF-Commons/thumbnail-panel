import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { fetch } from '@iiif/vault-helpers/fetch';
import * as Presentation3 from '@iiif/presentation-3';

interface IIIFContentContext {
  isLoaded: boolean;
  resource?: Presentation3.Manifest | Presentation3.Collection;
  error: string | any | null;
}

const ReactContext = createContext<IIIFContentContext>({ isLoaded: false, resource: undefined, error: null });

export function useResource() {
  return useContext(ReactContext);
}

export function IIIFContentProvider(props: {
  resource: string | any;
  children: ReactNode;
  overrides?: Partial<Presentation3.Manifest | Presentation3.Collection>;
  onLoad?: (resource?: Presentation3.Manifest | Presentation3.Collection) => void;
}) {
  const [resource, setResource] = useState<Presentation3.Manifest | Presentation3.Collection>();
  const mergedResource = useMemo(() => {
    if (!props.overrides || !resource) {
      return resource;
    }
    return Object.assign({}, resource, props.overrides || {});
  }, [resource, ...Object.values(props.overrides || {})]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!props.resource) {
      return;
    }

    if (typeof props.resource === 'string') {
      const controller = new AbortController();

      fetch(props.resource, { signal: controller.signal })
        .then((json) => {
          setResource(json as any);
          if (props.onLoad) {
            props.onLoad(json);
          }
        })
        .catch((e) => setError(e));

      return () => {
        controller.abort();
      };
    } else {
      setResource(props.resource);
      if (props.onLoad) {
        props.onLoad(props.resource);
      }
    }
  }, [props.resource]);

  const value = useMemo(() => {
    return { resource: mergedResource, error, isLoaded: !!resource };
  }, [mergedResource, error]);

  return <ReactContext.Provider value={value}>{props.children}</ReactContext.Provider>;
}
