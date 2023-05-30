import * as Presentation3 from '@iiif/presentation-3';

export type OnResourceChanged = (resourceId: string) => void;
export type Resource = Presentation3.Manifest | Presentation3.Collection;
