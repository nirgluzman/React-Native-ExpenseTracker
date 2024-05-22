// helper functions to handle HTTP requests to Firebase Realtime database.

import axios from 'axios';

// Axios returns a PROMISE that eventually gives you an access to the data (i.e. it doesn't complete immediatly).
// The response is either fulfilled or rejected, depending on the response from the backend service.

// Firebase Realtime Database
const BACKEND_URL = 'https://react-native-expensetrac-ee298-default-rtdb.firebaseio.com/';

// store an expense in the database.
export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + 'expenses.json', expenseData);
  const id = response.data.name; // extract the auto generated 'id' by Firebase.

  return id;
}

// fetch all expenses from the database.
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + 'expenses.json');

  // transform the response from Firebase into an array of objects.
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date), // Firebase stores the date in a string format, we would like to convert it back to Date object
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

// update an expense in the database.
export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
}

// delete an expense from the database.
export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `expenses/${id}.json`);
}
