import { useLayoutEffect } from 'react';
import { Text } from 'react-native';

export default function ManageExpense({ route, navigation }) {
  // exctract the expenseId from the route params; the value is 'undefinded' (no value is passed) when we clicked 'add expense'.
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // set the title of the screen dynamically
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  return <Text>ManageExpense</Text>;
}
