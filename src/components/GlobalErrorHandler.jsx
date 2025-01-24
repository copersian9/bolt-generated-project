import { useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';

    export default function GlobalErrorHandler() {
      const navigate = useNavigate();

      useEffect(() => {
        const handleError = (event) => {
          console.error('Unhandled error:', event.error);
          navigate('/error', { state: { error: event.error.message } });
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
      }, [navigate]);

      return null;
    }
