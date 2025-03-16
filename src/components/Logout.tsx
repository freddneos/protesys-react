import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const Logout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
        toast.success('Logout realizado com sucesso!');
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        // Always redirect to home page after logout attempt
        navigate('/', { replace: true });
      }
    };
    
    performLogout();
  }, [signOut, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );
};