import { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import AdminStats from '../components/AdminStats';
    import UserList from '../components/UserList';

    export default function Admin() {
      const [stats, setStats] = useState(null);
      const [users, setUsers] = useState([]);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchData = async () => {
          try {
            const [statsRes, usersRes] = await Promise.all([
              fetch('/api/admin/stats', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              }),
              fetch('/api/admin/users', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              })
            ]);

            if (!statsRes.ok || !usersRes.ok) {
              throw new Error('Failed to fetch data');
            }

            const [statsData, usersData] = await Promise.all([
              statsRes.json(),
              usersRes.json()
            ]);

            setStats(statsData);
            setUsers(usersData);
          } catch (error) {
            console.error('Error:', error);
            navigate('/login');
          }
        };

        fetchData();
      }, [navigate]);

      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            
            {stats && <AdminStats stats={stats} />}
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">User Management</h2>
              <UserList users={users} />
            </div>
          </div>
        </div>
      );
    }
