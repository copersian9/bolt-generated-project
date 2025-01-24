import { useLocation } from 'react-router-dom';

    export default function ErrorPage() {
      const location = useLocation();
      const error = location.state?.error || 'An unexpected error occurred';

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">Oops!</h1>
            <p className="text-gray-700 mb-6">{error}</p>
            <a
              href="/"
              className="btn-primary"
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }
