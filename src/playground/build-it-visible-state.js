class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false
    };
  }

  handleToggleVisibility(e) {
    this.setState((previousState) => { return { visibility: !previousState.visibility }});
  }

  render() {
    return (
      <div>
        <h1>VisibilityToggle</h1>
        <button onClick={ this.handleToggleVisibility }>
          { this.state.visibility ? 'Hide Details' : 'Show Details' }
        </button>
        { this.state.visibility && (
          <div>
            <p>Hey. These are some details you can now see!</p>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));