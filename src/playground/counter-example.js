let count = 0;

const addOne = () => {
  // Add count then re-render
  count++;
  renderCounterApp();
};

const minusOne = () => {
  // Minus count then re-render
  count--;
  renderCounterApp();
};

const reset = () => {
  // Reset count then re-render
  count = 0;
  renderCounterApp();
}

const renderCounterApp = () => {
  // JSX - Javascript XML
  // These two re generate the entire app and render to DOM, inefficient
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );

  ReactDOM.render(templateTwo, appRoot);

};

renderCounterApp(); // Init