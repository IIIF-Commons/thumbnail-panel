import * as Presentation3 from '@iiif/presentation-3';

export type OnResourceChanged = ({
  resourceIds: { current, next, previous },
}: {
  resourceIds: {
    current: string | undefined;
    next: string | undefined;
    previous: string | undefined;
  };
}) => void;
export type Resource = Presentation3.Manifest | Presentation3.Collection;
