import React, {useRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, BackHandler, ScrollView} from 'react-native';
import {Layout, Text, StyleService, useStyleSheet} from '@ui-kitten/components';

import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';
import {AuthSchema} from '../../models/user.models';
import ImageCarousel from '../../components/carousels/type-1.carousel.component';
import {ArrowForwardIcon} from '../../components/icons.component';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../shared/methods/normalize';
import {GlobalStyles} from '../../constants/global-styles';
import CardInList from '../../components/game-cards/card-list.component';
import {isCloseToRight} from '../../shared/methods/useful';
import {RouterConstants} from '../../constants/router.constants';
import {IconList} from '../../components/game-cards/icon-list.component';

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
  const actionSheetRef = useRef<any>();
  const styles = useStyleSheet(themedstyles);
  return (
    <>
      <DashboardTopNav
        name={authData.fullName}
        photoUrl={authData.photo}
        onPressPhoto={handleOnPhotoPress}
        navigation={props.navigation}
      />
      <ScrollView>
        <Layout style={styles.container} level="3">
          <ImageCarousel
            innerContainerStyle={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT * 0.2,
            }}
            data={sliderData}
          />
          <ScrollView horizontal style={{flexDirection: 'row'}}>
            {[
              {
                icon: 'person-outline',
                color: '#0377fc',
                text: 'Update / Edit profile',
              },
              {icon: 'pricetags-outline', color: '#4FA0FD', text: 'Add money'},
              {
                icon: 'pie-chart-outline',
                color: '#036BE3',
                text: 'Your Statistics',
              },
            ].map((data) => (
              <IconList icon={data.icon} color={data.color} text={data.text} />
            ))}
          </ScrollView>

          <View style={styles.section1}>
            <View style={[styles.sectionInner, styles.gutter]}>
              <Text category="h5">Your upcoming games</Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  props.navigation.navigate(RouterConstants.DetailedCards)
                }>
                <ArrowForwardIcon
                  style={GlobalStyles.icon1}
                  fill={styles.iconColor.backgroundColor}
                />
              </TouchableWithoutFeedback>
            </View>
            <ScrollView horizontal style={styles.flexRow}>
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
                console.log('close to right');
              }}
              scrollEventThrottle={400}>
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
    </>
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
  flexRow: {flexDirection: 'row'},
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
