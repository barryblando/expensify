import React from 'react';
import { shallow } from 'enzyme';
import DrawerToggleButton from '../../components/SideDrawer/DrawerToggleButton';

test('should toggle SideDrawer', () => {
  const click = jest.fn(); // fn spy
  const wrapper = shallow(<DrawerToggleButton click={click} />);
  wrapper.find('button').simulate('click');
  expect(click).toHaveBeenCalled();
});
