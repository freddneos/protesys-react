import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the page user was trying to visit before being redirected to login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) throw error;
      
      toast.success('Login realizado com sucesso!');
      // Navigate to original destination or dashboard
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input 
                type="email" 
                placeholder="Email" 
                className="input input-bordered w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="form-control">
              <input 
                type="password" 
                placeholder="Senha" 
                className="input input-bordered w-full" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            <button 
              className="btn btn-primary w-full" 
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? <span className="loading loading-spinner"></span> : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};