import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    if (!error) {
      alert("Registration Successful! Please Login.");
      navigate('/');
    }
  };

  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="card" style={{width: '350px', textAlign: 'center'}}>
        <h1 style={{fontSize: '2rem'}}>Create Account</h1>
        <p style={{color: '#a1a1aa'}}>Join the Royal Club</p>

        {error && <div style={{color: '#ef4444', marginBottom: 10}}>{error}</div>}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 15}}>
          <input type="text" placeholder="Full Name" onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email" onChange={(e)=>setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password" onChange={(e)=>setFormData({...formData, password: e.target.value})} required />
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>

        <p style={{marginTop: 20, fontSize: '0.9rem'}}>
          Already have an account? <Link to="/" style={{color: '#d8b4fe'}}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;