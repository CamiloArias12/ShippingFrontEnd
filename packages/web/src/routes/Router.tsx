import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import HeaderLayout from '../layouts/HeaderLayout';
import Login from '../pages/Login';
import SingUp from '../pages/SingUp';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import Shipments from '../pages/Shipments'; // Import the Shipments page
import CreateShipment from '../pages/CreateShipment';

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<HeaderLayout />}>
        <Route path="/login" Component={Login} />
        <Route path="/sing-up" Component={SingUp} />
      </Route>
      <Route element={<Sidebar />}>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/shipments" Component={Shipments} /> 
        <Route path="/shipments/create" Component={CreateShipment} />
      </Route>
    </Route>
  )
);