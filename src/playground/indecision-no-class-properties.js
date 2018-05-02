import React from 'react';

// Components
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    // Manually bind the 'this' to the current instance for event handlers
    // Event handlers have problem maintaining 'this' binding
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    }
  }
  // LIFE CYCLE Built-in METHODS - can be access only in class based Components, slower than stateless functions
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
    }
    // console.log('Data Saved!');
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

export default IndecisionApp;