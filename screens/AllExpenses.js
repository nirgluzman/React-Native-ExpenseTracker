import { useContext, useEffect, useState } from 'react';

import { ExpensesContext } from '../store/expenses-context.js';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay'; // loading spinner custom component

// helper functions to handle HTTP requests to Firebase Realtime database.
import { fetchExpenses } from '../util/http.js';

export default function AllExpenses() {
  const [isFetching, setIsFetching] = useState(true);

  // hook that allows the component to access the values stored in React context.
  const expensesCtx = useContext(ExpensesContext);

  // fetch all expenses from database; will only run after the initial render.
  useEffect(
    () => {
      async function getExpenses() {
        setIsFetching(true);
        const expenses = await fetchExpenses(); // await only defers execution of code that actually depends on the result, i.e. anything after the await expression.
        setIsFetching(false);
        expensesCtx.setExpenses(expenses); // update the state of the context with expenses fetched from the database.
      }

      getExpenses();
    },
    [] // to run once on initial render.
  );

  // display a loading spinner while expenses are being fetched from Firebase.
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod='Total'
      fallbackText='No expenses registered yet'
    />
  );
}
