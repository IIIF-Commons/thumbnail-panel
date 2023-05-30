import React, { useLayoutEffect, useRef } from 'react';

import { IIIFContentProvider } from '../context/IIIFResourceContext';
import { ThumbnailPanel } from '../components/ThumbnailPanel';
import register from '../lib/preact-custom-element/preact-custom-element';
import { useCustomEvent } from './helpers/use-custom-event';

interface ThumbnailPanelAttributes {
  'iiif-content': string;
  'current-resource-id'?: string;
}

interface ThumbnailPanelProps {
  iiifContent: string;
  currentResourceId?: string;
  __registerPublicApi: (component: any) => void;
}

function ThumbnailPanelWebComponent(props: ThumbnailPanelProps & ThumbnailPanelAttributes) {
  const webComponent = useRef<HTMLElement>();

  useLayoutEffect(() => {
    if (props.__registerPublicApi) {
      props.__registerPublicApi((component: any) => {
        webComponent.current = component;
      });
    }
  }, []);

  const handleOnChange = useCustomEvent(webComponent, 'resource-changed', (e) => e);

  return (
    <IIIFContentProvider>
      <ThumbnailPanel {...props} onResourceChanged={handleOnChange} orientation={'vertical'} />
    </IIIFContentProvider>
  );
}

const thumbnailPanelProps = ['iiif-content', 'current-resource-id'];

if (typeof window !== 'undefined') {
  register(ThumbnailPanelWebComponent, 'thumbnail-panel', thumbnailPanelProps, {
    shadow: false,
    onConstruct(instance: any) {
      instance._props = {
        __registerPublicApi: (api: any) => {
          Object.assign(instance, api(instance));
        },
      };
    },
  });
}
