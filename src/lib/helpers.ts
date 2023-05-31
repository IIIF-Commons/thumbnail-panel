import { Resource, Sequences } from 'src/types/types';

import { createSequenceHelper } from '@iiif/vault-helpers/sequences';

type GuardedResource = Resource | undefined;
type GuardedSequences = number[][] | undefined;

const sequenceHelper = createSequenceHelper();

const getIdInSequence = ({
  currentResourceId,
  direction,
  resource,
  sequences,
}: {
  currentResourceId: string;
  direction: 'next' | 'prev';
  resource: Resource;
  sequences: Sequences;
}) => {
  const sequencesIdx = sequences.findIndex((group) => {
    const currentResourceIndex = getResourceItemIndex(currentResourceId, resource);
    return group.includes(currentResourceIndex);
  });

  if (direction === 'next' && sequencesIdx === sequences.length - 1) {
    return;
  }
  if (direction === 'prev' && sequencesIdx === 0) {
    return;
  }

  try {
    const sequenceIndex = sequences[direction === 'next' ? sequencesIdx + 1 : sequencesIdx - 1][0];
    const resourceId = resource.items[sequenceIndex].id;
    return resourceId;
  } catch (e) {
    return '';
  }
};

const getMergedResourceAndSequences = ({
  resource,
  overrides,
}: {
  resource: Resource | undefined;
  overrides: Partial<Resource> | undefined;
}) => {
  // Merge overrides with the Manifest/Canvas
  const mergedResource = !overrides
    ? resource
    : mergeOverridesWithResource({
        resource,
        overrides,
      });

  // Get updated sequences
  // @ts-ignore
  const [, sequences] = sequenceHelper.getManifestSequence(mergedResource, {
    disablePaging: false,
  });

  return { mergedResource, sequences };
};

const getResourceItemIndex = (currentResourceId: string, resource: GuardedResource) => {
  if (!resource || !currentResourceId) {
    return -1;
  }
  const currentResourceIndex = resource.items.findIndex((item) => {
    return item.id === currentResourceId;
  });
  return currentResourceIndex;
};

const isFirstResourceItem = (currentResourceId: string, resource: GuardedResource): boolean | undefined => {
  if (!resource || !currentResourceId) {
    return;
  }
  const currentResourceIndex = getResourceItemIndex(currentResourceId, resource);
  return currentResourceIndex > -1 ? currentResourceIndex === 0 : undefined;
};

const isLastResourceItem = (currentResourceId: string, resource: GuardedResource): boolean | undefined => {
  if (!resource || !currentResourceId) {
    return;
  }
  const currentResourceIndex = getResourceItemIndex(currentResourceId, resource);
  return currentResourceIndex > -1 ? currentResourceIndex === resource.items.length - 1 : undefined;
};

const mergeOverridesWithResource = ({ resource, overrides }: { resource: GuardedResource; overrides: any }) => {
  let mergedResource = resource;

  if (!resource) {
    return;
  }
  if (!overrides) {
    return resource;
  }

  if (overrides && resource) {
    const values = Object.fromEntries(Object.entries(overrides).filter(([, value]) => typeof value !== 'undefined'));
    mergedResource = Object.assign({}, resource, values || {});
  }
  return mergedResource;
};

export {
  getIdInSequence,
  getMergedResourceAndSequences,
  getResourceItemIndex,
  isFirstResourceItem,
  isLastResourceItem,
  mergeOverridesWithResource,
};
