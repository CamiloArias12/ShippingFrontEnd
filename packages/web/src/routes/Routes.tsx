import { Routes, Route, Navigate } from 'react-router-dom'; // Add Navigate import
import { RequireAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import HeaderLayout from '../layouts/HeaderLayout';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import SingUp from '../pages/SingUp';
import Sidebar from '../components/Sidebar';
import Shipments from '../pages/Shipments';
import CreateShipment from '../pages/CreateShipment';
import Tracking from '../pages/Tracking';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Sidebar />}>
                <Route index element={
                    <RequireAuth>
                        <Navigate to="/dashboard" replace />
                    </RequireAuth>
                } />
                <Route path="/dashboard" element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                } />
                <Route path="shipment" element={
                    <RequireAuth allowedRoles={['admin', 'user']}>
                        <Shipments />
                    </RequireAuth>
                } />
                <Route path="shipment/create" element={
                    <RequireAuth allowedRoles={['admin', 'user']}>
                        <CreateShipment />
                    </RequireAuth>
                } />
                <Route path="tracking" element={
                    <RequireAuth allowedRoles={['admin', 'user']}>
                        <Tracking />
                    </RequireAuth>
                } />
            </Route>
            <Route path="/" element={<HeaderLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="sing-up" element={<SingUp />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;