import React from 'react';
import { render } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer'
import ActivityIndicatorView from './ActivityIndicatorView';

describe('ActivityIndicatorView', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ActivityIndicatorView />);
    const activityIndicator = getByTestId('activity-indicator');
    
    expect(activityIndicator.props.size).toBe('large');
    expect(activityIndicator.props.color).toBe('#fff');
  });

  it('applies custom size and color props', () => {
    const { getByTestId } = render(<ActivityIndicatorView size="small" color="#000" />);
    const activityIndicator = getByTestId('activity-indicator');
    
    expect(activityIndicator.props.size).toBe('small');
    expect(activityIndicator.props.color).toBe('#000');
  });

  it('merges custom style with default style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(<ActivityIndicatorView style={customStyle} />);
    const activityIndicator = getByTestId('activity-indicator');
    
    expect(activityIndicator.props.style).toContainEqual(customStyle);
    expect(activityIndicator.props.style).toContainEqual({
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
    });
  });

  it('renders correctly', () => {
    const tree = TestRenderer.create(<ActivityIndicatorView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
