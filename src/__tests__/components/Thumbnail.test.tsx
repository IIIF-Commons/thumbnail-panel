import * as canvas1 from '../__fixtures__/canvas1.json';
import * as canvasNoThumb from '../__fixtures__/canvas-no-thumb.json';
import * as resource1 from '../__fixtures__/resource1.json';

import { IIIFContentProvider, ReactContext } from '../../context/IIIFResourceContext';
import { render, screen, waitFor } from '@testing-library/react';

import { Canvas } from '@iiif/presentation-3';
import { IIIFContentContext } from '../../context/IIIFResourceContext';
import React from 'react';
import { Thumbnail } from '../../components/Thumbnail';

interface ProviderWrapperProps {
  children: React.ReactNode;
  initialState?: IIIFContentContext;
}

describe('Thumbnail', function () {
  function ProviderWrapper({
    children,
    initialState = {
      currentResourceId: '',
      isControlled: true,
      isLoaded: true,
      orientation: 'vertical',
      resource: resource1 as any,
    },
  }: ProviderWrapperProps) {
    return <IIIFContentProvider initialState={initialState}>{children}</IIIFContentProvider>;
  }

  it('should render the component', () => {
    render(
      <ProviderWrapper>
        <Thumbnail item={canvas1 as Canvas} />
      </ProviderWrapper>
    );
    expect(screen.getByTestId('thumbnail-wrapper')).toBeInTheDocument();
  });

  it('renders a thumbnail image', async () => {
    render(
      <ProviderWrapper>
        <Thumbnail item={canvas1 as Canvas} />
      </ProviderWrapper>
    );
    const el = await screen.findByTestId('thumb-image');
    expect(el).toBeInTheDocument();
  });

  it('calls the onClick handler when the thumbnail is clicked', () => {
    const onClick = vi.fn();
    render(
      <ProviderWrapper>
        <Thumbnail item={canvas1 as Canvas} onClick={onClick} />
      </ProviderWrapper>
    );
    screen.getByTestId('thumbnail-button').click();
    expect(onClick).toHaveBeenCalledWith(resource1.id);
  });

  it("renders only a placeholder if the thumbnail can't be found", async () => {
    render(
      <ProviderWrapper>
        <Thumbnail item={canvasNoThumb as Canvas} />
      </ProviderWrapper>
    );
    await waitFor(() => {
      const el = screen.queryByTestId('thumb-image');
      expect(el).not.toBeInTheDocument();
    });
  });
});
