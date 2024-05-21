import { StyleSheet, View } from 'react-native';

import Input from './Input.js';

export default function ExpenseForm() {
  function amountChangedHandler() {}

  return (
    <View>
      <Input
        label='Amount'
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler
        }}
      />
      <Input
        label='Date'
        textInputConfig={{
          placeHolder: 'DD/MM/YYYY',
          maxLength: 10
          // onChangeText: dateChangedHandler
        }}
      />
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          numberOfLines: 3,
          autoCorrect: false, // default is true
          autoCapitalize: 'none' // don't auto capitalize anything
          // onChangeText: descriptionChangedHandler
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
