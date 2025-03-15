import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { DashboardMetrics } from './DashboardMetrics';
import { DashboardProfile } from './DashboardProfile';
import { DashboardSettings } from './DashboardSettings';
import { DashboardClients } from './DashboardClients';

export const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="metrics" replace />} />
        <Route path="metrics" element={<DashboardMetrics />} />
        <Route path="clients" element={<DashboardClients />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
    </Routes>
  );
};