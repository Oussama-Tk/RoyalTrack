import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="card" style={{width: '350px', textAlign: 'center'}}>
        <h1 style={{fontSize: '2rem'}}>Welcome Back</h1>
        <p style={{color: '#a1a1aa'}}>Login to manage your expenses</p>
        
        {error && <div style={{color: '#ef4444', marginBottom: 10}}>{error}</div>}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 15}}>
          <input type="email" placeholder="Email (example@gmail.com)" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password " value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit" className="primary-btn">Login</button>
        </form>

        <p style={{marginTop: 20, fontSize: '0.9rem'}}>
          No account? <Link to="/register" style={{color: '#d8b4fe'}}>Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;