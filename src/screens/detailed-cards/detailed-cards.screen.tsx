import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {DetailedCardsNav} from '../../components/top-navigations/detailed-cards.component';
import CardInList from '../../components/game-cards/card-list.component';

const DetailedCards = ({navigation}) => {
  const [contestsData, setContestsData] = useState([
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
  return (
    <ScrollView style={styles.container}>
      <Layout>
        <DetailedCardsNav navName="Detailed Cards" navigation={navigation} />
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
            detailedCard
          />
        ))}
      </Layout>
    </ScrollView>
  );
};

export default DetailedCards;

const styles = StyleSheet.create({
  container: {flex: 1, height: '100%'},
});
