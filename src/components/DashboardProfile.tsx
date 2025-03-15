import { useTexts } from "../hooks/useTexts";
import { useAuth } from "../hooks/useAuth";

export const DashboardProfile = () => {
  const { texts } = useTexts();
  const { session } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">{texts.dashboard.profile.title}</h1>
      
      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{texts.dashboard.profile.personalInfo}</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.profile.email}</span>
              </label>
              <input 
                type="text" 
                className="input input-bordered" 
                value={session?.user.email || ''} 
                disabled 
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{texts.dashboard.profile.notifications}</h2>
            {/* Notification preferences content */}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{texts.dashboard.profile.security}</h2>
            {/* Security settings content */}
          </div>
        </div>
      </div>
    </div>
  );
};