import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  Layout,
  Input,
  Divider,
  Select,
  SelectItem,
  Datepicker,
  Button,
  Text,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';
import addFns from 'date-fns/add';

import {AuthSchema} from '../../models/user.models';
import {CommonTopNav} from '../../components/top-navigations/common-top.component';
import {GlobalStyles} from '../../constants/global-styles';
import {KeyboardAvoidingView} from '../../components/kb-avoiding-view.component';
import {
  CalendarIcon,
  ClockIcon,
  PriceTagLineIcon,
} from '../../components/icons.component';
import {widthPercentageToDP} from '../../shared/methods/normalize';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import Contests from '../../services/contest.service';
import SelectDateTime from '../../components/select-date-time.component';

interface Props extends HomeDrawerNavProps<'Dashboard'> {
  authData: AuthSchema;
}
interface ContestValues {
  contestTitle: string;
  entryFee: number;
  platform: string;
  matchType: string;
  map: string;
  server: string;
  contestDate: Date | undefined;
  contestTime: Date | undefined;
  notes: string;
}
const ContestSchema = Yup.object().shape({
  contestTitle: Yup.string()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .required('* required'),
  entryFee: Yup.number().moreThan(0).required('* required'),
  platform: Yup.string().required('* required'),
  matchType: Yup.string().required('* required'),
  map: Yup.string().required('* required'),
  server: Yup.string().required('* required'),
  contestDate: Yup.date().required('* required'),
  contestTime: Yup.date().required('* required'),
  notes: Yup.string().min(10, 'Too short!').required('* required'),
});

const OrganizeContest = ({navigation, authData}: Props) => {
  const isScreenFocused = useIsFocused();

  React.useEffect(() => {
    if (isScreenFocused && !authData.userName) {
      Toast.showWithGravity(
        'Please update the username to create contest',
        Toast.LONG,
        Toast.CENTER,
      );

      navigation.navigate('EditProfile');
    }
  }, [authData, navigation, isScreenFocused]);

  const initialValues: ContestValues = {
    contestTitle: '',
    entryFee: 10,
    platform: '',
    matchType: '',
    map: '',
    server: '',
    contestDate: undefined,
    contestTime: undefined,
    notes: '',
  };

  return (
    <Layout style={styles.container}>
      <CommonTopNav
        title="Organize a contest"
        onPress={() => navigation.goBack()}
      />
      <Divider />
      <ScrollView style={[GlobalStyles.cGutter, styles.scrollContainer]}>
        <KeyboardAvoidingView>
          <Formik
            initialValues={initialValues}
            validationSchema={ContestSchema}
            onSubmit={async (values) => {
              const payload = {
                ...values,
                notes: JSON.stringify(values.notes),
                organizerInformation: {
                  userId: authData.userId,
                  userName: authData.userName,
                  photo: authData.photo,
                  fullName: authData.fullName,
                  email: authData.email,
                },
                contestDate: values.contestTime,
                isContestFinished: false,
              };
              const result = await Contests.createContests(payload);
              if (result.success) {
                Toast.show(
                  'Your contest is created! Start to add participants',
                );
                navigation.goBack();
              }
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              setFieldValue,
              setFieldError,
            }: any) => (
              <>
                <View style={GlobalStyles.flexRowWrap1}>
                  <Input
                    size="medium"
                    placeholder="Erangel saturday"
                    label="Contest title"
                    value={values.contestTitle}
                    caption={errors.contestTitle}
                    status={errors.contestTitle ? 'danger' : ''}
                    onChangeText={handleChange('contestTitle')}
                    style={[GlobalStyles.mb10, styles.fieldWidth]}
                  />
                  <Input
                    size="medium"
                    placeholder="ex: 50"
                    keyboardType={'phone-pad'}
                    accessoryRight={PriceTagLineIcon}
                    value={String(values.entryFee)}
                    caption={errors.entryFee}
                    status={errors.entryFee ? 'danger' : ''}
                    // onChangeText={handleChange('entryFee')}
                    onChangeText={(text) =>
                      setFieldValue(
                        'entryFee',
                        Number(text.replace(/[^0-9]/g, '')),
                      )
                    }
                    label="Entry fee (₹‎)"
                    style={[GlobalStyles.mb10, styles.fieldWidth]}
                  />
                </View>
                <View style={GlobalStyles.flexRowWrap1}>
                  {[
                    {
                      label: 'Choose platform',
                      name: 'platform',
                      items: ['Pubg'],
                    },
                    {
                      label: 'Match type',
                      name: 'matchType',
                      items: ['Tournamate', 'Solo', 'Duo', 'Squad'],
                    },
                    {
                      label: 'Choose map',
                      name: 'map',
                      items: ['Erangel', 'All weapons', 'Sanhok'],
                    },
                    {
                      label: 'Choose server',
                      name: 'server',
                      items: ['Asia', 'North America', 'Europe'],
                    },
                  ].map((data) => (
                    <Select
                      key={data.name}
                      style={[GlobalStyles.mb10, styles.fieldWidth]}
                      onSelect={({row}) =>
                        setFieldValue(data.name, data.items[row])
                      }
                      value={values[data.name]}
                      caption={errors[data.name]}
                      status={errors[data.name] ? 'danger' : ''}
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
                    min={addFns(new Date(), {days: 1})}
                    label="Contest date"
                    placeholder="Pick date"
                    date={values.contestDate}
                    caption={errors.contestDate}
                    status={errors.contestDate ? 'danger' : ''}
                    onSelect={(date) => setFieldValue('contestDate', date)}
                    accessoryRight={CalendarIcon}
                  />
                  <SelectDateTime
                    onChangeOfDateTime={(value) => {
                      if (values.contestDate) {
                        setFieldValue('contestTime', value);
                      } else {
                        setFieldError(
                          'contestTime',
                          'Choose contest date first',
                        );
                      }
                    }}
                    mode="time"
                    value={
                      values.contestTime
                        ? new Date(values.contestTime)
                        : values.contestDate
                        ? new Date(values.contestDate)
                        : new Date()
                    }>
                    <Input
                      size="medium"
                      placeholder="Pick Time"
                      style={[GlobalStyles.mb10, styles.fieldWidth]}
                      disabled
                      value={
                        values.contestTime
                          ? new Date(values.contestTime).toLocaleTimeString(
                              'en-us',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )
                          : 'Choose time'
                      }
                      caption={errors.contestTime}
                      status={true ? 'danger' : ''}
                      label="Contest time"
                      accessoryRight={ClockIcon}
                    />
                  </SelectDateTime>
                </View>
                <Input
                  multiline={true}
                  textStyle={GlobalStyles.pv10}
                  textAlignVertical="top"
                  placeholder={
                    '1. Alert your user\n2. Tell the guidlines to them\n'
                  }
                  label="Notes"
                  numberOfLines={6}
                  style={GlobalStyles.mb10}
                  caption={errors.notes}
                  onChangeText={handleChange('notes')}
                  status={errors.notes ? 'danger' : ''}
                />
                <View style={GlobalStyles.mb30} />
                <Text
                  style={[GlobalStyles.tAlignCenter, GlobalStyles.mb10]}
                  status="danger"
                  category="c1">
                  You cannot change anything after submit. Double check
                  everything.
                </Text>
                <Button size="giant" onPress={handleSubmit}>
                  Let's start
                </Button>
              </>
            )}
          </Formik>
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
