export default function AdminStats({ stats }) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Quotes</h3>
            <p className="text-3xl font-bold">{stats.totalQuotes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Active Today</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      );
    }
