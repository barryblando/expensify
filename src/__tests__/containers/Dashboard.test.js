import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import MainDashboardPage from '../../containers/DashboardPage';

const mockStore = configureMockStore();
const store = mockStore({});

test('should render Main Dashboard correctly', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <MainDashboardPage expenses={{}} income={{}} />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
