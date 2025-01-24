import { Component } from 'react';

    class ErrorBoundary extends Component {
      state = { hasError: false, error: null };

      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }

      componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
      }

      render() {
        if (this.state.hasError) {
          return (
            <div className="p-8 bg-red-50 text-red-700 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
              <p className="mb-4">{this.state.error?.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Reload Page
              </button>
            </div>
          );
        }

        return this.props.children;
      }
    }

    export default ErrorBoundary;
