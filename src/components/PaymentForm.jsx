import { useState } from 'react';

    export default function PaymentForm({ quoteId, amount, onSuccess }) {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
          const response = await fetch('/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              quoteId,
              amount,
              cardNumber: '4242424242424242', // Mock card number
              expDate: '12/30', // Mock expiration
              cvc: '123' // Mock CVC
            })
          });

          if (!response.ok) throw new Error('Payment failed');
          onSuccess();
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              value="4242424242424242"
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiration
              </label>
              <input
                type="text"
                value="12/30"
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <input
                type="text"
                value="123"
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay $${amount}`}
          </button>
        </form>
      );
    }
