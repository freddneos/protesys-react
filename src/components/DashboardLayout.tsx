import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../components/Logout";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex">
      {/* Side Menu */}
      <aside className="w-64 bg-gray-100 shadow-lg p-4 flex flex-col justify-between">
        <nav>
          <h2 className="text-xl font-bold mb-6 text-primary">Protesys</h2>
          <ul className="menu space-y-2">
            <li><Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200 rounded">Dashboard</Link></li>
            <li><Link to="/dashboard/prosthetists" className="block px-4 py-2 hover:bg-gray-200 rounded">Prosthetists</Link></li>
            <li><Link to="/dashboard/clients" className="block px-4 py-2 hover:bg-gray-200 rounded">Clients</Link></li>
            <li><Link to="/dashboard/processes" className="block px-4 py-2 hover:bg-gray-200 rounded">Processes</Link></li>
          </ul>
        </nav>
        <Logout />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-light overflow-y-auto">
        {children}
      </main>
    </div>
  );
};