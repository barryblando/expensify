import React from 'react';

// Components
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  // When doing class properties it should in proper order
  state = {
    options: [],
    selectedOption: undefined, // handle modal open close fetch state
    selectedOpt: undefined // after closing modal selected work should be highlighted
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined}));
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option,
      selectedOpt: option
    }))
  };

  handleDeleteOption = (optionToRemove, selectedOptToRemove) => {
    // if optionToRemove equal to selectedOptToRemove then remove highlighted
    if (optionToRemove === selectedOptToRemove) {
      // implicitly return object state
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => optionToRemove !== option),
        selectedOpt: undefined
      }));
    }

    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };

  handleDeleteOptions = () => {
    // implicitly return object state ({})
    this.setState(() => ({
      options: [],
      selectedOpt: undefined // set to undefined also, to be sure
    }));
  };

  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid option to add';
    } else if (this.state.options.indexOf(option) > -1) { // if found match in array, P.S -1 is not found in indexOf.
      return 'This option already exists';
    }

    // push to the array using concat
    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  };

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
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('ComponentDidUpdate', prevState);
    // if prevState has different length than current one then save current data
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
    // console.log('Data Saved!');
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer.';
    return (
      // Set Components & their props / properties chaining to sub components,
      <div>
        <Header subtitle={ subtitle }/>
        <div className="container">
          <Action
            hasOptions={ this.state.options.length > 0 }
            handlePick={ this.handlePick }
          />
          <div className="widget">
            <Options
              options={ this.state.options }
              handleDeleteOptions={ this.handleDeleteOptions }
              handleDeleteOption={ this.handleDeleteOption }
              selectedOption={ this.state.selectedOpt }
            />
            <AddOption
              handleAddOption={ this.handleAddOption }
            />
          </div>
        </div>
        <OptionModal
          selectedOption={ this.state.selectedOption }
          handleClearSelectedOption={ this.handleClearSelectedOption }
        />
      </div>
    );
  }
}

export default IndecisionApp;