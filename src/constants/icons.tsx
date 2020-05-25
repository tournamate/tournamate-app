import React from 'react';

import App from '../assets/icons/app-icon.svg';

interface IconProp {
  width?: number;
  height?: number;
}

const defaultProps = {
  width: 100,
  height: 100,
};

export const AppIcon = ({
  width = defaultProps.width,
  height = defaultProps.height,
}: IconProp) => <App width={width} height={height} />;
