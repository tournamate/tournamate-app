import React, {createRef, Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../shared/methods/normalize';
import {AppInfoService} from '../../services/app-info.service';
import SliderEntry from './image-wrapper.component';

interface Props {}

interface State {}

export default class ImageCarousel extends SliderEntry {
  constructor(props: any) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
    };
  }
  _slider1Ref = createRef();

  _renderItemWithParallax({item, index}: any, parallaxProps: any, ...others) {
    return (
      <SliderEntry
        data={item.illustration}
        parallax={true}
        parallaxProps={parallaxProps}
        {...others}
      />
    );
  }

  mainExample() {
    const {slider1ActiveSlide} = this.state;

    return (
      <View style={{}}>
        <Carousel
          ref={(c: any) => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref as any}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  render() {
    const example1 = this.mainExample();
    return example1;
  }
}

export const ENTRIES1 = [
  {
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
  },

  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: -50,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  slideInnerContainer: {
    // width: SCREEN_WIDTH - 10,
    height: 200,
    // paddingHorizontal: 10,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    marginBottom: AppInfoService.isIOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: 'white',
  },

  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - 8,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
