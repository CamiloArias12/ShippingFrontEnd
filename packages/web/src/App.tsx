import {RouterProvider} from 'react-router-dom';
import { appRouter } from './routes/Router';
import './translations/i18n.ts'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
}
