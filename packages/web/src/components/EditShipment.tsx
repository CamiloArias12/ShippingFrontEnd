import { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, CircularProgress } from '@mui/material';
import { Route } from '@shipping/shared/index';
import { serviceFindDrivers } from '../api/driver';
import { serviceFindRoutes } from '../api/route';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AssignShipmentDto, AssignShipmentReq, Shipment } from '@shipping/shared/shipment';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface Driver {
  id?: number;
  user?: {
    name: string;
  };
}

interface EditShipmentModalProps {
  open: boolean;
  onClose: () => void;
  shipment: Shipment;
  onSubmit?: (data: any) => void; // Optional callback to refresh shipments list
}

const EditShipmentModal: React.FC<EditShipmentModalProps> = ({
  open,
  onClose,
  shipment,
  onSubmit = (data) => { }
}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<AssignShipmentDto>({
    resolver: zodResolver(AssignShipmentReq),
    defaultValues: {
      id: shipment.id,
    }
  });

  useEffect(() => {
    if (open) {
      reset({
        id: shipment.id,
        routeId: shipment.route?.id,
        driverId: shipment.driver?.id
      });
    }
  }, [open, reset, shipment]);

  // Fetch drivers and routes data
  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [routesRes, driversRes] = await Promise.all([
          serviceFindRoutes(),
          serviceFindDrivers()
        ]);

        if (routesRes) {
          setRoutes(routesRes);
        }

        if (driversRes) {
          setDrivers(driversRes);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error(t('errors.failedToLoadData'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);



  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
          onClose();
          onSubmit(data);
        })}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        )}
        {!loading && (drivers.length === 0 || routes?.length === 0) ? (
          <>
            <Typography variant="h6" gutterBottom>
              {t('editShipment.missingData')}
            </Typography>

            {routes && routes.length === 0 && (
              <Typography variant="body1" color="error">
                {t('editShipment.noRoutes')}
              </Typography>
            )}

            {drivers && drivers.length === 0 && (
              <Typography variant="body1" color="error">
                {t('editShipment.noDrivers')}
              </Typography>
            )}

            <Box display="flex" justifyContent="center" mt={3}>
              <Button type="button" onClick={onClose} label={t('close')} variant="outlined" />
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {t('editShipment.title', { id: shipment.id })}
            </Typography>

            <FormControl fullWidth margin="normal" error={!!errors.routeId}>
              <InputLabel id="route-select-label">{t('route')}</InputLabel>
              <Controller
                name="routeId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="route-select-label"
                    id="route-select"
                    label={t('route')}
                    value={field.value || ''}
                  >
                    {routes.map((route) => (
                      <MenuItem key={route.id} value={route.id}>
                        {route?.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.routeId && (
                <FormHelperText>{errors.routeId.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.driverId}>
              <InputLabel id="driver-select-label">{t('driver')}</InputLabel>
              <Controller
                name="driverId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="driver-select-label"
                    id="driver-select"
                    label={t('driver')}
                    value={field.value || ''}
                  >
                    {drivers.map((driver) => (
                      <MenuItem key={driver.id} value={driver.id}>
                        {driver.user?.name || `Driver ${driver.id}`}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.driverId && (
                <FormHelperText>{errors.driverId.message}</FormHelperText>
              )}
            </FormControl>

            <Box display="flex" justifyContent="space-between" mt={3} gap={2}>
              <Button
                type="submit"
                label={t('accept')}
                variant="contained"
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="contained"
                onClick={onClose}
                label={t('cancel')}
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EditShipmentModal;
