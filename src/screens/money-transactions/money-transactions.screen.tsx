import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  Button,
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  List,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  CornerLeftDownIcon,
  CornerRightUpIcon,
  PaperPlaneIcon,
  ArrowBackIcon,
} from '../../components/icons.component';

import TMStatusBar from '../../components/status-bar.component';
import ScreenLoader from '../../components/screen-loader.component';
import {signupUser} from '../../store/actions/authActions';
import {AuthSchema} from '../../models/user.models';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import {GlobalStyles} from '../../constants/global-styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../shared/methods/normalize';
import {numberWithCommas} from '../../shared/methods/useful';

interface Props extends HomeDrawerNavProps<'Dashboard'> {
  authData: AuthSchema;
  signupUserProp: () => void;
}

const MoneyTransactions = ({navigation, authData}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const styles = useStyleSheet(themedStyles);

  const isScreenFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const navigationTiles = [
    {
      title: 'Add Money(₹)',
      Icon: CornerLeftDownIcon,
      onPress: () => null,
    },
    {
      title: 'Withraw Money',
      Icon: CornerRightUpIcon,
      onPress: () => null,
    },
    {
      title: 'Payments Issues',
      Icon: PaperPlaneIcon,
      onPress: () => null,
    },
  ];
  const data = new Array(20).fill({
    title: 'Item',
  });
  const renderItem = () => (
    <View
      style={[
        GlobalStyles.flexRowWrap1,
        GlobalStyles.aiCenter,
        GlobalStyles.pv10,
        styles.itemBorder,
      ]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.aiCenter]}>
        <PaperPlaneIcon
          style={styles.listIcon}
          fill={styles.listIconColor.backgroundColor}
        />
        <View>
          <Text category="h6" style={GlobalStyles.mb10}>
            Pubg Winnings
          </Text>
          <Text category="c1" appearance="hint">
            Match Title
          </Text>
        </View>
      </View>
      <View>
        <Text style={GlobalStyles.tAlignRight} status="success">
          + 23$
        </Text>
        <Text style={GlobalStyles.tAlignRight} category="c2" appearance="hint">
          23 Jul
        </Text>
      </View>
    </View>
  );

  return (
    <Layout style={styles.container}>
      {isScreenFocused && (
        <TMStatusBar translucent backgroundColor="transparent" />
      )}
      {isLoading ? <ScreenLoader loading={isLoading} /> : null}
      <LinearGradient
        colors={[
          styles.headerContainer.backgroundColor as any,
          styles.listItemContainer.backgroundColor,
        ]}
        style={[styles.headerContainer, {paddingTop: insets.top}]}>
        <TouchableOpacity
          style={[styles.backIcon, {top: insets.top, padding: 20}]}
          onPress={() => navigation.goBack()}>
          <ArrowBackIcon
            style={styles.listIcon}
            fill={styles.listIconColor.backgroundColor}
          />
        </TouchableOpacity>
        <View>
          <Text
            category="h1"
            style={[GlobalStyles.mb20, GlobalStyles.tAlignCenter]}>
            ₹{numberWithCommas(1000)}
            {'\n'}
            <Text category="label">(Available Balance)</Text>
          </Text>
        </View>
        <View style={GlobalStyles.flexRowWrap1}>
          {navigationTiles.map((Tile) => (
            <TouchableOpacity style={styles.cardItem} activeOpacity={0.7}>
              <Tile.Icon style={styles.tileIcon} fill="#fff" />
              <Text status="control" style={GlobalStyles.tAlignCenter}>
                {Tile.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      <Layout style={[GlobalStyles.flex1, styles.bodyContainer]}>
        <View
          style={[
            GlobalStyles.flexRowWrap2,
            GlobalStyles.mh20,
            GlobalStyles.mt20,
          ]}>
          <Button
            appearance="outline"
            size="tiny"
            status="basic"
            style={[GlobalStyles.br20, GlobalStyles.mr15, GlobalStyles.mb5]}>
            All
          </Button>
          <Button
            appearance="outline"
            size="tiny"
            status="basic"
            style={[GlobalStyles.br20, GlobalStyles.mr15, GlobalStyles.mb5]}>
            Winning Credits
          </Button>
          <Button
            appearance="outline"
            size="tiny"
            status="basic"
            style={[GlobalStyles.br20, GlobalStyles.mr15, GlobalStyles.mb5]}>
            Deposited Amounts
          </Button>
          <Button
            appearance="outline"
            size="tiny"
            status="basic"
            style={[GlobalStyles.br20, GlobalStyles.mr15, GlobalStyles.mb5]}>
            Withdrawn Amounts
          </Button>
        </View>
        <List
          style={styles.listItemContainer}
          onRefresh={() => null}
          refreshing={false}
          data={data}
          renderItem={renderItem}
        />
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  listItemContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'background-basic-color-1',
  },
  cardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-800',
    borderRadius: 4,
    width: widthPercentageToDP(28),
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: heightPercentageToDP(35),
    backgroundColor: 'color-primary-default',
  },
  bodyContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -15,
  },
  tileIcon: {width: 40, height: 40},
  listIcon: {width: 30, height: 30, marginRight: 20},
  listIconColor: {backgroundColor: 'text-basic-color'},
  backIcon: {position: 'absolute', left: 0},
  itemBorder: {borderBottomColor: '#888888', borderBottomWidth: 0.5},
});

const mapStateToProps = (state) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  signupUserProp: signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransactions);
