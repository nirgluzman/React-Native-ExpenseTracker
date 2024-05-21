import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// global styles for the project
import { GlobalStyles } from '../constants/styles.js';

import { ExpensesContext } from '../store/expenses-context.js';

import ExpenseForm from '../components/ManageExpense/ExpenseForm.js';
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

  function confirmHandler(expenseData) {
    isEditing
      ? // update expense
        expensesCtx.updateExpense(editedExpenseId, expenseData)
      : // add expense
        expensesCtx.addExpense(expenseData);

    navigation.goBack(); // method to let us go back to the previous screen in the navigator.
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />

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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
