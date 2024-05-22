import { useContext, useEffect } from 'react';

import { ExpensesContext } from '../store/expenses-context.js';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

// helper function to fetch expenses from database.
import { fetchExpenses } from '../util/http.js';

export default function AllExpenses() {
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

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod='Total'
      fallbackText='No expenses registered yet'
    />
  );
}
