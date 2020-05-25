import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';

import {KeyboardAvoidingView} from '../../../components/kb-avoiding-view.component';
import {CaptionIcon, EmailLineIcon} from '../../../components/icons.component';
import {RouterConstants} from '../../../constants/router.constants';

const ForgotPassword = ({navigation}: any): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();

  const styles = useStyleSheet(themedStyles);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          Hello
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Enter your email to reset password
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Email"
          value={email}
          caption="Enter a valid email"
          onChangeText={setEmail}
          captionIcon={CaptionIcon}
          accessoryRight={EmailLineIcon}
        />
      </Layout>
      <Button style={styles.signInButton} size="large">
        Submit
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
});

export default ForgotPassword;
