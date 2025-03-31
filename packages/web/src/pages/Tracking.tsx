import { useState } from 'react';
import { Box, Typography, TextField, Paper, CircularProgress, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { serviceFindShipmentById } from '../api/shipment';
import { Shipment } from '@shipping/shared/shipment';
import { ShipmentTracking } from '../components/ShipmentTracking';
import { StatusHistory } from '../components/StatusHistory'; // Import the new component

export function Tracking() {
  const { t } = useTranslation();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<any>({
    defaultValues: {
      trackingId: ''
    }
  });

  const handleShipmentUpdate = (data: Shipment) => {
    setShipment(data);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setShipment(null);
    setSearched(true);

    try {
      const result = await serviceFindShipmentById(data.trackingId);
      if (result) {
        setShipment(result);
      } else {
        setError(t('tracking.notFound', 'No shipment found with this tracking ID'));
      }
    } catch (err) {
      console.error('Error fetching shipment:', err);
      setError(t('tracking.error', 'An error occurred while searching for the shipment'));
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (error && searched) {
      return (
        <Box mt={4} sx={{ maxWidth: 600, mx: 'auto' }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      );
    }

    if (shipment) {
      return (
        <Box mt={4} display={"flex"} flexDirection={'row'} sx={{ maxWidth: 1000, mx: 'auto' }}>
          <ShipmentTracking 
            shipment={shipment} 
            setShipment={handleShipmentUpdate} 
          />
          {shipment.shipment_status_history && shipment.shipment_status_history.length > 0 && (
            <StatusHistory history={shipment.shipment_status_history} />
          )}
        </Box>
      );
    }

    return null;
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {t('tracking.title', 'Track Your Shipment')}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t('tracking.description', 'Enter your tracking ID to see the status and location of your shipment.')}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="trackingId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('tracking.idLabel', 'Tracking ID')}
                placeholder={t('tracking.idPlaceholder', 'Enter your tracking number')}
                error={!!errors.trackingId}
                variant="outlined"
                margin="normal"
                autoFocus
              />
            )}
          />
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              label={loading ? t('tracking.searching', 'Searching...') : t('tracking.search', 'Track Shipment')}
            />
          </Box>
        </Box>
      </Paper>

      {renderResults()}
    </Box>
  );
}

export default Tracking;