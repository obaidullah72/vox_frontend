import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronDown, Home, RefreshCw } from 'lucide-react';

function ErrorFallbackUI({ error, errorInfo, onReset, showDetails, onToggleDetails }) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-blue-100 animate-pulse opacity-50"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <AlertCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We're sorry, but something unexpected happened. Our team has been notified and we're working to fix it.
          </p>

          <div className="flex items-center justify-center mt-8 mb-6">
            <img 
              src="/fixing2.png" 
              alt="Team fixing the issue" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-blue-100"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={onToggleDetails}
            className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:text-gray-900 mb-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Error Details
            </span>
            <ChevronDown
              className={`h-5 w-5 transform transition-transform duration-200 ${
                showDetails ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
              {error && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Error Message:
                  </h3>
                  <pre className="text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto max-h-40 border border-red-200">
                    {error.toString()}
                  </pre>
                </div>
              )}

              {error && error.stack && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Stack Trace:
                  </h3>
                  <pre className="text-xs text-gray-700 bg-white p-3 rounded overflow-auto max-h-60 border border-gray-200">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onReset}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>
            <Link
              to="/"
              onClick={() => {
                onReset();
              }}
              className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-center inline-flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    });
  }

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallbackUI
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
          showDetails={this.state.showDetails}
          onToggleDetails={this.toggleDetails}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

