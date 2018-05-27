/*
  - Mock fixes if you have data changes dynamically every time test runs and want to make it constant
  - when in test file this mock is gonna be used and when in real app, actual module will be called & used
  - so this will make test & snapshot match
 */
const moment = require.requireActual('moment'); // fix stacktrace error by using requireActual
// return an instance of moment at specific point of time when test runs if no point was provided
export default (timeStamp = 0) => moment(timeStamp);
