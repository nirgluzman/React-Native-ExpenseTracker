import { useEffect, useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context.js';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

// helper functions
import { getDateMinusDays } from '../util/date.js';
import { fetchExpenses } from '../util/http.js';

export default function RecentExpenses() {
  // hook that allows the component to access the values stored in React context.
  const expensesCtx = useContext(ExpensesContext);

  // fetch all expenses from database; will only run after the initial render.
  useEffect(
    () => {
      async function getExpenses() {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses); // update the state of the context with expenses fetched from the database.
      }

      getExpenses();
    },
    [] // to run once on initial render.
  );

  // extract the expenses that were created in the last 7 days.
  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    // check if the expense was created in the last 7 days (exclude future expenses from recent expense filter).
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallbackText='No expenses registered for the last 7 days'
    />
  );
}
