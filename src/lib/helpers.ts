import { Resource } from 'src/types/types';

type GuardedResource = Resource | undefined;
type GuardedSequences = number[][] | undefined;

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

const getResourceItemIndex = (currentResourceId: string, resource: GuardedResource) => {
  if (!resource || !currentResourceId) {
    return -1;
  }
  const currentResourceIndex = resource.items.findIndex((item) => {
    return item.id === currentResourceId;
  });
  return currentResourceIndex;
};

const getNavResourceItemId = ({
  currentResourceId,
  direction,
  resource,
  sequences,
}: {
  currentResourceId: string;
  direction: 'next' | 'prev';
  resource: GuardedResource;
  sequences: GuardedSequences;
}) => {
  if (!currentResourceId || !resource || !sequences) {
    return;
  }

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

  const resourceId = resource.items[sequences[direction === 'next' ? sequencesIdx + 1 : sequencesIdx - 1][0]].id;
  return resourceId;
};

export { getNavResourceItemId, getResourceItemIndex, isFirstResourceItem, isLastResourceItem };
