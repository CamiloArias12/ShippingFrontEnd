import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';



export function StatusHistory({ history }: { history: any[] }) {
    const { t } = useTranslation();
    return (
        <Box mt={4}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('tracking.statusHistory.previousStatus', 'Previous Status')}</TableCell>
                            <TableCell>{t('tracking.statusHistory.currentStatus', 'Current Status')}</TableCell>
                            <TableCell>{t('tracking.statusHistory.date', 'Date')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>{t(entry.previous_status ?"shipment.status." +entry.previous_status:'') || '-'}</TableCell>
                                <TableCell>{t("shipment.status." + entry.new_status)}</TableCell>
                                <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}