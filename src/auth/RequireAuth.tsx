import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ScreenLoader } from '@/components/loaders';

import { useAuthContext } from './useAuthContext';

const RequireAuth = () => {
  const { auth, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <ScreenLoader />;
  }
  return <Outlet />;
  /*return auth ? <Outlet /> : <Navigate to="/auth/classic/login" state={{ from: location }} replace />;*/
};

export { RequireAuth };
