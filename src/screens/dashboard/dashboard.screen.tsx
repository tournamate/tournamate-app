import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  VirtualizedList,
  ActivityIndicator,
} from 'react-native';
import {Layout, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';
import {AuthSchema} from '../../models/user.models';
import ImageCarousel from '../../components/carousels/type-1.carousel.component';
import {ArrowForwardIcon} from '../../components/icons.component';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  widthPercentageToDP,
} from '../../shared/methods/normalize';
import {GlobalStyles} from '../../constants/global-styles';
import CardInList from '../../components/game-cards/card-list.component';
import {IconList} from '../../components/game-cards/icon-list.component';
import TMStatusBar from '../../components/status-bar.component';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import contestsStaticData from '../../shared/data/contests-data.json';
import {ContestFieldTypes} from '../../shared/types/contest.types';

interface DashboardProps extends HomeDrawerNavProps<'Dashboard'> {
  authData: AuthSchema;
}

const Dashboard = ({navigation, authData}: DashboardProps) => {
  const styles = useStyleSheet(themedstyles);

  const [dashboardData, setDashboardData] = useState<{
    upcomingOrganizedContests: Array<ContestFieldTypes>;
  }>({
    upcomingOrganizedContests: [],
  });

  const [dashboardLoaders, setDashboardLoaders] = useState({
    upcomingOrganizedContests: false,
  });
  const [limiters, setLimiters] = useState({upcomingOrganizedContests: 3});

  const [fullDataUpdated, setFullDataUpdated] = useState({
    upcomingOrganizedContests: false,
  });

  const getItem = (data: any, index: number) => data[index];

  React.useEffect(() => {
    setDashboardLoaders((s) => ({...s, upcomingOrganizedContests: true}));
    const subscriber = firestore()
      .collection('contests')
      .where('isContestFinished', '==', false)
      .where('organizerInformation.userId', '==', authData.userId)
      .limit(limiters.upcomingOrganizedContests)
      .onSnapshot((documentSnapshot) => {
        const organizedContests = documentSnapshot?.docs.map((obj) => {
          const data = obj.data();
          return {
            id: obj.id,
            ...data,
            contestDate: data.contestDate?.toDate(),
          };
        });
        setDashboardData((s: any) => ({
          ...s,
          upcomingOrganizedContests: organizedContests,
        }));
        setDashboardLoaders((s) => ({...s, upcomingOrganizedContests: false}));
        if (organizedContests.length < limiters.upcomingOrganizedContests) {
          setFullDataUpdated((s) => ({...s, upcomingOrganizedContests: true}));
        }
      });
    return () => subscriber();
  }, [authData, limiters.upcomingOrganizedContests]);

  return (
    <>
      <DashboardTopNav
        name={authData.fullName}
        photoUrl={authData.photo}
        navigation={navigation}
      />
      <TMStatusBar />
      <Layout style={styles.container} level="3">
        <ScrollView showsVerticalScrollIndicator={false}>
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
                onPress: () => navigation.navigate('EditProfile'),
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
                key={data.icon}
                icon={data.icon}
                text={data.text}
                onPress={data.onPress}
              />
            ))}
          </ScrollView>

          <View style={styles.section1}>
            <View style={[styles.sectionInner, styles.gutter]}>
              <Text category="h5">Upcoming Organized Contests</Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('DetailedCards')}>
                <ArrowForwardIcon
                  style={GlobalStyles.icon1}
                  fill={styles.iconColor.backgroundColor}
                />
              </TouchableWithoutFeedback>
            </View>
            {dashboardData?.upcomingOrganizedContests?.length ? (
              <VirtualizedList
                data={dashboardData.upcomingOrganizedContests}
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={0.01}
                onEndReached={() => {
                  if (!fullDataUpdated.upcomingOrganizedContests) {
                    setLimiters((s) => ({
                      ...s,
                      upcomingOrganizedContests:
                        s.upcomingOrganizedContests + 3,
                    }));
                  }
                }}
                horizontal
                initialNumToRender={
                  dashboardData.upcomingOrganizedContests.length
                }
                getItem={getItem}
                keyExtractor={(item) => item?.id || ''}
                ListFooterComponent={
                  !fullDataUpdated.upcomingOrganizedContests ? (
                    <View style={styles.loadMore}>
                      <ActivityIndicator animating size="large" />
                    </View>
                  ) : null
                }
                getItemCount={() =>
                  dashboardData.upcomingOrganizedContests.length
                }
                renderItem={({
                  item,
                  index,
                }: {
                  item: ContestFieldTypes;
                  index: number;
                }) => {
                  return (
                    <CardInList
                      key={item?.id}
                      onPress={() =>
                        navigation.navigate('ContestDetails', {
                          contestDetails: item,
                        })
                      }
                      index={index}
                      title={item?.contestTitle}
                      entryPrice={item?.entryFee}
                      organizer={item?.organizerInformation?.userName || ''}
                      participants={{joined: 30, total: 100}}
                      tags={[
                        'platform',
                        'map',
                        'matchType',
                        'server',
                      ].map((tag) => ({label: item[tag], type: tag}))}
                      // FIX ME : Fix above typing errror
                      timing={{contestDate: item.contestDate}}
                    />
                  );
                }}
              />
            ) : (
              <View style={[GlobalStyles.flexRow, GlobalStyles.ml20]}>
                {contestsStaticData.slice(0, 3).map((item, index) => (
                  <SkeletonPlaceholder
                    key={index}
                    speed={800}
                    highlightColor={styles.placeholderHighlight.backgroundColor}
                    backgroundColor={styles.placeholderBG.backgroundColor}>
                    <View style={GlobalStyles.mr15}>
                      <View style={styles.skeletonImage} />
                      <View
                        style={[
                          {
                            width: widthPercentageToDP(30),
                          },
                          styles.skeletonText,
                        ]}
                      />
                      <View
                        style={[
                          {
                            width: widthPercentageToDP(28),
                          },
                          styles.skeletonText,
                        ]}
                      />
                      <View
                        style={[
                          {
                            width: widthPercentageToDP(25),
                          },
                          styles.skeletonText,
                        ]}
                      />
                    </View>
                  </SkeletonPlaceholder>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </Layout>
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
  skeletonImage: {
    width: 150,
    height: 100,
    borderRadius: 25,
    marginBottom: 10,
  },
  skeletonText: {
    height: 20,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  placeholderBG: {
    backgroundColor: 'background-basic-color-1',
  },
  placeholderHighlight: {
    backgroundColor: 'color-basic-transparent-400',
  },
  loadMore: {width: 150, height: 150, justifyContent: 'center'},
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
