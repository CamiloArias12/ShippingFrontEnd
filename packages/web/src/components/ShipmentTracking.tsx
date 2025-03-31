import { Shipment } from "@shipping/shared/shipment";
import { useShipmentUpdates } from "../api/socket";
import { Box, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import translation hook

type ShipmentTrackingProps = {
  shipment: Shipment;
  setShipment: (shipment: Shipment) => void;
};

export function ShipmentTracking({ shipment, setShipment }: ShipmentTrackingProps) {
  const { t } = useTranslation(); // Add translation hook

  if (!shipment) {
    return null;
  }
  //@ts-ignore
  useShipmentUpdates(shipment.id, (updateData) => {
    setShipment({
      ...shipment,
      ...updateData,
    });
  });
  
  return (
    <Box sx={{ padding: 2 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{ marginBottom: 1, color: "#555" }}
        >
          <strong>{t("shipment.tracking.id")}:</strong> {shipment.id}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ marginBottom: 1, color: "#555" }}
        >
          <strong>{t("shipment.tracking.status")}:</strong>{" "}
          {shipment.status
            ? t(`shipment.status.${shipment.status.toLowerCase()}`, shipment.status)
            : t("shipment.status.unknown", "Unknown")}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ marginBottom: 1, color: "#555" }}
        >
          <strong>{t("shipment.tracking.destination")}:</strong> {shipment.destination}
        </Typography>
      </Paper>
    </Box>
  );
}