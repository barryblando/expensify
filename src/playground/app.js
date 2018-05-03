class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    // Manually bind the 'this' to the current instance for event handlers
    // Event handlers have problem maintaining 'this' binding
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this); // bind to the current instance
    this.handlePick = this.handlePick.bind(this); // bind to the current instance
    this.handleAddOption = this.handleAddOption.bind(this); // bind to the current instance
    this.handleDeleteOption = this.handleDeleteOption.bind(this); // bind to the current instance
    this.state = {
      options: []
    }
  }
  // LIFE CYCLE Built-in METHODS - can be access only in class based Components, slow than stateless functions
  //  -componentDidMount - fires up in load, i.e fetching & loading data
  //  -componentDidUpdate - Updates when there's change in state, i.e saving data
  //  -componentWillUnmount - fires up when the component goes away, specifically when in multiple pages
  // </reference https://reactjs.org/d ocs/state-and-lifecycle.html
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        // set options to current localStorage data
        this.setState(() => ({ options }));
      }
    } catch (error) {
      // Do nothing at all
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    // if prevState has different length than current one then save data
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log('Data Saved!');
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleDeleteOption(optionToRemove) {
    // implicitly return object state
    this.setState((prevState) => ({
      // check if they are not equal set to stay in array otherwise remove
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handleDeleteOptions() {
    // implicitly return object state ({})
    this.setState(() => ({ options: [] }));
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid option to add';
    } else if (this.state.options.indexOf(option) > -1) { // if found match in array, P.S -1 is not found in indexOf.
      return 'This option already exists';
    }

    // push to the array using concat
    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer.';
    return (
      // Set Components & their props / properties chaining to sub components,
      <div>
        <Header subtitle={ subtitle }/>
        <Action
          hasOptions={ this.state.options.length > 0 }
          handlePick={ this.handlePick }
        />
        <Options
          options={ this.state.options }
          handleDeleteOptions={ this.handleDeleteOptions }
          handleDeleteOption={ this.handleDeleteOption }
        />
        <AddOption
          handleAddOption={ this.handleAddOption }
        />
      </div>
    );
  }
}

// Set Default prop values for reusable components & fallback values
// If no prop is pass in then default prop will be use
// IndecisionApp.defaultProps = {
//   options: []
// };

// STATELESS FUNCTIONAL COMPONENTS - Use this method if your Component is simple
// const User = (props) => { // to access props via functional based component, class based component uses 'this' to access props
//   return (
//     <div>
//       <p>Name: { props.name} </p>
//       <p>Age: { props.age} </p>
//     </div>
//   );
// };

const Header = (props) => {
  return (
    <div>
      <h1>{ props.title }</h1>
      { props.subtitle && <h2>{ props.subtitle }</h2> }
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

const Action = (props) => {
  return (
    <button
      onClick={ props.handlePick }
      disabled={ !props.hasOptions }
    >
      What should I do?
    </button>
  );
};

const Options = (props) => {
  // Key should be specified inside the array.
  return (
    <div>
      <button onClick={ props.handleDeleteOptions }>Remove All</button>
      { props.options.length === 0 && <p>Please add an option to get started!</p>}
      {
        props.options.map(option => (
          <Option
            key={ option }
            optionText={ option }
            handleDeleteOption={ props.handleDeleteOption }
          />
        ))
      }
    </div>
  );
};

const Option = (props) => {
  // Pass optionText to IndecisionApp handleDeleteOption
  return (
    <div>
      { props.optionText }
      <button
        onClick={ (e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props); // Set props in constructor & super so it can be access by methods
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined // set to undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault(); // prevent form default submission process
    const option = e.target.elements.option.value.trim(); // input name option & value, and trim white spaces
    // return this.props.options.includes(option) ? alert('EXIST!') : alert('!EXIST!');
    const error = this.props.handleAddOption(option);
    // using shorthand set object state if something happen in handleAddOption from Indecision
    this.setState(() => ({ error })); // error: error
    if (!error) {
      e.target.elements.option.value = ''
    }
  }

  render() {
    return (
      <div>
        { this.state.error && <p>{ this.state.error }</p> }
        <form onSubmit={ this.handleAddOption }>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

// render IndecisionApp & its Components & sub Components to REACT DOM
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={[]}/>, document.getElementById('app'));