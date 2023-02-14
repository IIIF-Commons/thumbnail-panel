import { SpecificationBehaviors, ViewingDirection } from '@iiif/presentation-3';
import { convertPresentation2 } from '@iiif/parser/presentation-2';
import { fetchManifest } from './lib/fetch-manifest';

interface Config {
  iiif?: {
    behavior?: SpecificationBehaviors;
    viewingDirection?: ViewingDirection;
  };
  orientation?: 'horizontal' | 'vertical';
}

const bookFixture = 'https://iiif.io/api/cookbook/recipe/0009-book-1/manifest.json';

const defaultIIIFConfig = {
  behavior: '',
  viewingDirection: '',
};

async function init(manifestId: string, config?: Config) {
  if (!manifestId) return;

  // Get manifest and convert to Pres 3
  const manifestResponse = await fetchManifest(manifestId);
  const pres3 = convertPresentation2(manifestResponse);
  console.log('pres3', pres3);

  // Grab destructured info from top level (or at Canvas level) of the manifest
  const behavior = pres3['behavior'] || ['paged'];
  const viewingDirection = pres3['viewingDirection'] || 'left-to-right';
}

init(bookFixture);

// Create element here, render to the DOM

export const test = 'thumbnail panel';
