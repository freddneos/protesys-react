import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
};