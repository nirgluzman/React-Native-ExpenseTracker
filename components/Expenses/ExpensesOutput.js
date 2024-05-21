import { StyleSheet, View } from 'react-native';

import ExpensesSummary from './ExpensesSummary.js';
import ExpensesList from './ExpensesList.js';

// global styles for the project
import { GlobalStyles } from '../../constants/styles.js';

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
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
  }
});
