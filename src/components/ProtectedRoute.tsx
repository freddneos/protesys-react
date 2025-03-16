import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
  const { user, isLoading, authError } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication (with a maximum duration)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // If there was an auth error, redirect to login
  if (authError) {
    console.error('Authentication error:', authError);
    return <Navigate to="/login" state={{ from: location, error: authError.message }} replace />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    // Save the location user was trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};