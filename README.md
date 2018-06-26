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
- [When to use Component or PureComponent](https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81)
- [React — Composing Higher-Order Components (HOCs)](https://medium.com/dailyjs/react-composing-higher-order-components-hocs-3a5288e78f55)
- [React + Redux Architecture](https://github.com/hirviid/react-redux-architecture)
- [React Internals - How React Works (Used React 15, a bit outdated but good grasp is what you need)](http://www.mattgreer.org/articles/react-internals-part-one-basic-rendering/)
- [Structuring projects and naming components in React](https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76)
- [Using Destructure and Spread in React Components](https://www.carlrippon.com/writing-concise-react-components-with-destructure-assignment-and-spread/)
- [Tips on Creating Reusable Components](https://dev.to/ganderzz/tips-on-creating-reusable-components-376j)
- [Atomic Design With React and Bit: Simplify a Complex UI](https://blog.bitsrc.io/simplify-complex-ui-by-implementing-the-atomic-design-in-react-with-bit-f4ad116ec8db)

## Redux References

- [What Does Redux Do? (and when should you use it?)](https://daveceddia.com/what-does-redux-do/)
- [How Redux Works: A Counter-Example](https://daveceddia.com/how-does-redux-work/)
- [My take on Redux Architecture](http://krasimirtsonev.com/blog/article/my-take-on-redux-architecture)
- [Async Operations in React Redux Applications](https://www.sitepoint.com/async-operations-react-redux-applications/)
- [Understanding compose functions in redux](https://stackoverflow.com/questions/41357897/understanding-compose-functions-in-redux)
- [Understanding how redux-thunk works](https://medium.com/@gethylgeorge/understanding-how-redux-thunk-works-72de3bdebc50)
- [Building CRUD App with React + Redux](http://www.thegreatcodeadventure.com/building-a-simple-crud-app-with-react-redux-part-1/#table-of-contents)
- [React + Redux Architecture : Separation of Concerns](https://medium.com/prod-io/react-redux-architecture-part-1-separation-of-concerns-812da3b08b46)
- [10 Tips for Better Redux Architecture](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44)
- [Using Redux DevTools in Production](https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f)

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
- [Hooking up React](https://lawrencewhiteside.com/writing/article/webpack-beyond-the-basics/hooking-up-react/)

## Babel Stage 2 & 3 Plugin [will update after stage 4]

- [transform-object-rest-spread (Stage 3)](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
- [transform-class-properties (Stage 2)](https://babeljs.io/docs/plugins/transform-class-properties/)

## Third Party Component Used

- [MomentJS](http://momentjs.com/)
- [NumeralJS](http://numeraljs.com/)
- [ChartJS](http://www.chartjs.org)
- [React ChartJS 2](https://github.com/jerairrest/react-chartjs-2)
- [React-Dates](https://github.com/airbnb/react-dates)

## Production Build Guides & Using GZIP

- [Webpack Production Build Tips](https://medium.com/netscape/webpack-3-react-production-build-tips-d20507dba99a)
- [Webpack 4 Code Splitting using SplitChunksPlugin](https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)
- [Two Quick Ways to reduce react app size in Production](https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a)
- [StackOverflow - GZIP](https://stackoverflow.com/questions/44739374/serve-gzip-html-page-in-node)
- [StackOverflow - Express + GZIP](https://stackoverflow.com/questions/6370478/express-gzip-static-content)
- [Optimize React Build for Production with Webpack](https://michalzalecki.com/optimize-react-build-for-production-with-webpack/)
- [Webpack 4 Mode and Optimization](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)

## ESLint, Prettier, Stylelint Code Quality

- [Prettier + ESLint + Facebook Code Quality Tutorial](https://medium.com/@eliotjunior/prettier-eslint-facebook-code-quality-the-auto-magical-react-styling-tutorial-19481acb10dd)
- [My VSCode Setup Prettier + ESLint + StyleLint for React](https://gist.github.com/barryblando/d6753c07324fac302c5a01d39bee4397)
- [Linting SCSS with Stylelint](https://medium.com/@bjankord/how-to-lint-scss-with-stylelint-dc87809a9878)
- [Stylelint SASS Guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines)
- [Stylelint Config rules](https://stylelint.io/user-guide/example-config/)

## Misc, Question & Solutions

- [react/prefer-stateless-function](https://stackoverflow.com/questions/43378911/eslint-component-should-be-written-as-a-pure-function-react-prefer-stateless)
- [6 ways to declare Javascript functions](https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/) - For Clean Code
- [Pros-Cons of Using Redux-Saga with ES6 Generators vs Redux-Thunk with ES2017 Async/Await](https://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es2017-asy/34933395#34933395)
- [A quick explanation of Redux Observable.](https://dev.to/papaponmx/a-quick-explanation-to-redux-observable--16b5)
- [Async actions in Redux with RxJS and Redux Observable](https://dev.to/andrejnaumovski/async-actions-in-redux-with-rxjs-and-redux-observable-efg)
- [State appears as empty object in "react" dev tools](https://stackoverflow.com/questions/43948798/state-appears-as-empty-object-in-redux-dev-tools)
- [What's the difference between “super()” and “super(props)” in React when using es6 classes?](https://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e?rq=1)
- [Web App Routing with fallback](https://glebbahmutov.com/blog/routing-with-fallback/)
