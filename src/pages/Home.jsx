import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import InsuranceForm from '../components/InsuranceForm';

    export default function Home() {
      const [quote, setQuote] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const navigate = useNavigate();

      const handleGetQuote = async (formData) => {
        setLoading(true);
        setError(null);

        try {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login');
            return;
          }

          const response = await fetch('/api/quotes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          });

          if (!response.ok) {
            throw new Error('Failed to get quote');
          }

          const data = await response.json();
          setQuote(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Compare & Save on Insurance
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Get personalized quotes in minutes. Save up to 40% on your insurance.
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Insurance Form Section */}
          <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get Your Free Quote
              </h2>
              <InsuranceForm onSubmit={handleGetQuote} />
              
              {loading && <div className="mt-4 text-center">Calculating your quote...</div>}
              
              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {quote && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Your Quote</h2>
                  <div className="space-y-2">
                    <p><strong>Monthly Premium:</strong> ${quote.monthly}</p>
                    <p><strong>Annual Premium:</strong> ${quote.annual}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
