import { useEffect, useState } from 'react';

    export default function NotificationCenter() {
      const [notifications, setNotifications] = useState([]);

      useEffect(() => {
        const ws = new WebSocket('ws://localhost:5000/ws');
        
        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
          setNotifications(prev => [message, ...prev]);
        };

        return () => ws.close();
      }, []);

      return (
        <div className="fixed bottom-4 right-4 w-96">
          {notifications.map((n, i) => (
            <div key={i} className="mb-2 p-4 bg-white rounded-lg shadow">
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(n.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      );
    }
