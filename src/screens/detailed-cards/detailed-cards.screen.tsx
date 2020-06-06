import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import {DetailedCardsNav} from '../../components/top-navigations/detailed-cards.component';

const DetailedCards = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1, height: '100%'}}>
      <Layout style={{flex: 1, height: '100%'}}>
        <DetailedCardsNav name="Detailed Cards" navigation={navigation} />
      </Layout>
    </ScrollView>
  );
};

export default DetailedCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
