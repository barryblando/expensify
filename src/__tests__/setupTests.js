import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-dates/initialize';
import DotEnv from 'dotenv';

Enzyme.configure({
  adapter: new Adapter(),
});

console.log(`Using file '.env.${process.env.NODE_ENV}' for env variable`);

DotEnv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
