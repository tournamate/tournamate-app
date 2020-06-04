import React, {Component} from 'react';
import Carousel, {
  Pagination,
  ParallaxImage,
  ParallaxImageProps,
} from 'react-native-snap-carousel';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageURISource,
  ImageRequireSource,
} from 'react-native';
import {withStyles} from '@ui-kitten/components';
import {AppInfoService} from '../../services/app-info.service';

export default class SliderEntry extends Component<any, any> {
  public image({
    url,
    parallax,
    parallaxProps,
  }: {
    url: ImageRequireSource | ImageURISource;
    parallax?: boolean;
    parallaxProps: ParallaxImageProps;
  }) {
    // const {
    //   eva: {style: styles},
    // } = this.props;
    const styles = {};
    return parallax ? (
      <ParallaxImage
        source={typeof url === 'string' ? {uri: url} : url}
        containerStyle={[styles.imageContainer]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={styles.spinnerColor.color}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={typeof url === 'string' ? {uri: url} : url}
        style={styles.image}
      />
    );
  }
  render() {
    // const {
    //   eva: {style: styles},
    // } = this.props;
    const styles = {};
    console.log(this.props, 'props');
    return (
      <TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer}>
        <View style={styles.shadow} />
        <View style={[styles.imageContainer]}>{this.image}</View>
      </TouchableOpacity>
    );
  }
}

export const ThemedSliderEntry = withStyles(SliderEntry, (theme) => ({
  imageContainer: {
    flex: 1,
    marginBottom: AppInfoService.isIOS ? 0 : -1, // Prevent a random Android rendering issue
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  slideInnerContainer: {
    height: 200,
    paddingBottom: 18, // needed for shadow
  },
  spinnerColor: {
    color: theme['color-primary-500'],
  },
}));
