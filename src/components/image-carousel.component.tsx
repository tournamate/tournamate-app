import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {useStyleSheet, StyleService} from '@ui-kitten/components';

import normalize from '../shared/methods/normalize';

const ImageCarousel = ({
  images = [
    'https://lh4.googleusercontent.com/-1wzlVdxiW14/USSFZnhNqxI/AAAAAAAABGw/YpdANqaoGh4/s1600-w400/Google%2BSydney',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree', // Network image
  ],
  onCurrentImagePressed = () => null,
  sliderHeight = 200,
  dotColor,
  inactiveDotColor,
  paginationBoxVerticalPadding = 20,
  autoplay = false,
  circleLoop = true,
}: any) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SliderBox
      images={images}
      sliderBoxHeight={normalize(sliderHeight)}
      onCurrentImagePressed={onCurrentImagePressed}
      dotColor={dotColor || styles.dotColor.backgroundColor}
      inactiveDotColor={
        inactiveDotColor || styles.inactiveDotColor.backgroundColor
      }
      paginationBoxVerticalPadding={normalize(paginationBoxVerticalPadding)}
      autoplay={autoplay}
      circleLoop={circleLoop}
    />
  );
};

const themedStyles = StyleService.create({
  dotColor: {
    backgroundColor: 'color-primary-600',
  },
  inactiveDotColor: {
    backgroundColor: 'color-primary-100',
  },
});

export default ImageCarousel;
