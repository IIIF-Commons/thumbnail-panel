import { Canvas, Collection, CollectionItems, Manifest } from '@iiif/presentation-3';
import { createThumbnailHelper } from '@iiif/vault-helpers/thumbnail';

export function getThumbnails(items: Canvas[] | CollectionItems[] = []) {
  const uris = items.map((item) => {
    if (item.type !== 'Canvas') {
      // Get thumbnail a different way
      return;
    }
    // Use a helper here 😁
    return item.items[0].items[0].body.id;
  });
  return uris;
}

// @ts-ignore
export function helperGetThumbnails(iiifResource) {
  const helper = createThumbnailHelper();

  helper
    .getBestThumbnailAtSize(
      iiifResource,
      {
        width: 200,
        height: 200,
        returnAllOptions: true,
        allowUnsafe: true,
      },
      false
    )
    .then((r) => {
      console.log('r', r);
    });
}
