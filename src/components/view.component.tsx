import React from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';

interface StyleTypes extends ViewStyle, TextStyle {}

interface Props extends ViewStyle {
  style?: StyleTypes;
  children?: React.ReactNode;
}

const TMView = (props: Props): React.ReactElement => {
  const {style, ...otherProps} = props;
  return <View style={[style, {...otherProps}]}>{props?.children}</View>;
};

export default TMView;
