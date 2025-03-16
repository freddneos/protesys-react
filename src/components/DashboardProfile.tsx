import { useState } from "react";
import { useTexts } from "../hooks/useTexts";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabase";

export const DashboardProfile = () => {
  const { texts } = useTexts();
  const { user, company } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error(texts.dashboard.profile.passwordMismatch);
      return;
    }
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      toast.success(texts.dashboard.profile.passwordUpdated);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(texts.dashboard.profile.updateError);
    } finally {
      setIsUpdating(false);
    }
  };

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
                value={user?.email || ''} 
                disabled 
              />
            </div>
            
            {company && (
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">{texts.dashboard.profile.company}</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered" 
                  value={company.name || ''} 
                  disabled 
                />
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{texts.dashboard.profile.security}</h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{texts.dashboard.profile.newPassword}</span>
                </label>
                <input 
                  type="password" 
                  className="input input-bordered" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{texts.dashboard.profile.confirmPassword}</span>
                </label>
                <input 
                  type="password" 
                  className="input input-bordered" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  texts.dashboard.profile.updatePassword
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};