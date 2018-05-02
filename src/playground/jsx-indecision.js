console.log('app.js is running!');

const app = {
  title: 'Indecision',
  subtitle: 'Put your life in the hands of a Computer',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    // push new option to app.options
    app.options.push(option);
    e.target.elements.option.value = ''
    // Re render form
    renderForm();
  }
}

const onRemoveAll = () => {
  app.options = [];
  renderForm();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const appRoot = document.getElementById('app');

const renderForm = () => {
  const template = (
    <div>
      <h1>Indecision App</h1>
      { app.subtitle && <p>{ app.subtitle }</p> }
      { app.options.length > 0 ? 'Here are your options' : 'No Options' }
      <button disabled={ app.options.length === 0 } onClick={ onMakeDecision }>What should I do?</button>
      <button onClick={ onRemoveAll }>Remove All</button>
      <ol>
        { app.options.map((option) => <li key={ option }>{ option }</li>) }
      </ol>
      <form onSubmit={ onFormSubmit }>
        <input type="text" name="option"/>
        <button>Add</button>
      </form>
    </div>
  );

  // render app
  ReactDOM.render(template, appRoot);
}

renderForm(); // Init