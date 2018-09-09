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
    const { errorInfo, hasError } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <div className="content-container">
          <div className="error-boundary">
            <h2>Oh No! Something went wrong.</h2>
            {hasError && hasError.toString()}
            <br />
            {errorInfo.componentStack}
          </div>
        </div>
      );
    }
    // else, just render children
    return children;
  }
}

export default ErrorBoundary;
