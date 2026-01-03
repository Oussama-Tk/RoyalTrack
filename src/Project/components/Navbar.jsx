import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { LogOut, PieChart, LayoutDashboard, CheckSquare, ArrowRightLeft } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const linkStyle = { color: 'white', textDecoration: 'none', display: 'flex', gap: 5, alignItems: 'center', fontSize: '0.9rem' };

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem',
      background: '#1a1625', borderBottom: '1px solid #7e22ce', alignItems: 'center'
    }}>
      <h2 style={{margin:0, color: '#d8b4fe'}}>💜 RoyalTracker</h2>
      <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
        <Link to="/dashboard" style={linkStyle}>
           <LayoutDashboard size={18}/> Dashboard
        </Link>
        <Link to="/reports" style={linkStyle}>
           <PieChart size={18}/> Reports
        </Link>
        <Link to="/todo" style={linkStyle}>
           <CheckSquare size={18}/> Tasks
        </Link>
        <Link to="/transfers" style={linkStyle}>
           <ArrowRightLeft size={18}/> Transfers
        </Link>
      </div>

      <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
        <span style={{color: '#a1a1aa'}}>Hello, {user?.name}</span>
        <button 
          onClick={handleLogout}
          style={{background: 'transparent', border:'1px solid #ef4444', color:'#ef4444', padding:'5px 10px', borderRadius:5, cursor:'pointer'}}
        >
          <LogOut size={16}/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;