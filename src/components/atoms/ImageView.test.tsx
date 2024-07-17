import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ImageView from './ImageView';
import { Image } from 'react-native';

jest.mock('react-native/Libraries/Image/Image', () => 'Image');  // Mock Image component

describe('ImageView', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ImageView />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
    expect(getByTestId('image')).toBeTruthy();
  });

  it('shows loading indicator while the image is loading', () => {
    const { getByTestId } = render(<ImageView imageUrl="https://example.com/image.jpg" />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('hides loading indicator once the image has loaded', async () => {
    const { getByTestId, queryByTestId } = render(<ImageView imageUrl="https://example.com/image.jpg" />);
    const image = getByTestId('image');

    // Simulate image load
    await waitFor(() => {
      image.props.onLoad();
    });

    expect(queryByTestId('activity-indicator')).toBeNull();
  });

  it('applies custom image styles correctly', () => {
    const customStyle = { borderRadius: 10 };
    const { getByTestId } = render(<ImageView imageUrl="https://example.com/image.jpg" imageStyle={customStyle} />);
    const image = getByTestId('image');

    expect(image.props.style).toContainEqual(customStyle);
  });
});
