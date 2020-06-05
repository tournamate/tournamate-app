import React, {useRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, BackHandler, Image, ScrollView} from 'react-native';
import {
  Layout,
  Text,
  StyleService,
  useStyleSheet,
  Button,
} from '@ui-kitten/components';

import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';
import {AuthSchema} from '../../models/user.models';
import {ProfileDetails} from '../../components/profile-bottom-sheet.component';
import ImageCarousel from '../../components/carousels/type-1.carousel.component';
import {ArrowForwardIcon} from '../../components/icons.component';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../shared/methods/normalize';
import {GlobalStyles} from '../../constants/global-styles';
import {trimString} from '../../shared/methods/trimString';
import CardInList from '../../components/game-cards/card-list.component';
import {isCloseToRight} from '../../shared/methods/useful';

const Dashboard = (props: {authData: AuthSchema; navigation: any}) => {
  const {authData} = props;
  const [contestsData, setContestsData] = useState([
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Karthik',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Ashok',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Shankar',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Newton',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Shankar',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Newton',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Shankar',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Newton',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Shankar',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Newton',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
  ]);
  const handleOnPhotoPress = () => {
    setTimeout(() => {
      actionSheetRef.current.snapTo(3);
    }, 10);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      actionSheetRef?.current?.snapTo(4);
      return true;
    });
  }, []);
  const actionSheetRef = useRef<any>();
  const styles = useStyleSheet(themedstyles);
  return (
    <ScrollView>
      <Layout style={styles.container} level="3">
        <DashboardTopNav
          name={authData.fullName}
          photoUrl={authData.photo}
          onPressPhoto={handleOnPhotoPress}
          navigation={props.navigation}
        />
        <ImageCarousel
          innerContainerStyle={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.2,
          }}
          data={sliderData}
        />
        <View style={styles.section1}>
          <View style={[styles.sectionInner, styles.gutter]}>
            <Text category="h5">Your upcoming games</Text>
            <TouchableWithoutFeedback
              onPress={() => actionSheetRef.current.snapTo(0)}>
              <ArrowForwardIcon
                style={GlobalStyles.icon1}
                fill={styles.iconColor.backgroundColor}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView horizontal style={{flexDirection: 'row'}}>
            {[
              {
                title:
                  'Cards contain content and actions about a single subject',
                entryPrice: 50,
                organizer: 'Karthik',
                participants: {joined: 30, total: 100},
                tags: ['Pubg', 'Solo', 'Vekandi'],
                timing: {},
              },
              {
                title:
                  'Cards contain content and actions about a single subject',
                entryPrice: 50,
                organizer: 'Ashok',
                participants: {joined: 30, total: 100},
                tags: ['Pubg', 'Solo', 'Vekandi'],
                timing: {},
              },
              {
                title:
                  'Cards contain content and actions about a single subject',
                entryPrice: 50,
                organizer: 'Shankar',
                participants: {joined: 30, total: 100},
                tags: ['Pubg', 'Solo', 'Vekandi'],
                timing: {},
              },
              {
                title:
                  'Cards contain content and actions about a single subject',
                entryPrice: 50,
                organizer: 'Newton',
                participants: {joined: 30, total: 100},
                tags: ['Pubg', 'Solo', 'Vekandi'],
                timing: {},
              },
            ].map((detail, index) => (
              <CardInList
                key={detail.organizer}
                index={index}
                title={detail.title}
                entryPrice={detail.entryPrice}
                organizer={detail.organizer}
                participants={detail.participants}
                tags={detail.tags}
                timing={detail.timing}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.section1}>
          <View style={[styles.sectionInner, styles.gutter]}>
            <Text category="h5">Pubg Contests</Text>
            <TouchableWithoutFeedback
              onPress={() => actionSheetRef.current.snapTo(0)}>
              <ArrowForwardIcon
                style={GlobalStyles.icon1}
                fill={styles.iconColor.backgroundColor}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            horizontal
            style={{flexDirection: 'row'}}
            snapToEnd
            onScroll={({nativeEvent}) => {
              if (isCloseToRight(nativeEvent)) {
                const localContests = [...contestsData];
                localContests.push({
                  title:
                    'Cards contain content and actions about a single subject',
                  entryPrice: 50,
                  organizer: 'Karthik',
                  participants: {joined: 30, total: 100},
                  tags: ['Pubg', 'Solo', 'Vekandi'],
                  timing: {},
                });
                localContests.push({
                  title:
                    'Cards contain content and actions about a single subject',
                  entryPrice: 50,
                  organizer: 'Karthik',
                  participants: {joined: 30, total: 100},
                  tags: ['Pubg', 'Solo', 'Vekandi'],
                  timing: {},
                });
                localContests.push({
                  title:
                    'Cards contain content and actions about a single subject',
                  entryPrice: 50,
                  organizer: 'Karthik',
                  participants: {joined: 30, total: 100},
                  tags: ['Pubg', 'Solo', 'Vekandi'],
                  timing: {},
                });
                setContestsData(localContests);
                console.log('close to right');
              }
            }}
            scrollEventThrottle={400}
            // onScrollEndDrag={() => console.log('on end')}
            // onMomentumScrollEnd={() => console.log('on end')}
          >
            {contestsData.map((detail, index) => (
              <CardInList
                key={detail.organizer}
                index={index}
                title={detail.title}
                entryPrice={detail.entryPrice}
                organizer={detail.organizer}
                participants={detail.participants}
                tags={detail.tags}
                timing={detail.timing}
              />
            ))}
          </ScrollView>
        </View>
        {/* <ProfileDetails actionSheetRef={actionSheetRef} /> */}
      </Layout>
    </ScrollView>
  );
};

const themedstyles = StyleService.create({
  container: {flex: 1, paddingBottom: 20},
  gutter: {
    paddingHorizontal: 20,
  },
  section1: {marginBottom: 20, marginTop: 20},
  sectionInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconColor: {
    backgroundColor: 'text-basic-color',
  },
});

const mapStateToProps = (state: any) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  //   signupUserState: signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

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
