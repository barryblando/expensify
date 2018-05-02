class Counter extends React.Component {
  // to fix binding this keyword
  constructor(props) {
    super(props); // important to access this.props
    // to fix context bound to itself when calling methods callback
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    // Step 1: Set default state
    // Step 2: Component rendered with default state values
    // Step 3: Change state based on event
    // Step 4: Component re-rendered using new state values
    // Step 5: Start again at Step 3
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    const stringCount = localStorage.getItem('count');
    const count = parseInt(stringCount, 10);

    if (!isNaN(count)) { // if it isn't NaN
      // set count to current localStorage data
      this.setState(() => ({ count }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    // if prevState has different length than current one then save data
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
      console.log('Data Saved!');
    }
  }

  handleAddOne(e) {
    // auto render state using built-in setState
    // state is changing just the specific value it doesn't override other declared values in the object
    // prevState is a first argument for setState function & it is a previous state before changes have been applied
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }

  handleMinusOne(e) {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });
  }

  handleReset(e) {
    this.setState(() => { return { count: 0 } });
  }

  render() {
    return (
      <div>
        <h1>Count: { this.state.count }</h1>
        <button onClick={ this.handleAddOne }>+1</button>
        <button onClick={ this.handleMinusOne }>-1</button>
        <button onClick={ this.handleReset }>Reset</button>
      </div>
    );
  }
}

// Counter.defaultProps = {
//   count: 0
// };

ReactDOM.render(<Counter />, document.getElementById('app'));