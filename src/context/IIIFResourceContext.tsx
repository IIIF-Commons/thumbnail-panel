import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getNavResourceItemId, isFirstResourceItem, isLastResourceItem } from '../lib/helpers';
import { Orientation } from 'src/types/options';
import { type OnResourceChanged, type Resource } from 'src/types/types';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';

export interface IIIFContentContext {
  currentResourceId: string;
  isControlled: boolean;
  isEnd?: boolean;
  isLoaded?: boolean;
  isStart?: boolean;
  onResourceChanged?: OnResourceChanged;
  orientation: Orientation;
  overrides?: Partial<Resource>;
  resource?: Resource;
  sequences?: number[][];
}
type Action =
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
  initialState: {
    currentResourceId: string;
    isControlled: boolean;
    isLoaded?: boolean;
    onResourceChanged?: OnResourceChanged;
    orientation: Orientation;
    overrides?: Partial<Resource>;
    resource?: Resource;
  };
}

const defaultState: IIIFContentContext = {
  currentResourceId: '',
  isControlled: true,
  isEnd: false,
  isLoaded: false,
  isStart: true,
  orientation: 'vertical',
  resource: undefined,
  sequences: [],
};

const ReactContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
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

function useThumbnailPanelContext() {
  const context = useContext(ReactContext);
  if (context === undefined) {
    throw new Error('useThumbnailPanelContext must be used within a IIIFContentProvider');
  }
  return context;
}

/** Handle updates to Context state here */
function reducer(state: State, action: Action) {
  switch (action.type) {
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
    if (resource && isControlled) {
      const sequence = createSequenceHelper();
      // @ts-ignore
      const [items, resourceSequences] = sequence.getManifestSequence(resource, {
        disablePaging: false,
      });

      dispatch({
        type: 'updateSequences',
        sequences: resourceSequences,
      });

      if (isControlled) {
        const id = resource.items[0].id;

        // Pass back the first resource id on load
        onResourceChanged &&
          onResourceChanged({
            resourceIds: {
              current: id,
              next: getNavResourceItemId({
                currentResourceId: id,
                direction: 'next',
                resource,
                sequences: resourceSequences,
              }),
              previous: getNavResourceItemId({
                currentResourceId: id,
                direction: 'prev',
                resource,
                sequences: resourceSequences,
              }),
            },
          });

        // If current resource id is controlled, update context
        dispatch({
          type: 'updateCurrentId',
          id,
        });
      }
    }
  }, [resource]);

  // useEffect(() => {
  //   if (currentResourceId && onResourceChanged) {
  //     onResourceChanged({ resourceId: currentResourceId });
  //   }
  // }, [currentResourceId]);

  const next = () => {
    const nextResourceId = getNavResourceItemId({
      currentResourceId,
      direction: 'next',
      resource,
      sequences,
    });

    nextResourceId &&
      dispatch({
        type: 'updateCurrentId',
        id: nextResourceId,
      });
  };

  const prev = () => {
    const prevResourceId = getNavResourceItemId({
      currentResourceId,
      direction: 'prev',
      resource,
      sequences,
    });
    prevResourceId &&
      dispatch({
        type: 'updateCurrentId',
        id: prevResourceId,
      });
  };

  const value = {
    state: {
      ...state,
      isLoaded: !!resource,
      isEnd: isLastResourceItem(state.currentResourceId, state.resource),
      isStart: isFirstResourceItem(state.currentResourceId, state.resource),
      resource: mergedResource,
    },
    dispatch,
    next: {
      resourceId: getNavResourceItemId({
        currentResourceId,
        direction: 'next',
        resource,
        sequences,
      }),
      handleNextClick: next,
    },
    prev: {
      resourceId: getNavResourceItemId({
        currentResourceId,
        direction: 'prev',
        resource,
        sequences,
      }),
      handlePrevClick: prev,
    },
  };

  return <ReactContext.Provider value={value}>{children}</ReactContext.Provider>;
}

export { IIIFContentProvider, ReactContext, useThumbnailPanelContext };
