import { Outlet } from 'react-router-dom';
import { Language } from '../components/Language';
import { Box, Typography } from '@mui/material';

export function HeaderLayout() {

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" width="100vw">
      <Box width="100%" height="6rem" boxShadow={1} p={2} display="flex" justifyContent="space-between" alignItems="center">
        <img
          src="https://coordinadora.com/wp-content/uploads/2023/03/logo-coordinadora.svg"
          alt="Coordinadora Logo"
          style={{ height: '100%', maxHeight: '4rem' }}
        />
      <Language />
      </Box>
      <Outlet />
    </Box>
  );
};

export default HeaderLayout;