import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

export const Login = () => {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast.success('Login realizado com sucesso!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

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
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};