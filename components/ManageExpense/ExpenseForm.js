import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input.js';
import Button from '../UI/Button.js';

// helper function to convert the input date string (DD.MM.YYYY) to JavaScript Date object format (YYYY-MM-DD).
import { convertDateString } from '../../util/date.js';

export default function ExpenseForm({ submitButtonLabel, onSubmit, onCancel }) {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: ''
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    // React passes the value for enteredValue automatically if we connect this function to onChangeText property).
    setInputValues(currentInputValues => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue // [<variable>] syntax allows us to dynamically target and set propery names.
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount, // + converts string to number.
      date: new Date(convertDateString(inputValues.date)),
      description: inputValues.description
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'), // callback that is called when the text input's text changes.
            value: inputValues.amount // two-way binding; the value to show for the text input (TextInput is a controlled component - the native value will be forced to match this value prop if provided).
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'DD.MM.YYYY', // the string that will be rendered before text input has been entered.
            maxLength: 10, // limits the maximum number of characters that can be entered.
            onChangeText: inputChangedHandler.bind(this, 'date'), // callback that is called when the text input's text changes.
            value: inputValues.date // two-way binding.
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true, // if true, the text input can be multiple lines; default is false.
          numberOfLines: 3, // sets the number of lines for a TextInput. Use it with multiline set to true to be able to fill the lines.
          autoCorrect: false, // default is true.
          autoCapitalize: 'none', // none = do not auto-capitalize anything; default = sentences (first letter of each sentence).
          onChangeText: inputChangedHandler.bind(this, 'description'), // callback that is called when the text input's text changes.
          value: inputValues.description // two-way binding.
        }}
      />

      {/* Form submission */}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
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
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
