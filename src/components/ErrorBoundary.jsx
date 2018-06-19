import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    this.setState({
      hasError: error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="content-container">
          <div className="error-boundary">
            <h2>Oh No! Something went wrong.</h2>
            {this.state.hasError && this.state.hasError.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </div>
        </div>
      );
    }
    // else, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
