import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) throw signInError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Login</h2>
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}
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
            <button className="btn btn-primary w-full" type="submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};