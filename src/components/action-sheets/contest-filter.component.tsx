import React, {createRef, RefObject} from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

const ContestFilter = ({actionSheetRef}: {actionSheetRef: any}) => {
  return (
    <ActionSheet ref={actionSheetRef}>
      <View>
        <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
      </View>
    </ActionSheet>
  );
};

export default ContestFilter;
