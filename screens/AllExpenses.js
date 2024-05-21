import { useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context.js';
import ExpensesOutput from '../components/Expenses/ExpensesOutput.js';

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total' />;
}
