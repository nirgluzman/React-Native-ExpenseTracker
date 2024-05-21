// Context is a mechanism in React that allows you to share data across components in your application tree
// without having to explicitly pass props through multiple levels.

import { createContext, useReducer } from 'react';

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

// create a new context object.
export const ExpensesContext = createContext({
  expenses: [], // initial state of the context.

  // methods (placeholder) to update the state of the context.
  addExpense: ({ description, amout, date }) => {},
  deleteExpense: id => {},
  updateExpense: (id, { description, amout, date }) => {}
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ id, ...action.payload }, ...state];
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
}

// Provider component to implement the state management logic.
// This component will be used to wrap the entire application and provide the context to all of its children.
// This component will also provide the initial state of the context and the methods to update the state of the logic.
function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
