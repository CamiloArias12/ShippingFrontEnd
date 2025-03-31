import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      p={3}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="error">
          {t('notFound.title', 'Page Not Found')}
        </Typography>
        
        <Typography variant="body1">
          {t('notFound.message', 'The page you are looking for does not exist.')}
        </Typography>
        
        <Box mt={3}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
          >
            {t('common.goToHome', 'Go to Home')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}