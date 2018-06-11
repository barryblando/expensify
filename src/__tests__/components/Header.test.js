import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn(); // fn spy
  const wrapper = shallow(<Header startLogout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});

// -------- ENZYME SHALLOW WRAPPER ---------
// expect(wrapper.find('h1').length).toBe(1); // expected 1 on how many h1 does Header have
// expect(wrapper.find('h1').text()).toBe('Expensify'); // expected text to be Expensify

// -------------- OLD METHOD ---------------
// const renderer = new ReactShallowRenderer();
// renderer.render(<Header />);
// expect(renderer.getRenderOutput()).toMatchSnapshot();
// console.log(renderer.getRenderOutput());
