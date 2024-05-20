import { View } from 'react-native';

import ExpensesSummary from './ExpensesSummary.js';
import ExpensesList from './ExpensesList.js';

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
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}
