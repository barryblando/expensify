import React from 'react';
import { shallow } from 'enzyme';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

test('should call startLogout on button click', () => {
  const logoutClickHandler = jest.fn(); // fn spy
  const wrapper = shallow(<SideDrawer logoutClickHandler={logoutClickHandler} />);
  wrapper.find('button').simulate('click');
  expect(logoutClickHandler).toHaveBeenCalled();
});
