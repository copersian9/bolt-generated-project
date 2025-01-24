import { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import QuoteHistory from '../components/QuoteHistory';

    export default function Profile() {
      const [user, setUser] = useState(null);
      const [quotes, setQuotes] = useState([]);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchData = async () => {
          try {
            const [userRes, quotesRes] = await Promise.all([
              fetch('/api/user', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              }),
              fetch('/api/user/quotes', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              })
            ]);

            if (!userRes.ok || !quotesRes.ok) {
              throw new Error('Failed to fetch data');
            }

            const [userData, quotesData] = await Promise.all([
              userRes.json(),
              quotesRes.json()
            ]);

            setUser(userData);
            setQuotes(quotesData);
          } catch (error) {
            console.error('Error:', error);
            navigate('/login');
          }
        };

        fetchData();
      }, [navigate]);

      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
            
            {user && (
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <p>Email: {user.email}</p>
                <p>Member since: {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Quote History</h2>
              <QuoteHistory quotes={quotes} />
            </div>
          </div>
        </div>
      );
    }
