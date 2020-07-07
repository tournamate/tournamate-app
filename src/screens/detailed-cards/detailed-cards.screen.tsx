import React, {useState, useEffect, createRef} from 'react';
import {StyleSheet, VirtualizedList, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {Text, Divider, Layout} from '@ui-kitten/components';
import {DetailedCardsNav} from '../../components/top-navigations/detailed-cards.component';
import CardInList from '../../components/game-cards/card-list.component';
import {GlobalStyles} from '../../constants/global-styles';
import {heightPercentageToDP} from '../../shared/methods/normalize';
import {CloseIcon, DoneAllIcon} from '../../components/icons.component';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import {AuthSchema} from '../../models/user.models';

interface DetaiedCardProps extends HomeDrawerNavProps<'DetailedCards'> {
  autData: AuthSchema;
}

const actionSheetRef = createRef<{setModalVisible: Function}>();

const DetailedCards = ({navigation}: DetaiedCardProps) => {
  const [contestsData, setContestsData] = useState<Array<{}>>([]);
  useEffect(function fetchData() {
    setContestsData([
      {
        title:
          'Cards contain content and actions about a single subject single subject single subject single subject',
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
  }, []);
  const getItem = (data: [], index: number) => data[index];

  return (
    <Layout style={styles.container}>
      <DetailedCardsNav
        navName="Detailed Cards"
        navigation={navigation}
        onPressFilter={() => actionSheetRef?.current?.setModalVisible()}
      />
      <ActionSheet
        ref={actionSheetRef as any}
        gestureEnabled
        CustomHeaderComponent={<View />}>
        <Layout style={{height: heightPercentageToDP(75)}}>
          <Layout
            level="2"
            style={[GlobalStyles.flexRowWrap2, GlobalStyles.p10]}>
            <CloseIcon fill={'#000'} style={GlobalStyles.icon3} />
            <Text category="h6">Filters</Text>

            <DoneAllIcon fill={'#000'} style={GlobalStyles.icon3} />
          </Layout>

          <Divider />
        </Layout>
      </ActionSheet>
      <View style={(GlobalStyles.cGutter, {paddingBottom: 50})}>
        <VirtualizedList
          data={contestsData}
          initialNumToRender={4}
          getItem={getItem}
          keyExtractor={(item) => item.organizer}
          getItemCount={() => contestsData.length}
          scrollEventThrottle={0.5}
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
                detailedCard
                onPress={() => null}
              />
            );
          }}
        />
      </View>
    </Layout>
  );
};

export default DetailedCards;

const styles = StyleSheet.create({
  container: {flex: 1},
});
