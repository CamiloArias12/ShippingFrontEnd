import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import { initializeAuth } from './store/authThunks';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './translations/i18n.ts';
import { AuthProvider } from './contexts/AuthContext';
import { disconnectSocket, initializeSocket } from './api/socket';
import AppRoutes from './routes/Routes';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await dispatch(initializeAuth());        
        initializeSocket();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    };
    initAuth();
    return () => {
      disconnectSocket();
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

