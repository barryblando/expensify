import database from '../firebase/firebase';
import { ADD_INCOME, EDIT_INCOME, REMOVE_INCOME, SET_INCOMES } from '../constants';

// ------------------------------------------
// ASYNC ACTIONS FOR INCOME ARRAY REDUCER
// ------------------------------------------

// -- ADD_INCOME --
export const addIncome = income => ({
  type: ADD_INCOME,
  income,
});

// By using redux thunk, you can be able to create asynchronous actions
export const startAddIncome = (incomeData = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid; // eslint-disable-line
  const { description = '', note = '', amount = 0, createdAt = 0 } = incomeData;
  const income = { description, note, amount, createdAt };

  return database
    .ref(`users/${uid}/incomes`)
    .push(income)
    .then(ref => {
      dispatch(
        addIncome({
          id: ref.key,
          ...income,
        })
      );
    });
};

// -- REMOVE_EXPENSE 'no default id required' --
export const removeIncome = ({ id } = {}) => ({
  type: REMOVE_INCOME,
  id,
});

export const startRemoveIncome = ({ id } = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid; // eslint-disable-line
  return database
    .ref(`users/${uid}/incomes/${id}`)
    .remove()
    .then(() => dispatch(removeIncome({ id })))
    .catch(e => console.log(e));
};

// -- EDIT_EXPENSE --
export const editIncome = (id, updates) => ({
  type: EDIT_INCOME,
  id,
  updates,
});

export const startEditIncome = (id, updates) => (dispatch, getState) => {
  // get the current id logged in
  const uid = getState().auth.uid; // eslint-disable-line
  return database
    .ref(`users/${uid}/incomes/${id}`)
    .update(updates)
    .then(() => dispatch(editIncome(id, updates)));
};

// -- SET_EXPENSES --
export const setIncomes = incomes => ({
  type: SET_INCOMES,
  incomes,
});

export const startSetIncomes = () => (dispatch, getState) => {
  const uid = getState().auth.uid; // eslint-disable-line
  return database
    .ref(`users/${uid}/incomes`)
    .once('value')
    .then(snapshot => {
      const rawData = snapshot.val() || {};
      const incomes = Object.keys(rawData).reduce((prev, current) => {
        prev.push({ ...rawData[current], id: current });
        return prev;
      }, []);

      dispatch(setIncomes(incomes));
    })
    .catch(e => console.log(e));
};
