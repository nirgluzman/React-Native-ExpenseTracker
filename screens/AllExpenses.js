import { useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context.js';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

export default function AllExpenses() {
  // hook that allows the component to access the values stored in React context.
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod='Total'
      fallbackText='No expenses registered yet'
    />
  );
}
