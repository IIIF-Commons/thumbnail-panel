import React, { ReactNode, createContext, useCallback, useContext, useEffect } from 'react';
import {
  getIdInSequence,
  getMergedResourceAndSequences,
  isFirstResourceItem,
  isLastResourceItem,
} from '../lib/helpers';
import { Orientation } from 'src/types/options';
import { Sequences, type OnResourceChanged, type Resource } from 'src/types/types';
import { createSequenceHelper } from '@iiif/vault-helpers/sequences';

type GetNavIdArgs = {
  currentResourceId: string;
  direction: 'next' | 'prev';
};

export interface IIIFContentContext {
  currentResourceId: string;
  getNavId?: ({ currentResourceId, direction }: GetNavIdArgs) => string | undefined;
  isControlled?: boolean;
  isEnd?: boolean;
  isLoaded?: boolean;
  isStart?: boolean;
  next?: {
    resourceId: string | undefined;
    handleNextClick: () => void;
  };
  prev?: {
    resourceId: string | undefined;
    handlePrevClick: () => void;
  };
  onResourceChanged?: OnResourceChanged;
  orientation: Orientation;
  overrides?: Partial<Resource>;
  resource?: Resource | undefined;
  sequences?: Sequences;
}
type Action =
  | {
      type: 'initialize';
      payload: IIIFContentContext;
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
    };
type Dispatch = (action: Action) => void;
type State = IIIFContentContext;

export interface IIIFContentProviderProps {
  children: ReactNode;
  initialState?: IIIFContentContext;
}

const ReactContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const sequenceHelper = createSequenceHelper();

/** Handle updates to Context state here */
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'initialize': {
      const { mergedResource, sequences } = getMergedResourceAndSequences({
        resource: action.payload.resource,
        overrides: action.payload.overrides,
      });

      return {
        ...action.payload,
        resource: mergedResource,
        sequences,
      };
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
      console.log('action.overrides', action.overrides);
      const { mergedResource, sequences } = getMergedResourceAndSequences({
        resource: state.resource,
        overrides: action.overrides,
      });

      return {
        ...state,
        overrides: { ...action.overrides },
        resource: mergedResource,
        sequences,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const defaultState: IIIFContentContext = {
  currentResourceId: '',
  isEnd: false,
  isLoaded: false,
  isStart: true,
  orientation: 'vertical',
};

function IIIFContentProvider({ initialState = defaultState, children }: IIIFContentProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { currentResourceId, isControlled, onResourceChanged, overrides, resource, sequences } = state;

  const handleResourceChanged = (id: string) => {
    return {
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
    };
  };

  useEffect(() => {
    if (resource && !isControlled) {
      const id = resource.items[0].id;

      // Pass back the first resource id on load
      onResourceChanged && onResourceChanged(handleResourceChanged(id));

      dispatch({
        type: 'updateCurrentId',
        id,
      });
    }
  }, [resource?.id]);

  useEffect(() => {
    if (currentResourceId && onResourceChanged) {
      onResourceChanged(handleResourceChanged(currentResourceId));
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
    ({ currentResourceId, direction }: GetNavIdArgs) => {
      if (!currentResourceId || !resource || !sequences) {
        return;
      }

      return getIdInSequence({
        currentResourceId,
        direction,
        resource,
        sequences,
      });
    },
    [resource, sequences]
  );

  const value = {
    state: {
      ...state,
      getNavId,
      isLoaded: !!resource,
      isEnd: currentResourceId ? isLastResourceItem(currentResourceId, state.resource) : undefined,
      isStart: currentResourceId ? isFirstResourceItem(currentResourceId, state.resource) : undefined,
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
    },
    dispatch,
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
