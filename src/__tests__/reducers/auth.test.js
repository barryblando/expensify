import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc132',
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT',
  };
  const state = authReducer({ uid: '123abc' }, action);
  expect(state).toEqual({});
});

test('should set for default values', () => {
  const action = {};
  const state = authReducer({ uid: '123abc' }, action);
  expect(state).toEqual({ uid: '123abc' });
});
