import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    // Save the location user was trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};