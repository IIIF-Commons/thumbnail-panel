import * as canvas1 from '../__fixtures__/canvas1.json';

import { render, screen } from '@testing-library/react';

import { Canvas } from '@iiif/presentation-3';
import React from 'react';
import { Thumbnail } from '../../components/Thumbnail';

describe('Thumbnail', function () {
  it('should render the component', () => {
    render(<Thumbnail item={canvas1 as Canvas} />);
    expect(screen.getByTestId('thumbnail-wrapper')).toBeInTheDocument();
  });
});
