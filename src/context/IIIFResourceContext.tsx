import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { fetch } from '@iiif/vault-helpers/fetch';
import * as Presentation3 from '@iiif/presentation-3';
import { Options } from 'src/types/options';

interface IIIFContentContext {
  isLoaded: boolean;
  resource?: Presentation3.Manifest | Presentation3.Collection;
  options?: Options;
  error: string | any | null;
}

const ReactContext = createContext<IIIFContentContext>({
  isLoaded: false,
  resource: undefined,
  error: null,
});

export function useThumbnailPanelContext() {
  return useContext(ReactContext);
}

export function IIIFContentProvider(props: {
  resource: string | any;
  children: ReactNode;
  overrides?: Partial<Presentation3.Manifest | Presentation3.Collection>;
  options: Options;
  onLoad?: (resource?: Presentation3.Manifest | Presentation3.Collection) => void;
}) {
  const { options } = props;
  const [resource, setResource] = useState<Presentation3.Manifest | Presentation3.Collection>();
  const mergedResource = useMemo(() => {
    if (!props.overrides || !resource) {
      return resource;
    }

    const values = Object.fromEntries(
      Object.entries(props.overrides).filter(([, value]) => typeof value !== 'undefined')
    );

    return Object.assign({}, resource, values || {});
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
    return { resource: mergedResource, error, isLoaded: !!resource, options: options };
  }, [mergedResource, error, options]);

  return <ReactContext.Provider value={value}>{props.children}</ReactContext.Provider>;
}
