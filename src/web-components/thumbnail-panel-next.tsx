import React, { useLayoutEffect, useRef } from 'react';
import NextButton from '../components/NextButton';
import register from '../lib/preact-custom-element/preact-custom-element';

interface ThumbnailPanelAttributes {
  whatever: string;
}

interface ThumbnailPanelNextProps {
  whatever: string;
  __registerPublicApi: (component: any) => void;
}

function ThumbnailPanelNextWebComponent(props: ThumbnailPanelNextProps & ThumbnailPanelAttributes) {
  const webComponent = useRef<HTMLElement>();

  useLayoutEffect(() => {
    if (props.__registerPublicApi) {
      props.__registerPublicApi((component: any) => {
        webComponent.current = component;
      });
    }
  }, []);

  //   const handleOnChange = useCustomEvent(webComponent, 'resource-changed', (e) => ({ resourceId: e }));

  return <NextButton />;
}

const thumbnailPanelNextProps = ['whatever'];

if (typeof window !== 'undefined') {
  register(ThumbnailPanelNextWebComponent, 'thumbnail-panel-next', thumbnailPanelNextProps, {
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
