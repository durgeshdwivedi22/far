import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { storage } from '../utils/storage';

const PublicRoute = ({ children }) => {
  const user = storage.getUser();
  const location = useLocation();

  // Redirect authenticated users away from auth pages
  if (user && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
