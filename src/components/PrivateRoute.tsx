import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../lib/api';

interface PrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [auth, setAuth] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    api.get('/user')
      .then(() => setAuth('authenticated'))
      .catch(() => setAuth('unauthenticated'));
  }, []);

  if (auth === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return auth === 'authenticated' ? children : <Navigate to="/login" replace />;
};
