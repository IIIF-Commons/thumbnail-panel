import { Canvas, Collection, CollectionItems, Manifest } from '@iiif/presentation-3';
import { createThumbnailHelper } from '@iiif/vault-helpers/thumbnail';

export function getThumbnails(items: Canvas[] | CollectionItems[] = []) {
  const uris = items.map((item) => {
    if (item.type !== 'Canvas') {
      // Get thumbnail a different way
      return;
    }
    // Use a helper here 😁
    // @ts-ignore
    return item.items[0].items[0].body.id;
  });
  return uris;
}

export function helperGetThumbnails(iiifResource: Canvas | CollectionItems) {
  const helper = createThumbnailHelper();

  return helper.getBestThumbnailAtSize(
    // @ts-ignore This type needs to be updated in the PR.
    iiifResource,
    {
      width: 200,
      height: 200,
      returnAllOptions: true,
      allowUnsafe: true,
    },
    false
  );
}
