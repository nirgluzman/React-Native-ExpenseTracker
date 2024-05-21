import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// global styles for the project
import { GlobalStyles } from '../constants/styles.js';

import { ExpensesContext } from '../store/expenses-context.js';
import Button from '../components/UI/Button.js';
import IconButton from '../components/UI/IconButton.js';

export default function ManageExpense({ route, navigation }) {
  // hook that allows the component to access the values stored in React context.
  const expensesCtx = useContext(ExpensesContext);

  // exctract the expenseId from the route params; the value is 'undefinded' (no value is passed) when we clicked 'add expense'.
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // set the title of the screen dynamically
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack(); // method to let us go back to the previous screen in the navigator.
  }

  function cancelHandler() {
    navigation.goBack(); // method to let us go back to the previous screen in the navigator.
  }

  function confirmHandler() {
    isEditing
      ? // update expense
        expensesCtx.updateExpense(editedExpenseId, {
          description: 'Test!!!!',
          amount: 10.99,
          date: new Date()
        })
      : // add expense
        expensesCtx.addExpense({
          description: 'Test',
          amount: 19.99,
          date: new Date()
        });

    navigation.goBack(); // method to let us go back to the previous screen in the navigator.
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes up all available space when there are no sibling elements.
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
