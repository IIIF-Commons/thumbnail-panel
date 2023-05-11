import * as canvas1 from '../__fixtures__/canvas1.json';
import * as canvasNoThumb from '../__fixtures__/canvas-no-thumb.json';
import * as resource1 from '../__fixtures__/resource1.json';

import { render, screen, waitFor } from '@testing-library/react';

import { Canvas } from '@iiif/presentation-3';
import React from 'react';
import { ReactContext } from '../../context/IIIFResourceContext';
import { Thumbnail } from '../../components/Thumbnail';

describe('Thumbnail', function () {
  it('should render the component', () => {
    render(<Thumbnail item={canvas1 as Canvas} />);
    expect(screen.getByTestId('thumbnail-wrapper')).toBeInTheDocument();
  });

  it('renders a thumbnail image', async () => {
    render(<Thumbnail item={canvas1 as Canvas} />);
    const el = await screen.findByTestId('thumb-image');
    expect(el).toBeInTheDocument();
  });

  it('calls the onClick handler when the thumbnail is clicked', () => {
    const onClick = vi.fn();
    render(
      <ReactContext.Provider
        value={{
          resource: resource1 as any,
          currentResourceId: '',
          error: null,
          isLoaded: true,
          orientation: 'vertical',
        }}
      >
        <Thumbnail item={canvas1 as Canvas} onClick={onClick} />
      </ReactContext.Provider>
    );
    screen.getByTestId('thumbnail-button').click();
    expect(onClick).toHaveBeenCalledWith(resource1.id);
  });

  it("renders only a placeholder if the thumbnail can't be found", async () => {
    render(<Thumbnail item={canvasNoThumb as Canvas} />);
    await waitFor(() => {
      const el = screen.queryByTestId('thumb-image');
      expect(el).not.toBeInTheDocument();
    });
  });
});
