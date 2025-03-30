import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Divider,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Chip,
    Card,
    CardContent,
    Avatar,
    CircularProgress
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { format, isValid } from 'date-fns';
import { serviceFindShipmentById, serviceFindShipmentHistory, serviceSubscribeToShipmentUpdates, ShipmentHistory } from '../api/shipment';
import { Shipment } from '@shipping/shared/shipment';

const statusConfig = {
    pending: { color: 'warning', label: 'Pending', icon: <InventoryIcon /> },
    in_transit: { color: 'info', label: 'In Transit', icon: <LocalShippingIcon /> },
    delivered: { color: 'success', label: 'Delivered', icon: <CheckCircleIcon /> },
    cancelled: { color: 'error', label: 'Cancelled', icon: <CancelIcon /> },
};

const defaultStatus = { color: 'default', label: 'Unknown', icon: <HelpOutlineIcon /> };

const safeFormatDate = (dateStr: string) => {
    try {
        const date = new Date(dateStr);
        return isValid(date) ? format(date, 'MMM dd, yyyy • h:mm a') : 'Unknown date';
    } catch {
        return 'Unknown date';
    }
};

const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || defaultStatus;
};

const sortByTimestamp = (a: ShipmentHistory, b: ShipmentHistory) => {
    try {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);

        if (!isValid(dateA) || !isValid(dateB)) return 0;
        return dateB.getTime() - dateA.getTime();
    } catch {
        return 0;
    }
};

export default function ShipmentTracking() {
    const { id } = useParams<{ id: string }>();
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [history, setHistory] = useState<ShipmentHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError('No shipment ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // Fetch shipment details
                const shipmentData = await serviceFindShipmentById(id);
                if (shipmentData) {
                    setShipment(shipmentData);
                } else {
                    setError('Shipment not found');
                }

                // Fetch shipment history
                const historyData = await serviceFindShipmentHistory(id);
                if (historyData && Array.isArray(historyData)) {
                    setHistory(historyData.sort(sortByTimestamp));
                } else {
                    setHistory([]);
                }
            } catch (err) {
                console.error('Error fetching shipment data:', err);
                setError('Failed to load shipment data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Subscribe to real-time updates
    useEffect(() => {
        if (!id) return;

        let isActive = true; // Flag to prevent updates after unmount

        const subscribeToUpdates = async () => {
            const cleanup = await serviceSubscribeToShipmentUpdates(id, (updatedShipment) => {
                if (!isActive) return;

                setShipment(updatedShipment);

                // Refetch history when shipment updates
                serviceFindShipmentHistory(id)
                    .then(historyData => {
                        if (!isActive) return;
                        if (historyData && Array.isArray(historyData)) {
                            setHistory(historyData.sort(sortByTimestamp));
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching history updates:', err);
                        // Not setting error state here to avoid UI disruption
                        // during real-time updates
                    });
            });

            // Cleanup subscription on component unmount
            return cleanup;
        };

        let cleanupFn: (() => void) | undefined;
        subscribeToUpdates().then(cleanup => {
            cleanupFn = cleanup;
        });

        return () => {
            isActive = false;
            if (cleanupFn) {
                cleanupFn();
            }
        };
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !shipment) {
        return (
            <Box p={3}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="error" variant="h6">
                        {error || 'Shipment not found'}
                    </Typography>
                </Paper>
            </Box>
        );
    }

    // Get status configuration safely
    const statusData = getStatusConfig(shipment.status || 'unknown');

    return (
        <Box p={3}>
            <Typography variant="h4" component="h1" gutterBottom>
                Shipment Tracking
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                ID: {shipment.id || 'Unknown ID'}
            </Typography>
            <Divider sx={{ my: 3 }} />

            {/* Current Status Card */}
            <Card elevation={3} sx={{ mb: 4 }}>
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: `${statusData.color}.main` }}>
                                {statusData.icon}
                            </Avatar>
                            <Box>
                                <Typography variant="h6">Current Status</Typography>
                                <Chip
                                    label={statusData.label}
                                    color={statusData.color as any}
                                    size="medium"
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="body1">
                                <strong>Destination:</strong> {shipment.destination || 'Unknown destination'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Product:</strong> {shipment.product_type || 'Unknown'} •
                                <strong> Weight:</strong> {typeof shipment.weight === 'number' ? `${shipment.weight} kg` : 'Unknown'}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Tracking History
                </Typography>
                <Stepper orientation="vertical" sx={{ mt: 3 }}>
                    {history.map((event, index) => {
                        const eventStatus = getStatusConfig(event.status);
                        return (
                            <Step key={event.id || `event-${index}`} active={index === 0} completed={true}>
                                <StepLabel
                                    StepIconProps={{
                                        icon: eventStatus.icon
                                    }}
                                    sx={{
                                        '& .MuiStepLabel-iconContainer': {
                                            '& .MuiSvgIcon-root': {
                                                color: `${eventStatus.color}.main`
                                            }
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle2">
                                        {eventStatus.label}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {safeFormatDate(event.timestamp)}
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Box py={1}>
                                        {event.location && (
                                            <Typography variant="body2" gutterBottom>
                                                <strong>Location:</strong> {event.location}
                                            </Typography>
                                        )}
                                        {event.notes && (
                                            <Typography variant="body2">
                                                <strong>Notes:</strong> {event.notes}
                                            </Typography>
                                        )}
                                    </Box>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>

                {history.length === 0 && (
                    <Box py={3} textAlign="center">
                        <Typography color="text.secondary">No tracking history available yet.</Typography>
                    </Box>
                )}
            </Paper>

            {/* Map could be added here if you have coordinates */}
            {(typeof shipment.latitude === 'number' && typeof shipment.longitude === 'number') && (
                <Paper elevation={3} sx={{ p: 3, height: '300px' }}>
                    <Typography variant="h6" gutterBottom>
                        Current Location
                    </Typography>
                    <Box sx={{ height: '100%', bgcolor: 'grey.100' }}>
                        {/* Map component would go here */}
                        <Typography variant="body2" color="text.secondary" textAlign="center" py={10}>
                            Map showing location at coordinates: {shipment.latitude.toFixed(6)}, {shipment.longitude.toFixed(6)}
                        </Typography>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}