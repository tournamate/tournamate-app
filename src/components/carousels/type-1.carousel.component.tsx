import React, {createRef, Component} from 'react';
import {View, ImageStyle, ViewStyle} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderImage from './slider-image.component';
import {SCREEN_WIDTH} from '../../shared/methods/normalize';
import {withStyles} from '@ui-kitten/components';

interface Props {
  onImagePress?: () => void;
  innerContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  data?: Array<{url: string}>;
  eva?: {style: any};
}

class ImageCarouselComponent extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
    };
  }
  _slider1Ref = createRef();

  _renderItemWithParallax({item}: any, parallaxProps: any) {
    const {onImagePress, innerContainerStyle, imageStyle} = this.props;
    return (
      <SliderImage
        imageUrl={item?.url}
        parallax={true}
        parallaxProps={parallaxProps}
        innerContainerStyle={innerContainerStyle}
        onPress={onImagePress?.bind(this, item)}
        imageStyle={imageStyle}
      />
    );
  }

  mainExample() {
    const {slider1ActiveSlide} = this.state;
    const styles = this.props?.eva?.style;
    const data = this.props?.data || dataForCaoursel;
    return (
      <View>
        <Carousel
          ref={(c: any) => (this._slider1Ref = c)}
          data={data}
          renderItem={this._renderItemWithParallax.bind(this)}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          inactiveDotStyle={styles.inActiveDot}
          dotColor={styles.paginationDotColor.color}
          activeOpacity={1}
          animatedDuration={200}
          dotStyle={styles.paginationDot}
          animatedTension={300}
          inactiveDotColor={styles.inActiveDotColor.color}
          animatedFriction={50}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref as any}
          tappableDots={true}
        />
      </View>
    );
  }

  render() {
    const example1 = this.mainExample();
    return example1;
  }
}

const ImageCarousel = withStyles(ImageCarouselComponent, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['color-basic-1100'],
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  paginationDot: {
    width: 15,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  inActiveDot: {
    width: 8,
  },
  paginationDotColor: {
    color: theme['color-primary-500'],
  },
  inActiveDotColor: {
    color: theme['color-primary-100'],
  },
}));
export default ImageCarousel;

const dataForCaoursel = [
  {
    url: 'https://images.hdqwalls.com/wallpapers/pubg-android-game-4k-eh.jpg',
  },
  {
    url:
      'https://www.itl.cat/pngfile/big/45-450338_pubg-girl-3d-desktop-hd-wallpaper-pubg-wallpaper.jpg',
  },
  {
    url:
      'https://labourenergy.org/wp-content/uploads/2019/12/pubg-winter-wallpaper-hd-scaled.jpg',
  },
  {
    url:
      'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
  },
];
