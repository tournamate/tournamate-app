import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, VirtualizedList} from 'react-native';
import {Layout, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';

import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';
import {AuthSchema} from '../../models/user.models';
import ImageCarousel from '../../components/carousels/type-1.carousel.component';
import {ArrowForwardIcon} from '../../components/icons.component';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../shared/methods/normalize';
import {GlobalStyles} from '../../constants/global-styles';
import CardInList from '../../components/game-cards/card-list.component';
import {IconList} from '../../components/game-cards/icon-list.component';
import TMStatusBar from '../../components/status-bar.component';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import Contests from '../../services/contest.service';

interface DashboardProps extends HomeDrawerNavProps<'Dashboard'> {
  authData: AuthSchema;
}

const Dashboard = ({navigation, authData}: DashboardProps) => {
  const styles = useStyleSheet(themedstyles);
  const [constestsData, setContestsData] = React.useState([] as any);
  const getItem = (data: any, index: number) => data[index];
  const tempData = [
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
  ];
  React.useEffect(() => {
    // const contestData = data?.docs.map((item) => item.data());
    // setContestsData(contestData as any);
    firestore()
      .collection('contests')
      .where('contestTitle', '<=', 'Ghjjjg')
      // .where('organizerInformation.userId', '==', authData.userId)
      .orderBy('contestTitle', 'desc')
      .get()
      .then((data) =>
        console.log(
          data.docs.map((obj) => obj.data()),
          'firestore',
        ),
      )
      .catch((err) => console.log(err, 'err firebase'));

    // const subscriber = firestore()
    //   .collection('contests')
    //   .where('entryFee', '>=', 10)
    //   .where('entryFee', '<=', 30)
    //   .onSnapshot((documentSnapshot) => {
    //     setContestsData(
    //       documentSnapshot.docs.map((obj) => ({
    //         id: obj.id,
    //         ...obj.data(),
    //       })),
    //     );
    //   });

    // // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);
  return (
    <>
      <DashboardTopNav
        name={authData.fullName}
        photoUrl={authData.photo}
        navigation={navigation}
      />
      <TMStatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout style={styles.container} level="3">
          <ImageCarousel
            innerContainerStyle={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT * 0.2,
            }}
            data={sliderData}
          />

          <ScrollView
            horizontal
            style={GlobalStyles.flexRow}
            showsHorizontalScrollIndicator={false}>
            {[
              {
                icon: 'person-outline',
                text: 'Update profile',
                onPress: () => null,
              },
              {
                icon: 'pricetags-outline',
                text: 'Add money',
                onPress: () => null,
              },
              {
                icon: 'plus-square-outline',
                text: 'Organize contest',
                onPress: () => navigation.navigate('OrganizeContest'),
              },
              {
                icon: 'pie-chart-outline',
                text: 'Your statistics',
                onPress: () => navigation.navigate('OrganizeContest'),
              },
            ].map((data) => (
              <IconList
                key={data.text}
                icon={data.icon}
                text={data.text}
                onPress={data.onPress}
              />
            ))}
          </ScrollView>

          <View style={styles.section1}>
            <View style={[styles.sectionInner, styles.gutter]}>
              <Text category="h5">Your upcoming contests</Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('DetailedCards')}>
                <ArrowForwardIcon
                  style={GlobalStyles.icon1}
                  fill={styles.iconColor.backgroundColor}
                />
              </TouchableWithoutFeedback>
            </View>
            {constestsData.length ? (
              <VirtualizedList
                data={constestsData}
                showsHorizontalScrollIndicator={false}
                horizontal
                initialNumToRender={constestsData.length}
                getItem={getItem}
                keyExtractor={(item) => item?.organizerInformation.userId}
                getItemCount={() => constestsData.length}
                renderItem={({item, index}: {item: any; index: number}) => {
                  return (
                    <CardInList
                      key={item?.organizerInformation.userId}
                      onPress={() => navigation.navigate('ContestDetails')}
                      index={index}
                      title={item?.contestTitle}
                      entryPrice={item?.entryFee}
                      organizer={item?.organizerInformation.userName}
                      participants={{joined: 30, total: 100}}
                      tags={[
                        item.platform,
                        item.map,
                        item.matchType,
                        item.server,
                      ]}
                      timing={new Date()}
                    />
                  );
                }}
              />
            ) : null}
          </View>
          <View style={styles.section1}>
            <View style={[styles.sectionInner, styles.gutter]}>
              <Text category="h5">Ongoing pubg contests</Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('DetailedCards')}>
                <ArrowForwardIcon
                  style={GlobalStyles.icon1}
                  fill={styles.iconColor.backgroundColor}
                />
              </TouchableWithoutFeedback>
            </View>
            <VirtualizedList
              data={tempData}
              horizontal
              initialNumToRender={4}
              getItem={getItem}
              keyExtractor={(item) => item.organizer}
              getItemCount={() => 4}
              renderItem={({item, index}: {item: any; index: number}) => {
                return (
                  <CardInList
                    key={item.organizer}
                    index={index}
                    title={item.title}
                    entryPrice={item.entryPrice}
                    organizer={item.organizer}
                    participants={item.participants}
                    tags={item.tags}
                    timing={item.timing}
                    onPress={() => null}
                  />
                );
              }}
            />
          </View>
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
