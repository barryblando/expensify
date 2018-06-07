# EXPENSIFY

## Development Features

- B.E.M

- Mobile-First Approach

- SASS incl. 3-1 CSS Architecture

- ESLint & Stylelint

- Test Suite

## React References

- [Pure React](https://daveceddia.com/pure-react/)
- [Full-Stack React - The Complete Guide to ReactJS and Friends](https://www.fullstackreact.com/)
- [Alligator.io - React](https://alligator.io/react/)
- [Testing React-Redux App using Jest and Enzyme](https://medium.com/netscape/testing-a-react-redux-app-using-jest-and-enzyme-b349324803a9)
- [React Composition Patterns](https://hackernoon.com/react-composition-patterns-from-the-ground-up-8401aaad93d7)
- [React, Inline Functions, and Performance](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578)
- [React Router DOM v4 Tutorial](https://www.techiediaries.com/react-router-dom-v4/)
- [Stateful vs Stateless Functional Components in React](https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541)

## Redux References

- [What Does Redux Do? (and when should you use it?)](https://daveceddia.com/what-does-redux-do/)
- [How Redux Works: A Counter-Example](https://daveceddia.com/how-does-redux-work/)
- [Async Operations in React Redux Applications](https://www.sitepoint.com/async-operations-react-redux-applications/)
- [Understanding compose functions in redux](https://stackoverflow.com/questions/41357897/understanding-compose-functions-in-redux)
- [Understanding how redux-thunk works](https://medium.com/@gethylgeorge/understanding-how-redux-thunk-works-72de3bdebc50)
- [Building CRUD App with React + Redux](http://www.thegreatcodeadventure.com/building-a-simple-crud-app-with-react-redux-part-1/#table-of-contents)

## Test Suite

- [Jest](https://facebook.github.io/jest/)
- [Enzyme for rendering/asserting React Components](https://github.com/airbnb/enzyme)

```json
  "snapshotSerializers": ["enzyme-to-json/serializer"] // fix enzyme snapshot overloaded with infos
```

```json
  /* Add this to jest config to avoid some issues in testing environment */
  "setupFiles": [
    "raf/polyfill",
  ],
```

## Webpack Dev Server & React-Hot-Loader

- [React Hot Reloader Github](https://github.com/gaearon/react-hot-loader)
- [React Hot Reloader Get Started](http://gaearon.github.io/react-hot-loader/getstarted/)
- [Issues 2016 - RHL](https://github.com/gaearon/react-hot-loader/issues/243)

## Babel Stage 2 & 3 Plugin [will update after stage 4]

- [transform-object-rest-spread (Stage 3)](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
- [transform-class-properties (Stage 2)](https://babeljs.io/docs/plugins/transform-class-properties/)

## Third Party Component Used

- [MomentJS](http://momentjs.com/)
- [React-Dates](https://github.com/airbnb/react-dates)

## Production Build Guides & Using GZIP

- [Webpack Production Build Tips](https://medium.com/netscape/webpack-3-react-production-build-tips-d20507dba99a)
- [Two Quick Ways to reduce react app size in Production](https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a)
- [StackOverflow - GZIP](https://stackoverflow.com/questions/44739374/serve-gzip-html-page-in-node)
- [StackOverflow - Express + GZIP](https://stackoverflow.com/questions/6370478/express-gzip-static-content)

## ESLint, Prettier, Stylelint Code Quality

- [Prettier + ESLint + Facebook Code Quality Tutorial](https://medium.com/@eliotjunior/prettier-eslint-facebook-code-quality-the-auto-magical-react-styling-tutorial-19481acb10dd)
- [My VSCode Setup Prettier + ESLint + StyleLint for React](https://gist.github.com/barryblando/d6753c07324fac302c5a01d39bee4397)
- [Linting SCSS with Stylelint](https://medium.com/@bjankord/how-to-lint-scss-with-stylelint-dc87809a9878)
- [Stylelint SASS Guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines)
- [Stylelint Config rules](https://stylelint.io/user-guide/example-config/)

## Misc & Solutions

- [react/prefer-stateless-function](https://stackoverflow.com/questions/43378911/eslint-component-should-be-written-as-a-pure-function-react-prefer-stateless)
