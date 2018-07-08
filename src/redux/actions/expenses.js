import { push } from 'connected-react-router';
import database from '../../firebase/firebase';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES } from '../constants';

// --------------------------------------------------
// ASYNC ACTION CREATORS FOR EXPENSE ARRAY REDUCER
// --------------------------------------------------

// REDUX RULE INFO: Eliminate timing dependency bugs (No race between Async Request & View Render)

// -- ADD_EXPENSE --
export const addExpense = expense => ({
  type: ADD_EXPENSE,
  expense,
});

// In redux-thunk, we can now be able to create asynchronous action by using (HOF)
// whenever this thunk function gets triggered it's going to return a function and
// can access now to dispatch & getState and to dispatch normal(addExpense) action
export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid; // eslint-disable-line
  const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
  const expense = { description, note, amount, createdAt };
  // push to firebase database
  // return promise(database) for next .then success case ie. in test suite
  // otherwise test suite will show TypeError: Cannot read property 'then' of undefined
  return database
    .ref(`users/${uid}/expenses`)
    .push(expense)
    .then(ref => {
      // access ref to get the last key 'expenses/id' id = last part of the Reference's path & generated by firebase
      // dispatch addExpense to redux store for state updates and re-render views
      // don't forget that dispatch returns addExpense action object (this is for test suite)
      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      );
      dispatch(push('/expense-dashboard'));
    });
};

// -- REMOVE_EXPENSE 'no default id required' --
export const removeExpense = ({ id } = {}) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const startRemoveExpense = ({ id } = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid; // eslint-disable-line
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .remove()
    .then(() => {
      dispatch(removeExpense({ id }));
      dispatch(push('/expense-dashboard'));
    })
    .catch(e => console.log(e));
};

// -- EDIT_EXPENSE --
export const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates,
});

export const startEditExpense = (id, updates) => (dispatch, getState) => {
  // get the current id logged in
  const uid = getState().auth.uid; // eslint-disable-line
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .update(updates)
    .then(() => {
      dispatch(editExpense(id, updates));
      // go back to dashboard
      dispatch(push('/expense-dashboard'));
    });
};

// -- SET_EXPENSES --
export const setExpenses = expenses => ({
  type: SET_EXPENSES,
  expenses,
});

export const startSetExpenses = () => (dispatch, getState) => {
  // fetch all expense data once from firebase
  const uid = getState().auth.uid; // eslint-disable-line
  return database
    .ref(`users/${uid}/expenses`)
    .once('value')
    .then(snapshot => {
      // Parse the data into an array
      // const expenses = [];
      // </reference https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#forEach
      // enumerating, creating & pushing new object into expenses array
      // snapshot.forEach(childSnapshot => {
      //   expenses.push({
      //     id: childSnapshot.key, // store the generated id by firebase to new id
      //     ...childSnapshot.val(), // spread out remaining value
      //   });
      // });
      const rawData = snapshot.val() || {};
      // console.log('RawData: ', rawData);
      // </reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
      const expenses = Object.keys(rawData).reduce((prev, current) => {
        prev.push({ ...rawData[current], id: current });
        // console.log('Previous: ', prev, 'Current: ', current);
        return prev;
      }, []);

      // Dispatch data to store for state updates and re-render views
      dispatch(setExpenses(expenses));
    })
    .catch(e => console.log(e)); // eslint-disable-line
};