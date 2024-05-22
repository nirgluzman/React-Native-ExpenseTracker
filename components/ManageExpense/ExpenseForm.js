import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Input from './Input.js';
import Button from '../UI/Button.js';

// global styles for the project
import { GlobalStyles } from '../../constants/styles.js';

// helper function to convert the date format
import { convertDateString } from '../../util/date.js';

export default function ExpenseForm({ submitButtonLabel, onSubmit, onCancel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? defaultValues.date.toLocaleDateString('en-GB') : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    }
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    // React passes the value for enteredValue automatically if we connect this function to onChangeText property).
    setInputs(currentInputs => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true } // [<variable>] syntax allows us to dynamically target and set propery names.
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, // + converts string to number.
      date: new Date(convertDateString(inputs.date.value)),
      description: inputs.description.value
    };

    // validation to user input
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Show an error to the user
      // Alert.alert('Invalid input', 'Please check your input values');

      // set the respective inputs to invalid and then use this info in the JSX to notify the user about the error.
      setInputs(currentInputs => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: { value: currentInputs.description.value, isValid: descriptionIsValid }
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  // flag to check if the form is invalid.
  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'), // callback that is called when the text input's text changes.
            value: inputs.amount.value // two-way binding; the value to show for the text input (TextInput is a controlled component - the native value will be forced to match this value prop if provided).
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'DD/MM/YYYY', // the string that will be rendered before text input has been entered.
            maxLength: 10, // limits the maximum number of characters that can be entered.
            onChangeText: inputChangedHandler.bind(this, 'date'), // callback that is called when the text input's text changes.
            value: inputs.date.value // two-way binding.
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true, // if true, the text input can be multiple lines; default is false.
          numberOfLines: 3, // sets the number of lines for a TextInput. Use it with multiline set to true to be able to fill the lines.
          autoCorrect: false, // default is true.
          autoCapitalize: 'none', // none = do not auto-capitalize anything; default = sentences (first letter of each sentence).
          onChangeText: inputChangedHandler.bind(this, 'description'), // callback that is called when the text input's text changes.
          value: inputs.description.value // two-way binding.
        }}
      />

      {/* Error message in case the form is invalid */}
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>
      )}

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

  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
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
