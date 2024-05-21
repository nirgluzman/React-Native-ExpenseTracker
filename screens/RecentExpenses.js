import { useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context.js';
import ExpensesOutput from '../components/Expenses/ExpensesOutput.js';

// helper function
import { getDateMinusDays } from '../util/date.js';

export default function RecentExpenses() {
  // hook that allows the component to access the values stored in React context.
  const expensesCtx = useContext(ExpensesContext);

  // extract the expenses that were created in the last 7 days.
  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo;
  });

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days' />;
}
