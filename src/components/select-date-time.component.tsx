import React, {useState} from 'react';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native';

interface PropsDefault extends DateTimePickerProps {
  children: React.ReactNode;
  onChangeOfDateTime: (date: Date) => void;
  value: Date;
}

type Props = Omit<PropsDefault, 'onCancel' | 'onConfirm'>;

const SelectDateTime = ({children, mode, onChangeOfDateTime, value}: Props) => {
  const [datePickerMode, setDatePickerMode] = useState(mode);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const handleDateTimePicker = () => {
    console.log('clicked');
    setDatePickerMode(mode);
    setIsDateOpen(true);
  };

  const handleOnConfirm = (date: Date) => {
    setIsDateOpen(false);
    onChangeOfDateTime(date);
  };

  const handleOnCancel = () => {
    setIsDateOpen(false);
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDateOpen}
        testID="dateTimePicker"
        date={value}
        mode={datePickerMode}
        is24Hour={false}
        display="default"
        onCancel={handleOnCancel}
        onConfirm={handleOnConfirm}
      />
      <TouchableOpacity activeOpacity={0.5} onPress={handleDateTimePicker}>
        {children}
      </TouchableOpacity>
    </>
  );
};

export default SelectDateTime;
