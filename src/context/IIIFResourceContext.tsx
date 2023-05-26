import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { getResourceItemIndex, isFirstResourceItem, isLastResourceItem } from '../lib/helpers';
import { Orientation } from 'src/types/options';
import { type OnResourceChanged, type Resource } from 'src/types/types';

export interface IIIFContentContext {
  currentResourceId?: string;
  isControlled?: boolean;
  isEnd?: boolean;
  isLoaded?: boolean;
  isStart?: boolean;
  onResourceChanged?: OnResourceChanged;
  orientation?: Orientation;
  overrides?: Partial<Resource>;
  resource?: Resource | undefined;
  sequences?: number[][];
}
type Action =
  | {
      type: 'initialize';
      payload: Partial<IIIFContentContext>;
    }
  | {
      type: 'updateCurrentId';
      id: string;
    }
  | {
      type: 'updateOrientation';
      orientation: Orientation;
    }
  | {
      type: 'updateOverrides';
      overrides: Partial<Resource>;
    }
  | {
      type: 'updateSequences';
      sequences: number[][];
    };
type Dispatch = (action: Action) => void;
type State = IIIFContentContext;

export interface IIIFContentProviderProps {
  children: ReactNode;
  initialState?: Partial<IIIFContentContext>;
}

const defaultState: IIIFContentContext = {
  currentResourceId: '',
  isEnd: false,
  isLoaded: false,
  isStart: true,
  orientation: 'vertical',
  sequences: [],
};

const ReactContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
      getNavId: ({
        currentResourceId,
        direction,
      }: {
        currentResourceId: string;
        direction: 'next' | 'prev';
      }) => string | undefined;
      next: {
        resourceId: string | undefined;
        handleNextClick: () => void;
      };
      prev: {
        resourceId: string | undefined;
        handlePrevClick: () => void;
      };
    }
  | undefined
>(undefined);

/** Handle updates to Context state here */
function reducer(state: State, action: Action) {
  console.log('action', action);
  switch (action.type) {
    case 'initialize': {
      return action.payload;
    }
    case 'updateCurrentId': {
      return {
        ...state,
        currentResourceId: action.id,
      };
    }
    case 'updateOrientation': {
      return {
        ...state,
        orientation: action.orientation,
      };
    }
    case 'updateOverrides': {
      return {
        ...state,
        overrides: { ...action.overrides },
      };
    }
    case 'updateSequences': {
      return {
        ...state,
        sequences: action.sequences,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function IIIFContentProvider({ initialState = defaultState, children }: IIIFContentProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { currentResourceId, isControlled, onResourceChanged, overrides, resource, sequences } = state;

  const mergedResource = useMemo(() => {
    if (!overrides || !resource) {
      return resource;
    }

    const values = Object.fromEntries(Object.entries(overrides).filter(([, value]) => typeof value !== 'undefined'));

    return Object.assign({}, resource, values || {});
  }, [resource, ...Object.values(overrides || {})]);

  useEffect(() => {
    if (resource) {
      if (!isControlled) {
        const id = resource.items[0].id;

        // Pass back the first resource id on load
        onResourceChanged &&
          onResourceChanged({
            resourceIds: {
              current: id,
              next: getNavId({
                currentResourceId: id,
                direction: 'next',
              }),
              previous: getNavId({
                currentResourceId: id,
                direction: 'prev',
              }),
            },
          });

        // If current resource id is uncontrolled, update context
        dispatch({
          type: 'updateCurrentId',
          id,
        });
      }
    }
  }, [resource]);

  useEffect(() => {
    if (currentResourceId && onResourceChanged) {
      onResourceChanged({
        resourceIds: {
          current: currentResourceId,
          next: getNavId({
            currentResourceId,
            direction: 'next',
          }),
          previous: getNavId({
            currentResourceId,
            direction: 'prev',
          }),
        },
      });
    }
  }, [currentResourceId]);

  const next = () => {
    const nextResourceId = getNavId({
      currentResourceId,
      direction: 'next',
    });

    nextResourceId &&
      dispatch({
        type: 'updateCurrentId',
        id: nextResourceId,
      });
  };

  const prev = () => {
    const prevResourceId = getNavId({
      currentResourceId,
      direction: 'prev',
    });
    prevResourceId &&
      dispatch({
        type: 'updateCurrentId',
        id: prevResourceId,
      });
  };

  const getNavId = useCallback(
    ({ currentResourceId, direction }: { currentResourceId?: string; direction: 'next' | 'prev' }) => {
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

      try {
        const sequenceIndex = sequences[direction === 'next' ? sequencesIdx + 1 : sequencesIdx - 1][0];
        const resourceId = resource.items[sequenceIndex].id;
        return resourceId;
      } catch (e) {
        return '';
      }
    },
    [resource, sequences]
  );

  const value = {
    state: {
      ...state,
      isLoaded: !!resource,
      isEnd: currentResourceId ? isLastResourceItem(currentResourceId, state.resource) : undefined,
      isStart: currentResourceId ? isFirstResourceItem(currentResourceId, state.resource) : undefined,
      resource: mergedResource,
    },
    dispatch,
    getNavId,
    next: {
      resourceId: getNavId({
        currentResourceId,
        direction: 'next',
      }),
      handleNextClick: next,
    },
    prev: {
      resourceId: getNavId({
        currentResourceId,
        direction: 'prev',
      }),
      handlePrevClick: prev,
    },
  };

  return <ReactContext.Provider value={value}>{children}</ReactContext.Provider>;
}

function useThumbnailPanelContext() {
  const context = useContext(ReactContext);
  if (context === undefined) {
    throw new Error('useThumbnailPanelContext must be used within a IIIFContentProvider');
  }
  return context;
}

export { IIIFContentProvider, ReactContext, useThumbnailPanelContext };
