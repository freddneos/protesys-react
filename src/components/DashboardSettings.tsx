import { useTexts } from "../hooks/useTexts";
import { useTheme } from "../hooks/useTheme";

export const DashboardSettings = () => {
  const { texts } = useTexts();
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">{texts.dashboard.settings.title}</h1>
      
      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{texts.dashboard.settings.appearance}</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{texts.dashboard.settings.theme}</span>
              </label>
              <select 
                className="select select-bordered" 
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{texts.dashboard.settings.notifications.title}</h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{texts.dashboard.settings.notifications.email}</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{texts.dashboard.settings.notifications.push}</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{texts.dashboard.settings.notifications.sms}</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{texts.dashboard.settings.security.title}</h2>
            <div className="space-y-4">
              <button className="btn btn-primary">
                {texts.dashboard.settings.security.changePassword}
              </button>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{texts.dashboard.settings.security.twoFactor}</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};