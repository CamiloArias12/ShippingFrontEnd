import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Input } from '../components/Input';
import { ShipmentCreateReq, ShipmentCreateDto } from '@shipping/shared/shipment';
import { serviceCreateShipment } from '../api/shipment';
import { useNavigate } from 'react-router-dom';

export default function CreateShipment() {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ShipmentCreateDto>({
        resolver: zodResolver(ShipmentCreateReq),
    });

    const onSubmit: SubmitHandler<ShipmentCreateDto> = async (data) => {
        setLoading(true);
        const result = await serviceCreateShipment(data);
        setLoading(false);
        if (result) {
            navigate('/shipments');
        } else {
            setError(t('errors.create_shipment'));
        }




    };

    return (
        <Box>
            <Box display="flex" flexDirection="column" gap={3}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {t('shipments.create_title', 'Create New Shipment')}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                    >
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Input
                                label={t('shipments.fields.weight', 'Weight (kg)')}
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
                                label={t('shipments.fields.dimensions', 'Dimensions (L×W×H)')}
                                props={{ ...register('dimensions') }}
                                placeholder="30×20×15"
                            />
                            {errors.dimensions && (
                                <Typography color="error" variant="caption">
                                    {t(`validation.${errors.dimensions.message}`)}
                                </Typography>
                            )}

                            <Input
                                label={t('shipments.fields.product_type', 'Product Type')}
                                props={{ ...register('product_type') }}
                                placeholder="Electronics, Clothing, etc."
                            />
                            {errors.product_type && (
                                <Typography color="error" variant="caption">
                                    {t(`validation.${errors.product_type.message}`)}
                                </Typography>
                            )}

                            <Input
                                label={t('shipments.fields.destination', 'Destination Address')}
                                props={{ ...register('destination') }}
                                placeholder="123 Main St, City, Country"
                            />
                            {errors.destination && (
                                <Typography color="error" variant="caption">
                                    {t(`validation.${errors.destination.message}`)}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="button"
                                onClick={() => reset()}
                                sx={{ mr: 2 }}
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                            >
                                {t('common.reset', 'Reset')}
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                            >
                                {t('shipments.create_button', 'Create Shipment')}
                            </Button>
                        </Box>
                        {error && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                                <Typography color="error.dark">
                                    {t('shipments.error', 'Failed to create shipment. Please try again.')}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
