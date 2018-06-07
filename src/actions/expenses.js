// import uuid from 'uuid';
import database from '../firebase/firebase';

// ------------------------------------------
// ACTIONS FOR EXPENSE ARRAY REDUCER
// ------------------------------------------

// -- ADD_EXPENSE --
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

// By using redux thunk, you can be able to create asynchronous actions
// this is gonna get called by redux & can access dispatch and to dispatch addExpense
export const startAddExpense = (expenseData = {}) => dispatch => {
  const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
  const expense = { description, note, amount, createdAt };
  // push to firebase database
  // return promise for next .then success case ie. in test suite
  // otherwise test suite will show TypeError: Cannot read property 'then' of undefined
  return database
    .ref('expenses')
    .push(expense)
    .then(ref => {
      // access ref to get the last key 'expenses/id' id = last key
      // dispatch addExpense to redux store for changes
      // don't forget that dispatch returns object
      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      );
    });
};

// -- REMOVE_EXPENSE 'no default id required' --
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const startRemoveExpense = ({ id } = {}) => dispatch =>
  database
    .ref(`expenses/${id}`)
    .remove()
    .then(() => dispatch(removeExpense({ id })))
    .catch(e => console.log(e));

// -- EDIT_EXPENSE --
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// -- SET_EXPENSES --
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const startSetExpenses = () => dispatch =>
  // fetch all expense data once from firebase
  // return promise for next .then success case ie. in test suite
  // otherwise test suite will show TypeError: Cannot read property 'then' of undefined
  database
    .ref('expenses')
    .once('value')
    .then(snapshot => {
      // Parse the data into an array
      const expenses = [];
      // </reference https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#forEach
      // enumerating, creating & pushing new object into expenses array
      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key, // store the generated id by firebase to new id
          ...childSnapshot.val(), // spread out remaining value
        });
      });
      // Dispatch data to store for changes
      dispatch(setExpenses(expenses));
    })
    .catch(e => console.log(e));
