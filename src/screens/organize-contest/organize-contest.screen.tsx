import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  Layout,
  Input,
  Divider,
  Select,
  SelectItem,
  Datepicker,
  TopNavigationAction,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {AuthSchema} from '../../models/user.models';
import {CommonTopNav} from '../../components/top-navigations/common-top.component';
import {GlobalStyles} from '../../constants/global-styles';
import {KeyboardAvoidingView} from '../../components/kb-avoiding-view.component';
import {CalendarIcon, DoneAllIcon} from '../../components/icons.component';
import {widthPercentageToDP} from '../../shared/methods/normalize';

const OrganizeContest = ({
  authData,
  navigation,
}: {
  authData: AuthSchema;
  navigation: any;
}) => {
  const NavRightAction = () => (
    <TopNavigationAction
      icon={DoneAllIcon}
      onPress={() => console.log('pressed')}
    />
  );
  return (
    <Layout style={styles.container}>
      <CommonTopNav
        title="Organize a contest"
        onPress={() => navigation.goBack()}
        rightAction={NavRightAction}
      />
      <Divider />
      <ScrollView style={[GlobalStyles.cGutter, styles.scrollContainer]}>
        <KeyboardAvoidingView>
          <Input
            size="medium"
            placeholder="Erangel saturday"
            label="Contest title"
            style={GlobalStyles.mb10}
          />
          <Input
            size="medium"
            placeholder="ex: 50"
            label="Entry fee (₹‎)"
            style={GlobalStyles.mb10}
          />
          <View style={GlobalStyles.flexRowWrap1}>
            {[
              {label: 'Choose platform', items: ['Pubg']},
              {
                label: 'Match type',
                items: ['Tournamate', 'Solo', 'Duo', 'Squad'],
              },
              {
                label: 'Choose map',
                items: ['Erangel', 'All weapons', 'Sanhok'],
              },
              {
                label: 'Choose server',
                items: ['Asia', 'North America', 'Europe'],
              },
            ].map((data) => (
              <Select
                style={[GlobalStyles.mb10, styles.fieldWidth]}
                label={data.label}>
                {data.items.map((item) => (
                  <SelectItem title={item} />
                ))}
              </Select>
            ))}
          </View>
          <View style={GlobalStyles.flexRowWrap1}>
            <Datepicker
              style={[GlobalStyles.mb10, styles.fieldWidth]}
              label="Contest date"
              placeholder="Pick date"
              // date={date}
              // onSelect={nextDate => setDate(nextDate)}
              accessoryRight={CalendarIcon}
            />
            <Datepicker
              style={[GlobalStyles.mb10, styles.fieldWidth]}
              label="Contest date"
              placeholder="Pick date"
              // date={date}
              // onSelect={nextDate => setDate(nextDate)}
              accessoryRight={CalendarIcon}
            />
          </View>
          <Input
            multiline={true}
            textStyle={GlobalStyles.pv10}
            textAlignVertical="top"
            placeholder={'1. Alert your user\n2. Tell the guidlines to them\n'}
            label="Notes"
            numberOfLines={6}
            style={GlobalStyles.mb10}
          />
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrganizeContest);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  fieldWidth: {width: widthPercentageToDP(45)},
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
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
    backgroundColor: '#fff',
    marginRight: 20,
  },
  darkTheme: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#000',
  },
});
