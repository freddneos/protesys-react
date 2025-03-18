import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { DashboardMetrics } from './dashboard/DashboardMetrics';
import { DashboardProfile } from './dashboard/DashboardProfile';
import { DashboardSettings } from './dashboard/DashboardSettings';
import { DashboardClients } from './dashboard/DashboardClients';
import { DashboardProsthetists } from './dashboard/DashboardProsthetists';
import { DashboardStages } from './dashboard/DashboardStages';

export const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="metrics" replace />} />
        <Route path="metrics" element={<DashboardMetrics />} />
        <Route path="clients" element={<DashboardClients />} />
        <Route path="prosthetists" element={<DashboardProsthetists />} />
        <Route path="stages" element={<DashboardStages />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
    </Routes>
  );
};