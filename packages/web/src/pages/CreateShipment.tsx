import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'; // Add Controller import
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button, Divider, Paper, Alert, useMediaQuery, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Input } from '../components/Input';
import { ShipmentCreateReq, ShipmentCreateDto } from '@shipping/shared/shipment';
import { serviceCreateShipment } from '../api/shipment';
import { useNavigate } from 'react-router-dom';
import { GoogleMapsOneMarker } from '../components/maps/GoogleMapsOneMarker';
import GooglePlacesAutocomplete from '../components/maps/GooglePlacesAutocomplete';
import { GoogleMapsLoader } from '../components/maps/GoogleMapsLoader';



export default function CreateShipment() {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [targetLocation, setTargetLocation] = useState<{ loc: google.maps.LatLngLiteral | null }>({
        loc: { lat: 4.711, lng: -74.0721 },
    });
    const navigate = useNavigate();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ShipmentCreateDto>({
        resolver: zodResolver(ShipmentCreateReq),
    });

    const onSubmit: SubmitHandler<ShipmentCreateDto> = async (data) => {
        setLoading(true);
        const result = await serviceCreateShipment({
            ...data,
            //@ts-ignore
            location: targetLocation.loc
        });
        setLoading(false);
        if (result) {
            navigate('/shipment');
        } else {
            setError(t('errors.create_shipment'));
        }
    };

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>
                {t('shipments.create_title')}
            </Typography>

            {/* Wrap the entire form with the GoogleMapsLoader */}
            <GoogleMapsLoader>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Box
                        display="flex"
                        flexDirection={isMobile ? 'column' : 'row'}
                        gap={3}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            maxWidth={'600px'}
                            sx={{ flex: '1 1 50%' }}
                        >
                            <Input
                                label={t('shipments.fields.weight')}
                                props={{
                                    ...register('weight', {
                                        valueAsNumber: true
                                    })
                                }}
                                type="number"
                                placeholder="10.5"
                            />
                            {errors.weight && (
                                <Typography color="error" variant="caption">
                                    {t(`validation.${errors.weight.message}`)}
                                </Typography>
                            )}

                            <Input
                                label={t('shipments.fields.dimensions')}
                                props={{ ...register('dimensions') }}
                                placeholder="30×20×15"
                            />
                            {errors.dimensions && (
                                <Typography color="error" variant="caption">
                                    {t(`validation.${errors.dimensions.message}`)}
                                </Typography>
                            )}

                            <Input
                                label={t('shipments.fields.product_type')}
                                props={{ ...register('product_type') }}
                                placeholder="Electronics, Clothing, etc."
                            />
                            {errors.product_type && (
                                <Typography color="error" variant="caption">
                                    {t(`validation.${errors.product_type.message}`)}
                                </Typography>
                            )}
                            <Controller
                                name="destination"
                                control={control} // Add control to your useForm call if you don't have it
                                render={({ field }) => (
                                    <GooglePlacesAutocomplete
                                        onChange={(location: any) => {
                                            setTargetLocation(location);
                                            field.onChange(location?.address);
                                            // Update the form field value with the selected address text
                                            if (location?.address) {
                                                field.onChange(location.address);
                                            }
                                        }}
                                        initialValue={targetLocation?.loc}
                                        label={t('shipments.fields.destination')}
                                        value={field.value}
                                        onBlur={field.onBlur}
                                        error={!!errors.destination}
                                        helperText={errors.destination?.message ?
                                            t(`validation.${errors.destination.message}`) : ''}
                                    />
                                )}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                            >
                                {t('shipments.create_button')}
                            </Button>

                            {error && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {t('shipments.error')}
                                </Alert>
                            )}
                        </Box>

                        <Box
                            sx={{
                                flex: '1 1 50%',
                                display: 'flex',
                                flexDirection: 'column',
                                height: isMobile ? '350px' : '400px',
                            }}
                        >
                            {targetLocation.loc && (
                                <Box sx={{ flexGrow: 1, width: "100%", borderRadius: 1, overflow: 'hidden', mb: 2 }}>
                                    <GoogleMapsOneMarker
                                        onChange={loc => setTargetLocation({ ...targetLocation, loc: loc })}
                                        markerLocation={targetLocation.loc}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Box>
                            )}

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition(
                                            position => {
                                                const { latitude, longitude } = position.coords;
                                                setTargetLocation({
                                                    ...targetLocation,
                                                    loc: { lat: latitude, lng: longitude },
                                                });
                                            },
                                            error => {
                                                console.error(error);
                                                setError(t('errors.location_permission'));
                                            }
                                        );
                                    } else {
                                        setError(t('errors.geolocation_not_supported'));
                                    }
                                }}
                            >
                                {t('shipments.use_current_location')}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </GoogleMapsLoader>
        </Box>
    );
}
