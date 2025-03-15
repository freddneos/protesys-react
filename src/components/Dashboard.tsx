import { DashboardLayout } from "./DashboardLayout";
import { DashboardMetrics } from "./DashboardMetrics";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <DashboardMetrics />
    </DashboardLayout>
  );
};