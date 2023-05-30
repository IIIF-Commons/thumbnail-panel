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

export { getResourceItemIndex, isFirstResourceItem, isLastResourceItem };
