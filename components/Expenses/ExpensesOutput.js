import { StyleSheet, View } from 'react-native';

import ExpensesSummary from './ExpensesSummary.js';
import ExpensesList from './ExpensesList.js';

// global styles for the project
import { GlobalStyles } from '../../constants/styles.js';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19')
  },
  {
    id: 'e2',
    description: 'pair of trousers',
    amount: 89.99,
    date: new Date('2022-01-05')
  },
  {
    id: 'e3',
    description: 'Bananas',
    amount: 5.99,
    date: new Date('2023-02-01')
  },
  {
    id: 'e4',
    description: 'Book',
    amount: 15.99,
    date: new Date('2022-06-08')
  },
  {
    id: 'e5',
    description: 'Book',
    amount: 18.99,
    date: new Date('2024-09-01')
  }
];

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes up all available space when there are no sibling elements.
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }
});
