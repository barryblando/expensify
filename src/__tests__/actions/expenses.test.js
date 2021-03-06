import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
} from '../../redux/actions/expenses';
import { expenses } from '../fixtures/expenses';
import database from '../../firebase/firebase';

describe('EXPENSES ACTION TEST', () => {
  // configure mock store with middleware redux thunk
  // designed to test the action-related logic, not the reducer-related one. In other words, it does not update Redux store.
  const createMockStore = configureMockStore([thunk]);

  // fake uid for test
  const uid = 'foo-user-id';

  // default state auth uid
  const defaultAuthState = { auth: { uid } };

  // populate database
  // make sure beforeEach doesn't allow to run test cases
  // until firebase has actually synced up the data
  beforeEach(done => {
    const expensesData = expenses.reduce((prev, current) => {
      prev[current.id] = { ...current }; // { description, note, amount, createdAt }
      delete prev[current.id].id;
      return prev;
    }, {});
    database
      .ref(`users/${uid}/expenses`)
      .set(expensesData)
      .then(() => done()); // when done, proceed to test cases
  });

  test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[2],
    });
  });

  // use done to force jest to wait on asynchronous functions
  test('should add expense to database and store', done => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000,
    };
    // Promise chaining. attach .then 'cause this function returns a promise
    store
      .dispatch(startAddExpense(expenseData))
      .then(() => {
        // get the actions used by startAddExpense
        const actions = store.getActions();
        // expect addExpense action to be equal to the ff. action objects
        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseData,
          },
        });
        expect(actions[1]).toEqual({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/expense-dashboard'],
            method: 'push',
          },
        });
        // check if data was stored in database by getting the data using id generated by firebase
        // return promise for the next .then success case
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });

  test('should add expense with defaults to database and store', done => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0,
    };
    // Promise chaining. attach .then 'cause this function returns a promise
    store
      .dispatch(startAddExpense({}))
      .then(() => {
        // get the actions used by startAddExpense
        const actions = store.getActions();
        // expect addExpense action to be equal to the ff. action objects
        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseData,
          },
        });
        expect(actions[1]).toEqual({
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/expense-dashboard'],
            method: 'push',
          },
        });
        // check if data was stored in database by getting the data using id generated by firebase
        // return promise for the next .then success case
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });

  test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
  });

  test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc',
      updates: { note: 'New note value' },
    });
  });

  test('should setup edit expense to database and store', done => {
    const store = createMockStore(defaultAuthState);
    const [id] = expenses[0].id;
    const updates = { amount: 21045 };
    store
      .dispatch(startEditExpense(id, updates))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'EDIT_EXPENSE',
          id,
          updates,
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
      });
  });

  test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    // {} === {} = false, [] === [] = false, use toEqual
    expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc',
    });
  });

  test('should remove expenses from firebase', done => {
    const store = createMockStore(defaultAuthState);
    const [id] = expenses[2].id;
    store
      .dispatch(startRemoveExpense({ id }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'REMOVE_EXPENSE',
          id,
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
      })
      .then(snapshot => {
        // snapshot to make sure data was deleted
        expect(snapshot.val()).toBeFalsy(); // val returns null so it is considered & expected to be false
        done();
      });
  });

  test('should fetch the expenses from firebase', done => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses,
      });
      done();
    });
  });
});
