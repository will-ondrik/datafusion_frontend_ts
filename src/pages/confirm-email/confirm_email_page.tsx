import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ConfirmEmailPage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (!token || !userId) {
      setError('Invalid confirmation link');
      setIsLoading(false);
      return;
    }

    // need to move this to api service
    const confirmEmail = async () => {
      try {
        const response = await fetch(`http://localhost:8888/auth/confirm-email?token=${token}&userId=${userId}`, {
          method: 'GET',
        });

        if (response.ok) {
          const result = await response.json();
          setMessage('Email confirmed successfully. Redirecting to login...');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          throw new Error('Email confirmation failed. Please try again.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [navigate, searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default ConfirmEmailPage;
