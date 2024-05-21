import { View } from 'react-native';

import Input from './Input.js';

export default function ExpenseForm() {
  function amountChangedHandler() {}

  return (
    <View>
      <Input
        label='Amount'
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler // callback that is called when the text input's text changes.
        }}
      />
      <Input
        label='Date'
        textInputConfig={{
          placeHolder: 'DD.MM.YYYY', // the string that will be rendered before text input has been entered.
          maxLength: 10 // limits the maximum number of characters that can be entered.
          // onChangeText: dateChangedHandler
        }}
      />
      <Input
        label='Description'
        textInputConfig={{
          multiline: true, // if true, the text input can be multiple lines; default is false.
          numberOfLines: 3, // sets the number of lines for a TextInput. Use it with multiline set to true to be able to fill the lines.
          autoCorrect: false, // default is true.
          autoCapitalize: 'none' // none = don't auto capitalize anything; default = sentences (first letter of each sentence).
          // onChangeText: descriptionChangedHandler
        }}
      />
    </View>
  );
}
