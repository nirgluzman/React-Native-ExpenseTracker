import { StyleSheet, Text, View } from 'react-native';

import Input from './Input.js';

export default function ExpenseForm() {
  function amountChangedHandler() {}

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangedHandler // callback that is called when the text input's text changes.
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'DD.MM.YYYY', // the string that will be rendered before text input has been entered.
            maxLength: 10 // limits the maximum number of characters that can be entered.
            // onChangeText: dateChangedHandler
          }}
        />
      </View>

      <Input
        label='Description'
        textInputConfig={{
          multiline: true, // if true, the text input can be multiple lines; default is false.
          numberOfLines: 3, // sets the number of lines for a TextInput. Use it with multiline set to true to be able to fill the lines.
          autoCorrect: false, // default is true.
          autoCapitalize: 'none' // none = do not auto-capitalize anything; default = sentences (first letter of each sentence).
          // onChangeText: descriptionChangedHandler
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },

  inputsRow: {
    flexDirection: 'row', // control the direction in which the children of a node are laid out.
    justifyContent: 'space-between' // push the elements away from each other and add some distance between them.
  },

  rowInput: {
    flex: 1 // take up as much space as possible
  }
});
