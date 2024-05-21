import { StyleSheet, Text, View } from 'react-native';

import ExpensesSummary from './ExpensesSummary.js';
import ExpensesList from './ExpensesList.js';

// global styles for the project
import { GlobalStyles } from '../../constants/styles.js';

export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  // set a message if there are no expenses.
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  // check if there are expenses.
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes up all available space when there are no sibling elements.
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },

  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});
