import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';

interface EditShipmentModalProps {
  open: boolean;
  onClose: () => void;
  shipment: {
    id: number;
    driver_id?: number;
    destination: string;
  };
  drivers: { id: number; name: string }[];
  onSave: (updatedShipment: { driver_id?: number; destination: string }) => void;
}

const EditShipmentModal: React.FC<EditShipmentModalProps> = ({ open, onClose, shipment, drivers, onSave }) => {
  const [destination, setDestination] = useState(shipment.destination);
  const [driverId, setDriverId] = useState<number | undefined>(shipment.driver_id);

  const handleSave = () => {
    onSave({ driver_id: driverId, destination });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Shipment #{shipment.id}
        </Typography>
        <TextField
          fullWidth
          label="Destination"
          variant="outlined"
          margin="normal"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <TextField
          select
          fullWidth
          label="Driver"
          variant="outlined"
          margin="normal"
          value={driverId || ''}
          onChange={(e) => setDriverId(Number(e.target.value) || undefined)}
        >
          <MenuItem value="">No Driver</MenuItem>
          {drivers.map((driver) => (
            <MenuItem key={driver.id} value={driver.id}>
              {driver.name}
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditShipmentModal;
