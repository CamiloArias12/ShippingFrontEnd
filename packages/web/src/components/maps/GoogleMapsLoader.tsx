import { LoadScript } from '@react-google-maps/api';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Get the API key from environment variable
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

// Always include the places library
const libraries = ['places'];

interface GoogleMapsLoaderProps {
  children: React.ReactNode;
}

export function GoogleMapsLoader({ children }: GoogleMapsLoaderProps) {
  const { t } = useTranslation();
  
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">
          {t('maps.apiKeyMissing', 'Google Maps API key is missing!')}
        </Typography>
      </Box>
    );
  }
  
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={libraries as any}
      loadingElement={
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      }
      
    >
      {children}
    </LoadScript>
  );
}