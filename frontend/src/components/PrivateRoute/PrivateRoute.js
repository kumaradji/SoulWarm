// frontend/src/components/PrivateRoute/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ element, requiredGroup }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  if (requiredGroup && (!user.groups || !user.groups.includes(requiredGroup))) {
    return <Navigate to="/auth" />;
  }

  return element;
};

export default PrivateRoute;