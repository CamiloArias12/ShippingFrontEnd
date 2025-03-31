import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BarChart } from "@mui/x-charts";
import { serviceFindDrivers } from "../api/driver";
import { Driver } from "@shipping/shared/index";
import { serviceFilters } from "../api/shipment";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Dashboard() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
    driverId: "",
  });

  const [drivers, setDrivers] = useState<Driver[] | null>(null);
  const [chartData, setChartData] = useState<{ date: string; shipments: number }[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const [filtersData, setFiltersData] = useState(null);
  const isAdmin = user?.role === "admin";

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async () => {
    setFiltersData(null);
    setChartData([]);

    try {
      const data = await serviceFilters(filters);
      setFiltersData(data);
      if (data.data.groupedByDate) {
        const chartData = data.data.groupedByDate.map((item: { date: string; total: number }) => ({
          date: new Date(item.date).toLocaleDateString(),
          shipments: item.total,
        }));

        setChartData(chartData);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await serviceFindDrivers();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchData();
  }, []);
  if (!isAdmin) {
    return (
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        p={4}
      >
        <Typography variant="h4" gutterBottom>
          Dasboard
        </Typography>
      </Box>
    );
  }

  return (
    <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" p={4}>
      <Box display="flex" flexDirection="row" gap={2} width="100%" maxWidth="800px" mt={4}>
        <TextField
          label={t("dashboard.filters.startDate", "Start Date")}
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, minWidth: "200px" }}
        />
        <TextField
          label={t("dashboard.filters.endDate", "End Date")}
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, minWidth: "200px" }}
        />
        <TextField
          label={t("dashboard.filters.status", "Status")}
          select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          sx={{ flex: 1, minWidth: "200px" }}
        >
          <MenuItem value="">{t("dashboard.filters.all", "All")}</MenuItem>
          <MenuItem value="pending">{t("shipment.status.pending", "Pending")}</MenuItem>
          <MenuItem value="in transit">{t("shipment.status.in transit", "In Transit")}</MenuItem>
          <MenuItem value="delivered">{t("shipment.status.delivered", "Delivered")}</MenuItem>
          <MenuItem value="cancelled">{t("shipment.status.cancelled", "Cancelled")}</MenuItem>
        </TextField>
        {isAdmin && (
          <TextField
            label={t("dashboard.filters.driverId", "Driver")}
            select
            name="driverId"
            value={filters.driverId}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: "200px" }}
          >
            <MenuItem value="">{t("dashboard.filters.allDrivers", "All Drivers")}</MenuItem>
            {drivers?.map((driver: Driver) => (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.user?.name || t("dashboard.filters.unknownDriver", "Unknown Driver")}
              </MenuItem>
            ))}
          </TextField>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilters}
          sx={{ flex: "0 0 auto", minWidth: "150px", alignSelf: "center" }}
        >
          {t("dashboard.filters.apply", "Apply Filters")}
        </Button>
      </Box>

      <Box width="100%" maxWidth="800px" mt={6}>
        <Typography variant="h6" gutterBottom>
          {t("dashboard.chart.title", "Shipments by Date")}
        </Typography>
        <BarChart
          xAxis={[
            {
              dataKey: "date",
              scaleType: "band",
              label: t("dashboard.chart.date", "Date"),
            },
          ]}
          series={[
            {
              dataKey: "shipments",
              label: t("dashboard.chart.shipments", "Shipments"),
            },
          ]}
          dataset={chartData}
          width={800}
          height={400}
        />
      </Box>
    </Box>
  );
}
