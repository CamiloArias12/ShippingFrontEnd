import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type ProtectedRouteProps = {
  children?: React.ReactNode;
  allowedRoles?: string[];
};

/**
 * A component that protects routes by checking authentication and user roles
 * @param children The component to render if the user is authorized
 * @param allowedRoles Optional array of roles allowed to access this route
 */
const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if the user has the required role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      // User doesn't have the required role, redirect to unauthorized page
      return <Navigate to="/no-found" replace />;
    }
  }

  // User is authenticated and has the required role, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;