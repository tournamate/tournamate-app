import React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Layout, Text, List} from '@ui-kitten/components';
import {GlobalStyles} from '../../constants/global-styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../shared/methods/normalize';
import ImageCarousel from '../../components/carousels/type-1.carousel.component';
import TMStatusBar from '../../components/status-bar.component';

const sliderData = [
  {
    url: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX38935921.jpg',
  },
  {
    url: 'https://www.agilitypr.com/wp-content/uploads/2019/08/mobile-1-1.jpg',
  },
  {
    url:
      'https://codecanyon.img.customer.envatousercontent.com/files/193633512/preview%20image.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=defb5c8659dbd985a63a20eade8729d3',
  },
];

const Matches = () => {
  return (
    <Layout style={[GlobalStyles.flex1]} level="2">
      <ScrollView>
        <ImageCarousel
          innerContainerStyle={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(30),
          }}
          data={sliderData}
        />
        <Text category="h3" style={[GlobalStyles.mb10, GlobalStyles.cGutter]}>
          All games
        </Text>
        <View style={[GlobalStyles.flexRowWrap1]}>
          <List
            numColumns={2}
            data={new Array(5).fill({
              title: 'Pubg',
              description: '200 games played',
              imgUrl:
                'https://i0.wp.com/a4gamer.com/wp-content/uploads/2020/02/pubg.png?fit=512%2C512&ssl=1',
            })}
            renderItem={(data) => (
              <View style={[GlobalStyles.aiCenter, GlobalStyles.m10]}>
                <Image
                  style={styles.image}
                  source={{
                    uri: data.item.imgUrl,
                  }}
                />
                <Text category="h6">{data.item.title}</Text>
                <Text category="c1">{data.item.description}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Matches;

const styles = StyleSheet.create({
  image: {
    width: widthPercentageToDP(45),
    height: 100,
    borderRadius: 5,
  },
});
