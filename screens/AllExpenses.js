import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay'; // loading spinner custom component
import ErrorOverlay from '../components/UI/ErrorOverlay'; // error message custom component

// React context
import { ExpensesContext } from '../store/expenses-context.js';

// helper functions to handle HTTP requests to Firebase Realtime database.
import { fetchExpenses } from '../util/http.js';

export default function AllExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  // hook that allows the component to access the values stored in React context.
  const expensesCtx = useContext(ExpensesContext);

  // fetch all expenses from database; will only run after the initial render.
  useEffect(
    () => {
      async function getExpenses() {
        setIsFetching(true); // enable loading spinner.
        setError(null); // reset error message.
        try {
          const expenses = await fetchExpenses(); // await only defers execution of code that actually depends on the result, i.e. anything after the await expression.
          expensesCtx.setExpenses(expenses); // update the state of the context with expenses fetched from the database.
        } catch (error) {
          console.log(error);
          setError('Could not fetch expenses!'); // set error message.
        }
        setIsFetching(false); // disable loading spinner.
      }

      getExpenses();
    },
    [] // to run once on initial render.
  );

  // display an error message if an error occurred while fetching expenses.
  function errorHandler() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

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
