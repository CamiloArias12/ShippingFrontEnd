import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    Chip,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import EditShipmentModal from '../components/EditShipment'; // Import the EditShipment modal
import { Shipment } from '@shipping/shared/shipment';
import { serviceFindShipments } from '../api/shipment';
import { useTranslation } from 'react-i18next';

// Status configuration for visual display
const statusConfig: Record<string, { color: "default" | "warning" | "info" | "success" | "error" | "primary" | "secondary"; label: string }> = {
    pending: { color: 'warning', label: 'Pending' },
    in_transit: { color: 'info', label: 'In Transit' },
    delivered: { color: 'success', label: 'Delivered' },
    cancelled: { color: 'error', label: 'Cancelled' },
};

// Mock drivers for the edit modal
const mockDrivers = [
    { id: 1, name: 'Driver 1' },
    { id: 2, name: 'Driver 2' },
    { id: 3, name: 'Driver 3' },
];

type Order = 'asc' | 'desc';

interface HeadCell {
    id: string;
    label: string;
    numeric: boolean;
    sortable: boolean;
}



export default function Shipments() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState('id');
    // Initialize with the provided shipment data
    const [shipments, setShipments] = useState<Shipment[]>([]);

    const { t } = useTranslation();

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentShipment, setCurrentShipment] = useState<Shipment | null>(null);

    const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedShipmentId, setSelectedShipmentId] = useState<number | null>(null);

    const headCells: HeadCell[] = [
        { id: 'id', label: t("id"), numeric: true, sortable: true },
        { id: 'status', label: t("status"), numeric: false, sortable: true },
        { id: 'weight', label: t("weight"), numeric: true, sortable: true },
        { id: 'dimensions', label: t("dimensions"), numeric: false, sortable: false },
        { id: 'product_type', label: t("product_type"), numeric: false, sortable: true },
        { id: 'destination', label: t("destination"), numeric: false, sortable: false },
        { id: 'user', label: t("customer"), numeric: false, sortable: true },
        { id: 'driver', label: t("driver"), numeric: false, sortable: true },
        { id: 'actions', label: t("actions"), numeric: false, sortable: false },
    ];

    // Fetch shipments from API or load mock data
    useEffect(() => {
        const fetchData = async () => {
            const data = await serviceFindShipments()
            if (data) {
                console.log('Fetched shipments:', data);
                setShipments(data);
            } else {
                console.error('Failed to fetch shipments');
            }
        };
        fetchData();
    }, []);

    // Function to handle sorting logic
    function descendingComparator(a: any, b: any, orderBy: string) {
        // Handle special case for user and driver fields
        if (orderBy === 'user') {
            if (!a.user || !b.user) return 0;
            return b.user.name.localeCompare(a.user.name);
        }
        if (orderBy === 'driver') {
            if (!a.driver && !b.driver) return 0;
            if (!a.driver) return 1;
            if (!b.driver) return -1;
            return b.driver.name.localeCompare(a.driver.name);
        }

        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order: Order, orderBy: string) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    // Sort the shipments based on current sort settings
    const sortedShipments = React.useMemo(() => {
        return [...shipments].sort(getComparator(order, orderBy));
    }, [shipments, order, orderBy]);

    // Calculate visible rows based on pagination
    const visibleRows = React.useMemo(() => {
        return sortedShipments.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [page, rowsPerPage, sortedShipments]);

    // Calculate empty rows for consistent table height
    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - sortedShipments.length)
        : 0;

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddClick = () => {
        navigate('/shipments/create');
    };

    // Handle navigation to shipment details
    const handleViewShipment = (shipmentId: number) => {
        navigate(`/shipments/${shipmentId}`);
    };

    // Handle navigation to user details
    const handleViewUser = (userId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering row click
        navigate(`/users/${userId}`);
    };

    // Handle navigation to driver details
    const handleViewDriver = (driverId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering row click
        navigate(`/drivers/${driverId}`);
    };

    // Modified to open the edit modal instead of navigating
    const handleEditShipment = (shipmentId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering row click
        const shipmentToEdit = shipments.find(s => s.id === shipmentId);
        if (shipmentToEdit) {
            setCurrentShipment(shipmentToEdit);
            setEditModalOpen(true);
        }
    };

    // Handle saving edited shipment
    const handleSaveShipment = (updatedData: { driver_id?: number; destination: string }) => {
        if (!currentShipment) return;

        // Find the driver object based on driver_id
        const updatedDriver = updatedData.driver_id
            ? mockDrivers.find(d => d.id === updatedData.driver_id)
            : undefined;

        // Update the shipment in state
        const updatedShipments = shipments.map(ship => {
            if (ship.id === currentShipment.id) {
                return {
                    ...ship,
                    destination: updatedData.destination,
                    driver: updatedDriver
                };
            }
            return ship;
        });

        // Actually update the state with the new shipments
        setEditModalOpen(false);
    };

    const handleStatusClick = (shipmentId: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent row click
        setSelectedShipmentId(shipmentId);
        setStatusAnchorEl(e.currentTarget);
    };

    const handleStatusMenuClose = () => {
        setStatusAnchorEl(null);
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!selectedShipmentId) return;

        try {
            /*
            const updated = await serviceUpdateShipmentStatus(selectedShipmentId, newStatus);

            if (updated) {
                // Update the shipments state with the new status
                const updatedShipments = shipments.map(shipment => {
                    if (shipment.id === selectedShipmentId) {
                        return { ...shipment, status: newStatus };
                    }
                    return shipment;
                });

                //setShipments(updatedShipments);
            }
                */
        } catch (error) {
            console.error("Failed to update shipment status:", error);
            // You might want to show an error notification here
        } finally {
            handleStatusMenuClose();
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Shipments
                </Typography>
                <IconButton
                    onClick={handleAddClick}
                    color="primary"
                    sx={{
                        backgroundColor: 'primary.light',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white'
                        }
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Box>

            <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="shipments table">
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        {headCell.sortable ? (
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={() => handleRequestSort(headCell.id)}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        ) : (
                                            headCell.label
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((shipment) => (
                                <TableRow
                                    hover
                                    key={shipment.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => shipment.id && handleViewShipment(shipment.id)}
                                >
                                    <TableCell align="right">{shipment.id || '-'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={shipment.status && statusConfig[shipment.status]?.label || 'Unknown'}
                                            color={shipment.status && statusConfig[shipment.status]?.color || 'default'}
                                            size="small" 
                                            onClick={(e) => handleStatusClick(shipment.id!, e)}
                                            clickable
                                        />
                                    </TableCell>
                                    <TableCell align="right">{shipment.weight}</TableCell>
                                    <TableCell>{shipment.dimensions}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={shipment.product_type}
                                            size="small"
                                            color="primary"
                                            variant="outlined" />
                                    </TableCell>
                                    <TableCell>{shipment.destination}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={shipment.user?.name || ''}
                                            size="small"
                                            color="default"
                                            onClick={(e) => handleViewUser(shipment.user?.id || 0, e)}
                                            clickable
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {shipment.driver ? (
                                            <Chip
                                                label={shipment.driver.user?.name || ''}
                                                size="small"
                                                color="default"
                                                onClick={(e) => handleViewDriver(shipment?.driver?.id || 0, e)}
                                                clickable
                                            />
                                        ) : (
                                            <Chip label="Unassigned" variant="outlined" size="small" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>

                                            <Tooltip title="Edit shipment">
                                                <IconButton
                                                    size="small"
                                                    color="secondary"
                                                    onClick={(e) => shipment.id && handleEditShipment(shipment.id, e)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={9} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedShipments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>

            {currentShipment && (
                <EditShipmentModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    shipment={{
                        id: currentShipment.id!,
                        driver_id: currentShipment.driver?.id,
                        destination: currentShipment.destination
                    }}
                    drivers={mockDrivers}
                    onSave={handleSaveShipment}
                />
            )}

            <Menu
                anchorEl={statusAnchorEl}
                open={Boolean(statusAnchorEl)}
                onClose={handleStatusMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {Object.entries(statusConfig).map(([status, config]) => (
                    <MenuItem 
                        key={status} 
                        onClick={() => handleStatusChange(status)}
                        sx={{ color: `${config.color}.main` }}
                    >
                        {config.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
