import { createContext, useContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';

// Consider making the user type more specific
interface User {
  id: string;
  role: string;
  name: string;
  // other user properties
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  checkAccess: (allowedRoles?: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user: reduxUser, loading = false } = useSelector((state: RootState) => state.auth);

  const user: User | null = reduxUser
    ? { id: reduxUser.id.toString(), role: reduxUser.role, name: reduxUser.name }
    : null;
  
  const checkAccess = (allowedRoles?: string[]) => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return !!user?.role && allowedRoles.includes(user.role);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function RequireAuth({ 
  children, 
  allowedRoles,
  redirectTo = "/no-found"
}: { 
  children: ReactNode, 
  allowedRoles?: string[],
  redirectTo?: string 
}) {
  const { isAuthenticated, checkAccess, loading } = useAuth();
  const location = useLocation();

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !checkAccess(allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}