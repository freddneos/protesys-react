import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RiUser3Line, RiSettings4Line, RiBarChartLine, RiLogoutBoxLine } from 'react-icons/ri';
import { useAuth } from '../hooks/useAuth';
import { useTexts } from '../hooks/useTexts';

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, session } = useAuth();
  const { texts } = useTexts();

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col h-screen bg-base-200">
      <div className="navbar bg-base-100 border-b border-base-300 shadow-sm">
        <div className="flex-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {texts.global.appName}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-full bg-base-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium">{session?.user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-sm text-error hover:bg-error/10 transition-colors"
          >
            <RiLogoutBoxLine className="w-5 h-5" />
            {texts.dashboard.user.logout}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-64 bg-base-100 border-r border-base-300 p-6">
          <ul className="space-y-3">
            <li>
              <Link 
                to="/dashboard/metrics" 
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  location.pathname === '/dashboard/metrics' 
                    ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' 
                    : 'hover:bg-base-200'
                }`}
              >
                <RiBarChartLine className="w-5 h-5" />
                {texts.dashboard.navigation.metrics}
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/profile" 
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  location.pathname === '/dashboard/profile' 
                    ? 'bg-secondary text-secondary-content shadow-lg shadow-secondary/20' 
                    : 'hover:bg-base-200'
                }`}
              >
                <RiUser3Line className="w-5 h-5" />
                {texts.dashboard.navigation.profile}
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/settings" 
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  location.pathname === '/dashboard/settings' 
                    ? 'bg-accent text-accent-content shadow-lg shadow-accent/20' 
                    : 'hover:bg-base-200'
                }`}
              >
                <RiSettings4Line className="w-5 h-5" />
                {texts.dashboard.navigation.settings}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};