import { Collection, Manifest, SpecificationBehaviors, ViewingDirection } from '@iiif/presentation-3';
import { convertPresentation2 } from '@iiif/parser/presentation-2';
import { fetchManifest } from './lib/fetch-manifest';
import { getThumbnails, helperGetThumbnails } from './lib/get-thumbnails';
import { writeToTheDom } from './lib/write-to-dom';
import { fetch } from '@iiif/vault-helpers/fetch';

interface Config {
  iiif?: {
    behavior?: SpecificationBehaviors;
    viewingDirection?: ViewingDirection;
  };
  orientation?: 'horizontal' | 'vertical';
}

const bookFixture = 'https://iiif.io/api/cookbook/recipe/0009-book-1/manifest.json';

const defaultIIIFConfig = {
  behavior: ['paged'],
  viewingDirection: 'left-to-right',
};

async function init(resourceId: string, config?: Config) {
  if (!resourceId) {
    return;
  }

  // Get manifest and convert to Pres 3
  const resourceResponse = await fetch(resourceId);
  const pres3: Manifest | Collection = convertPresentation2(resourceResponse);
  console.log('pres3', pres3);

  // Grab destructured info from top level (or at Canvas level) of the manifest
  const behavior = pres3['behavior'] || defaultIIIFConfig.behavior;
  const viewingDirection = pres3['viewingDirection'] || defaultIIIFConfig.viewingDirection;

  // Get thumbnails from helper
  const thumbnails = await Promise.all(pres3.items.map((canvas) => helperGetThumbnails(canvas)));
  console.log('thumbnails', thumbnails);

  // Write to the DOM
  thumbnails.forEach((thumb) => {
    if (thumb.best) {
      writeToTheDom(thumb.best.id);
    }
  });
}

init(bookFixture);

export const test = 'thumbnail panel';
