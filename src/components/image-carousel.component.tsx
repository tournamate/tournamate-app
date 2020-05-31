import React, {useState, useRef} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Image, View, Dimensions, ActivityIndicator} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

const width = Dimensions.get('window').width;

//TODO: Refactor this
const ImageCarousel = ({
  images = [
    'https://images.hdqwalls.com/wallpapers/pubg-android-game-4k-eh.jpg',
    'https://www.itl.cat/pngfile/big/45-450338_pubg-girl-3d-desktop-hd-wallpaper-pubg-wallpaper.jpg',
    'https://labourenergy.org/wp-content/uploads/2019/12/pubg-winter-wallpaper-hd-scaled.jpg',
    'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg', // Network image
  ],
  circleLoop,
  autoplay,
  parentWidth,
  loopClonesPerSide,
  parentHeight,
  onSnapToItem = () => null,
  ...props
}: any) => {
  const [isLoading, setIsLoading] = useState<any>({});
  const [currentImage, setCurrentImage] = useState<number>(0);
  let ref = useRef();
  const styles = useStyleSheet(themedStyles);
  const _renderItem = ({
    item,
    index,
  }: {
    item: string | object | unknown;
    index: number;
  }) => {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.image, parentHeight && {height: parentHeight}]}
          source={typeof item === 'string' ? {uri: item} : item}
          resizeMethod={'resize'}
          resizeMode={'cover'}
          onLoad={() => {}}
          onLoadStart={() => {
            let t = isLoading;
            t[index] = true;
            setIsLoading({...t});
          }}
          onLoadEnd={() => {
            let t = isLoading;
            t[index] = false;
            setIsLoading({...t});
          }}
          {...props}
        />
        {isLoading[index] && (
          <ActivityIndicator
            size="large"
            color={styles.dotStyle?.backgroundColor}
            style={styles.activity}
          />
        )}
      </View>
    );
  };
  const onSnap = (index: number) => {
    onSnapToItem(index);
    setCurrentImage(index);
  };
  const pagination = () => {
    return (
      <Pagination
        borderRadius={2}
        dotsLength={images.length}
        activeDotIndex={currentImage}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inActiveDot}
        dotColor={styles.dotStyle?.backgroundColor}
        inactiveDotColor={colors.white}
        inactiveDotScale={0.8}
        carouselRef={ref}
        inactiveDotOpacity={0.8}
        tappableDots={!!ref}
        containerStyle={[styles.paginationBoxStyle]}
        {...props}
      />
    );
  };
  return (
    <View>
      <Carousel
        layout={'default'}
        data={images}
        ref={(c: any) => (ref = c)}
        loop={circleLoop || true}
        enableSnap={true}
        autoplay={autoplay || true}
        itemWidth={parentWidth || width}
        itemHeight={parentHeight || null}
        sliderHeight={parentHeight || null}
        sliderWidth={parentWidth || width}
        loopClonesPerSide={loopClonesPerSide || 5}
        renderItem={(item) => _renderItem(item)}
        onSnapToItem={onSnap}
      />
      {images.length > 1 && pagination()}
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  activity: {
    position: 'absolute',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    alignSelf: 'center',
  },
  paginationBoxStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dotStyle: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'color-primary-500',
  },
  inActiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'color-primary-100',
  },
});
const colors = {
  dotColors: '#BDBDBD',
  white: '#FFFFFF',
};

export default ImageCarousel;
