import { isAuthenticated } from '../../util/auth';

import { Outlet, Navigate } from 'react-router-dom';
import Home from './../../pages/Home';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = () => {
  const { user } = useAuth();


  return user? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;