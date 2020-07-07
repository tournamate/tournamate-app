import React from 'react';
import {View, TouchableOpacity, ImageProps} from 'react-native';
import {
  Layout,
  ListItem,
  Avatar,
  Divider,
  List,
  Text,
  StyleService,
  useStyleSheet,
  IconProps,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {AuthSchema} from '../../models/user.models';
import {
  PersonLineIcon,
  ArrowIOSForward,
  SwapIcon,
  TrendingIcon,
  PriceTagLineIcon,
  BellLineIcon,
  PhoneCallIcon,
  SettingsLineIcon2,
  BriefCaseLineIcon,
} from '../../components/icons.component';
import {GlobalStyles} from '../../constants/global-styles';
import {ThemeContext, Theme} from '../../services/theme.service';
import {widthPercentageToDP} from '../../shared/methods/normalize';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';

interface Props extends HomeDrawerNavProps<'Account'> {
  authData: AuthSchema;
}

interface MenuProps {
  title: string;
  description: string;
  id: string;
  icon: IconProps;
  onPress: () => null;
}

const Account = ({authData, navigation}: Props) => {
  const data = [
    {
      title: 'Edit profile',
      description: 'Change username, mobile number, etc',
      id: 'edit-profile',
      icon: PersonLineIcon,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      title: 'Transactions',
      description: 'Check all the transactions',
      id: 'transactions',
      icon: SwapIcon,
    },
    {
      title: 'Add money',
      description: 'Add money to the wallet to start playing',
      id: 'add-money',
      icon: PriceTagLineIcon,
    },
    {
      title: 'Notifications',
      description: 'Check notifications',
      id: 'notifications',
      icon: BellLineIcon,
    },
    {
      title: 'Contact support',
      description: 'Contact our respresentatives',
      id: 'contact-support',
      icon: PhoneCallIcon,
    },
    {
      title: 'Settings',
      description: 'customize the settings',
      id: 'settings',
      icon: SettingsLineIcon2,
    },
    {
      title: 'My statistics',
      description: 'Check your previous matches data',
      id: 'my-statistics',
      icon: TrendingIcon,
    },
    {
      title: 'Withdraw money',
      description: 'Withdraw your earnings to the bank account',
      id: 'withdraw-money',
      icon: BriefCaseLineIcon,
    },
  ];
  const ItemImage = () => <Avatar source={{uri: authData.photo}} />;
  const themeService = React.useContext(ThemeContext);
  const handleChangeTheme = (type: Theme) => themeService.setCurrentTheme(type);
  const renderItem = ({item, index}: {item: MenuProps; index: number}) => (
    <ListItem
      title={item.title}
      key={index}
      description={item.description}
      accessoryLeft={item.icon}
      accessoryRight={ArrowIOSForward}
      onPress={item.onPress}
    />
  );
  const styles = useStyleSheet(themedStyle);
  return (
    <Layout style={styles.container}>
      <ListItem
        title={authData.fullName}
        description={authData.mobileNumber || authData.email}
        accessoryLeft={ItemImage}
        style={GlobalStyles.mb10}
      />
      <Divider />
      <View style={styles.cardContainer}>
        {[
          {title: 'Matches won', subText: '20'},
          {title: 'Money Earned', subText: '₹1,000‎'},
          {title: 'Matches Organized', subText: '20'},
        ].map((item) => (
          <View style={styles.cardItem}>
            <Text status="basic">{item.subText}</Text>
            <Text status="basic" style={GlobalStyles.tAlignCenter}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
      <Divider />
      <View style={styles.themeWrapper}>
        <Text style={GlobalStyles.mr10}>Change theme</Text>
        <TouchableOpacity
          style={styles.lightTheme}
          onPress={handleChangeTheme.bind(this, 'light')}
        />
        <TouchableOpacity
          style={styles.darkTheme}
          onPress={handleChangeTheme.bind(this, 'dark')}
        />
      </View>
      <Divider />

      <List data={data as Array<MenuProps>} renderItem={renderItem} />
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  //   signupUserState: signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-basic-transparent-300',
    width: widthPercentageToDP(30),
    paddingVertical: 10,
  },
  themeWrapper: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  lightTheme: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginRight: 20,
  },
  darkTheme: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#000',
  },
});
