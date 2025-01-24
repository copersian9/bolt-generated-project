import { useState } from 'react';

    export default function InsuranceForm({ onSubmit }) {
      const [formData, setFormData] = useState({
        type: 'auto',
        details: {
          vehicleType: '',
          driverAge: '',
          drivingHistory: 'excellent'
        }
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form data
        if (!formData.details.vehicleType || !formData.details.driverAge) {
          alert('Please fill in all required fields');
          return;
        }

        try {
          await onSubmit(formData);
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Failed to get quote. Please try again.');
        }
      };

      return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Insurance Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option value="auto">Auto</option>
                <option value="home">Home</option>
                <option value="life">Life</option>
              </select>
            </div>

            {formData.type === 'auto' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle Type
                  </label>
                  <input
                    type="text"
                    value={formData.details.vehicleType}
                    onChange={(e) => setFormData({
                      ...formData,
                      details: { ...formData.details, vehicleType: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Driver Age
                  </label>
                  <input
                    type="number"
                    value={formData.details.driverAge}
                    onChange={(e) => setFormData({
                      ...formData,
                      details: { ...formData.details, driverAge: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    min="18"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Driving History
                  </label>
                  <select
                    value={formData.details.drivingHistory}
                    onChange={(e) => setFormData({
                      ...formData,
                      details: { ...formData.details, drivingHistory: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Get Quote
            </button>
          </div>
        </form>
      );
    }
