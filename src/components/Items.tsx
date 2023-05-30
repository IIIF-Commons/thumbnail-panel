import '../style.css';

import { OnResourceChanged } from 'src/types/types';
import React from 'react';
import { Thumbnail } from './Thumbnail';
import { useThumbnailPanelContext } from '../context/IIIFResourceContext';

interface ItemsProps {
  onResourceChanged?: OnResourceChanged;
}

const Items: React.FC<ItemsProps> = ({ onResourceChanged }) => {
  const {
    dispatch,
    state: { currentResourceId, getNavId, isControlled, isLoaded, next, prev, orientation, resource, sequences },
  } = useThumbnailPanelContext();

  if (!isLoaded || !resource || !sequences || !resource?.items) {
    return <></>;
  }

  const dir = !resource.viewingDirection || resource.viewingDirection === 'left-to-right' ? 'ltr' : 'rtl';

  const onKeyDown = (e: any) => {
    if (e.keyCode === 40) {
      const next = 1 + Number(e.currentTarget.getAttribute('data-index'));
      `div[data-index="${next}"]`;
      const nextElement = (e.currentTarget as HTMLDivElement).parentElement?.parentElement?.querySelector(
        `div[data-index="${next}"]`
      ) as HTMLElement;
      nextElement.focus();
    }
  };

  const isCurrentGroup = (groupIdx: number) => {
    const foundIdx = sequences.findIndex((group) => {
      const resourceIdx = resource.items.findIndex((resource) => {
        return resource.id === currentResourceId;
      });
      return group.includes(resourceIdx);
    });

    return foundIdx === groupIdx;
  };

  const handleThumbClick = (resourceId: string) => {
    if (onResourceChanged && getNavId) {
      onResourceChanged({
        resourceIds: {
          current: resourceId,
          next: getNavId({ currentResourceId: resourceId, direction: 'next' }),
          previous: getNavId({ currentResourceId: resourceId, direction: 'prev' }),
        },
      });
    }
    if (!isControlled) {
      dispatch({ type: 'updateCurrentId', id: resourceId });
    }
  };

  return (
    <div
      dir={dir}
      thumbnail-panel=""
      data-orientation={orientation}
      data-current-resource={currentResourceId}
      data-next-resource={next?.resourceId}
      data-previous-resource={prev?.resourceId}
    >
      {sequences.map((group, groupIdx) => {
        return (
          <div thumbnail-group="" key={groupIdx} data-selected={isCurrentGroup(groupIdx)}>
            {group.map((idx, itemIdx) => (
              <div
                thumbnail-item=""
                tabIndex={idx === 0 ? 0 : -1}
                key={itemIdx}
                data-index={idx}
                onKeyDown={onKeyDown}
                data-selected={currentResourceId === resource.items[idx]?.id}
              >
                <Thumbnail
                  key={idx}
                  item={resource.items[idx]}
                  onClick={() => handleThumbClick(resource.items[idx]?.id)}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Items;
