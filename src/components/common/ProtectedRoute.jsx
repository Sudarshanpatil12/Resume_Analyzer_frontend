import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader text="Checking session..." />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}

export default ProtectedRoute;
