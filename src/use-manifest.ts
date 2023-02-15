import { upgrade } from '@iiif/parser/upgrader';
import { useEffect, useState } from 'react';
import * as Presentation3 from '@iiif/presentation-3';

export function useManifest(urlOrJson: string | any) {
  const [manifest, setManifest] = useState<Presentation3.Manifest>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!urlOrJson) {
      return;
    }

    if (typeof urlOrJson === 'string') {
      let controller = new AbortController();

      fetch(urlOrJson, { signal: controller.signal })
        .catch((e) => setError(e))
        .then((r) => r.json())
        .then((json) => setManifest(upgrade(json)));

      return () => {
        controller.abort();
      };
    } else {
      setManifest(upgrade(urlOrJson));
    }
  }, [urlOrJson]);

  return [manifest, { isLoading: !manifest, isError: !!error, error }] as const;
}
