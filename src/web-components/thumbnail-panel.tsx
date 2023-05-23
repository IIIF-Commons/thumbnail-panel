import register from '../lib/preact-custom-element/preact-custom-element';
import React, { useLayoutEffect, useRef } from 'react';
import { ThumbnailPanel } from '../components/ThumbnailPanel';
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

  const handleOnChange = useCustomEvent(webComponent, 'resource-changed', (e) => ({ resourceId: e }));

  return <ThumbnailPanel {...props} onResourceChanged={handleOnChange} orientation={'vertical'} />;
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
