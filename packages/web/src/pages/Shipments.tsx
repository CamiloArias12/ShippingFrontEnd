import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Make sure this points to your store
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

} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import EditShipmentModal from '../components/EditShipment'; // Import the EditShipment modal
import { AssignShipmentDto, Shipment } from '@shipping/shared/shipment';
import { serviceFindAllShipments, serviceFindShipments, serviceUpdateShipmentAssign, serviceUpdateShipmentStatus } from '../api/shipment';
import { useTranslation } from 'react-i18next';
import { ShipmentStatus } from '@shipping/shared/enums';
import { StatusMenu } from '../components/StatusMenu';
import { toast } from 'sonner';


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
    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // Get user role from Redux store
    const { user } = useSelector((state: RootState) => state.auth);
    const isAdmin = user?.role === 'admin';

    const statusConfig: Record<string, { color: "default" | "warning" | "info" | "success" | "error" | "primary" | "secondary"; label: string }> = {
        pending: { color: 'warning', label: t('shipments.status.pending') },
        in_transit: { color: 'info', label: t('shipments.status.in_transit') },
        delivered: { color: 'success', label: t('shipments.status.delivered') },
        cancelled: { color: 'error', label: t('shipments.status.cancelled') },
    };

    const headCells: HeadCell[] = [
        { id: 'id', label: t("shipments.list.id"), numeric: true, sortable: true },
        { id: 'status', label: t("shipments.list.status"), numeric: false, sortable: true },
        { id: 'weight', label: t("shipments.list.weight"), numeric: true, sortable: true },
        { id: 'dimensions', label: t("shipments.list.dimensions"), numeric: false, sortable: false },
        { id: 'product_type', label: t("shipments.list.product_type"), numeric: false, sortable: true },
        { id: 'destination', label: t("shipments.list.destination"), numeric: false, sortable: false },
        { id: 'route', label: t("shipments.list.route"), numeric: false, sortable: true }, // Route column
        ...(isAdmin ? [{ id: 'user', label: t("shipments.list.customer"), numeric: false, sortable: true }] : []),
        { id: 'driver', label: t("shipments.list.driver"), numeric: false, sortable: true },
        ...(isAdmin ? [{ id: 'actions', label: t("shipments.list.actions"), numeric: false, sortable: false }] : []),
    ];


    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let data;
        if (user?.role === 'admin') {
            data = await serviceFindAllShipments()
        } else {
            data = await serviceFindShipments();
        }
        if (data) {
            setShipments(data);
        } else {
            console.error('Failed to fetch shipments');
        }
    };

    function descendingComparator(a: any, b: any, orderBy: string) {
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

    const sortedShipments = useMemo(() => {
        return [...shipments].sort(getComparator(order, orderBy));
    }, [shipments, order, orderBy]);

    const visibleRows = useMemo(() => {
        return sortedShipments.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [page, rowsPerPage, sortedShipments]);

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
        navigate('/shipment/create');
    };


    const handleEditShipment = (shipmentId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering row click
        const shipmentToEdit = shipments.find(s => s.id === shipmentId);
        if (shipmentToEdit) {
            setCurrentShipment(shipmentToEdit);
            setEditModalOpen(true);
        }
    };

    const handleStatusClick = (shipmentId: string, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!isAdmin) {
            return;
        }
        setSelectedShipmentId(shipmentId);
        setStatusAnchorEl(e.currentTarget);
    };

    const handleStatusMenuClose = () => {
        setStatusAnchorEl(null);
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!selectedShipmentId) return;

        try {

            const updated = await serviceUpdateShipmentStatus({
                id: selectedShipmentId,
                status: newStatus as ShipmentStatus
            });

            if (updated) {
                const updatedShipments = shipments.map(shipment => {
                    if (shipment.id === selectedShipmentId) {
                        return { ...shipment, status: newStatus as ShipmentStatus };
                    }
                    return shipment;
                });

                setShipments(updatedShipments);
            }

        } catch (error) {
        } finally {
            handleStatusMenuClose();
        }
    };

    async function uptateAsignment(data: AssignShipmentDto) {
        try {
            const response = await serviceUpdateShipmentAssign(data);
            if (response) {
                toast.success(t('success.shipmentUpdated'));
                fetchData();
            } else {
                toast.error(t('errors.failedToUpdateShipment'));
            }
        } catch (error) {
            console.error('Failed to update shipment:', error);
            toast.error(t('errors.failedToUpdateShipment'));
        }
    }

    return (

        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    {t('shipments.title')}
                </Typography>
                <IconButton
                    onClick={handleAddClick}
                    color="secondary"
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
                                        cursor: 'pointer',
                                    }}
                                >
                                    <TableCell align="right">{shipment.id || '-'}</TableCell>
                                    <TableCell>
                                        <Tooltip title={isAdmin ? t("shipments.statusActions.changeStatusTooltip") : t("shipments.statusActions.adminOnlyTooltip")}>
                                            <Chip
                                                label={shipment.status && statusConfig[shipment.status]?.label || t('shipments.list.unknown')}
                                                color={shipment.status && statusConfig[shipment.status]?.color || 'default'}
                                                size="small"
                                                onClick={(e) => {
                                                    if (isAdmin) handleStatusClick(shipment.id!, e);
                                                }}
                                                clickable={isAdmin}
                                                sx={!isAdmin ? { cursor: 'default' } : undefined}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="right">{shipment.weight || '-'}</TableCell>
                                    <TableCell>{shipment.dimensions || '-'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={shipment.product_type || t("shipments.list.unknown")}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>{shipment.destination || t("shipments.list.unknown")}</TableCell>
                                    <TableCell>{shipment.route?.name || t("shipments.list.noRoute")}</TableCell> {/* Route column */}
                                    {isAdmin && (
                                        <TableCell>
                                            <Chip
                                                label={shipment.user?.name || t("shipments.list.unknown")}
                                                size="small"
                                                color="default"
                                                clickable
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        {shipment.driver ? (
                                            <Chip
                                                label={shipment.driver.user?.name || t("shipments.list.unknown")}
                                                size="small"
                                                color="default"
                                                clickable
                                            />
                                        ) : (
                                            <Chip label={t("shipments.list.unassigned")} variant="outlined" size="small" />
                                        )}
                                    </TableCell>
                                    {isAdmin && (
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Tooltip title={t("shipments.statusActions.editTooltip")}>
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
                                    )}
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={headCells.length} />
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
                    shipment={currentShipment}
                    onSubmit={uptateAsignment}
                />
            )}

            {/* Only render menu for admins */}
            {isAdmin && (
                <StatusMenu
                    anchorEl={statusAnchorEl}
                    open={Boolean(statusAnchorEl)}
                    onClose={handleStatusMenuClose}
                    items={Object.entries(statusConfig).map(([status, config]) => ({
                        value: status,
                        label: config.label,
                        color: config.color,
                    }))}
                    onSelect={handleStatusChange}
                />
            )}
        </Box>
    );
}
