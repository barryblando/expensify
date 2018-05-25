import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

// -------- ENZYME SHALLOW WRAPPER ---------
// expect(wrapper.find('h1').length).toBe(1); // expected 1 on how many h1 does Header have
// expect(wrapper.find('h1').text()).toBe('Expensify'); // expected text to be Expensify

// -------------- OLD METHOD ---------------
// const renderer = new ReactShallowRenderer();
// renderer.render(<Header />);
// expect(renderer.getRenderOutput()).toMatchSnapshot();
// console.log(renderer.getRenderOutput());
