import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Layout, Text, Avatar, List} from '@ui-kitten/components';
import {GlobalStyles} from '../../constants/global-styles';
import {widthPercentageToDP} from '../../shared/methods/normalize';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import {AuthSchema} from '../../models/user.models';

interface NotificationProps extends HomeDrawerNavProps<'Notifications'> {
  authData: AuthSchema;
}

const Notifications = ({navigation}: NotificationProps) => {
  return (
    <Layout style={GlobalStyles.flex1}>
      <ScrollView>
        <Text
          category="h4"
          style={GlobalStyles.mb10}
          onPress={() => navigation.navigate('Notifications')}>
          Notifications
        </Text>
        <List
          data={new Array(10).fill({
            description:
              ' Lorem ipsum dolor sit amet conse adipisicing elit. Inventore ab dolor incidunt facilis, ab dolor incidunt facilis, ab dolor incidunt facilis',
            timing: ' Mon at 10:17 PM',
          })}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[GlobalStyles.flexRowWrap4, GlobalStyles.cGutter]}>
              <Avatar
                source={{
                  uri:
                    'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX38935921.jpg',
                }}
                style={GlobalStyles.mr10}
              />
              <View>
                <Text category="p1" style={{width: widthPercentageToDP(82)}}>
                  {item.description}
                </Text>
                <Text appearance="hint" category="p2">
                  {item.timing}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </Layout>
  );
};

export default Notifications;
