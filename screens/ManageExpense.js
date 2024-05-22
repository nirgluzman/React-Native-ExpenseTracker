import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm.js';
import IconButton from '../components/UI/IconButton.js';
import LoadingOverlay from '../components/UI/LoadingOverlay'; // loading spinner custom component

import { ExpensesContext } from '../store/expenses-context.js';

// global styles for the project
import { GlobalStyles } from '../constants/styles.js';

// helper functions to handle HTTP requests to Firebase Realtime database.
import { deleteExpense, storeExpense, updateExpense } from '../util/http.js';

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // hook that allows the component to access the values stored in React context.
  const expensesCtx = useContext(ExpensesContext);

  // exctract the expenseId from the route params; the value is 'undefinded' (no value is passed) when we clicked 'add expense'.
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // fetch the expense data from the context (so Fetch current expense details from context to initialize the ExpenseForm).
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

  // set the title of the screen dynamically
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);

    setIsSubmitting(true);
    await deleteExpense(editedExpenseId); // delete the expense from Firebase Realtime database.

    // setIsSubmitting(false); // not required as we navigate to a different screen immediatly anyway.

    navigation.goBack(); // method to let us go back to the previous screen in the navigator.
  }

  function cancelHandler() {
    navigation.goBack(); // method to let us go back to the previous screen in the navigator.
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    if (isEditing) {
      // update expense
      expensesCtx.updateExpense(editedExpenseId, expenseData); // update the expense in the context.
      await updateExpense(editedExpenseId, expenseData); // update the expense in Firebase Realtime database.
    } else {
      // add expense
      const id = await storeExpense(expenseData); // store the expenseData in Firebase Realtime database and receive the 'id' generated by Firebase.
      expensesCtx.addExpense({ id, ...expenseData }); // add the expense to the context.
    }

    // setIsSubmitting(false); // not required as we navigate to a different screen immediatly anyway.

    navigation.goBack(); // method to let us go back to the previous screen in the navigator.
  }

  // display a loading spinner while modifying Firebase Realtime database (delete, add, update).
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
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
