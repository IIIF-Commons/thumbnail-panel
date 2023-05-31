import * as Presentation3 from '@iiif/presentation-3';

export type OnResourceChanged = ({ resourceIds: { current, next, previous } }: { resourceIds: ResourceIds }) => void;

export type Resource = Presentation3.Manifest | Presentation3.Collection;

export type ResourceIds = {
  current: string | undefined;
  next: string | undefined;
  previous: string | undefined;
};

export type Sequences = number[][];
