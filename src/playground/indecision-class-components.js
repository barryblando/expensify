class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this); // bind to the current instance
    this.handlePick = this.handlePick.bind(this); // bind to the current instance
    this.handleAddOption = this.handleAddOption.bind(this); // bind to the current instance
    this.state = {
      options: []
    }
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      }
    });
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid option to add';
    } else if (this.state.options.indexOf(option) > -1) { // if found match in array, P.S -1 is not found in indexOf.
      return 'This option already exists';
    }

    this.setState((prevState) => {
      return {
        // push to the array using concat
        options: prevState.options.concat(option)
      };
    });
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer.';
    return (
      // Set Components & their props / properties
      <div>
        <Header title={ title } subtitle={ subtitle }/>
        <Action
          hasOptions={ this.state.options.length > 0 }
          handlePick={ this.handlePick }
        />
        <Options
          options={ this.state.options }
          handleDeleteOptions={ this.handleDeleteOptions }
        />
        <AddOption
          handleAddOption={ this.handleAddOption }
        />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    // to access props key value pair
    console.log(this.props);
    return (
      <div>
        <h1>{ this.props.title }</h1>
        <h2>{ this.props.subtitle }</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <button
        onClick={ this.props.handlePick }
        disabled={ !this.props.hasOptions }
      >
        What should I do?
      </button>
    );
  }
}

class Options extends React.Component {
  render() {
    // Key should be specified inside the array.
    return (
      <div>
        <button onClick={ this.props.handleDeleteOptions }>Remove All</button>
        { this.props.options.map(option => <Option key={ option } optionText={ option }/>) }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>{ this.props.optionText }</li>
        </ul>
      </div>
    );
  }
}

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

    this.setState(() => {
      return { error }; // set state if something happen in error
    });

    e.target.elements.option.value = ''
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

// render IndecisionApp & its Components to REACT DOM
// ReactDOM.render(<User name="Barry" age={26}/>, document.getElementById('app'));
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));