import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, deleteTransaction } from '../features/expensesSlice';
import '../Apps/App.css';
import { Trash2, Wallet, Calendar, PlusCircle } from 'lucide-react';
import Navbar from './Navbar';

function Dashboard() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.expenses.transactions);

  // --- Local State for Form ---
  const [formData, setFormData] = useState({
    title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0]
  });

  // --- Local State for Filters ---
  const [filterCat, setFilterCat] = useState('All');
  const [filterDate, setFilterDate] = useState('');

  // --- Handlers ---
  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    
    const newTx = {
      id: Date.now(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    };
    
    dispatch(addTransaction(newTx));
    setFormData({ ...formData, title: '', amount: '' }); // Reset form
  };

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  // --- Calculations for Dashboard ---
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  
  const currentMonth = new Date().toISOString().slice(0, 7); // "2023-10"
  const monthSpend = transactions
    .filter(t => t.date.startsWith(currentMonth))
    .reduce((acc, curr) => acc + curr.amount, 0);

  // --- Filtering Logic ---
  const filteredList = transactions.filter(t => {
    const matchCat = filterCat === 'All' ? true : t.category === filterCat;
    const matchDate = filterDate === '' ? true : t.date === filterDate;
    return matchCat && matchDate;
  });

  return (
    <>
        <Navbar />
        <div className="app-container">
        <header>
            <h1>💜 Royal Expense Tracker</h1>
            <p style={{color: '#a1a1aa'}}>Manage your daily spending with style</p>
        </header>

        {/* 1. DASHBOARD SUMMARY */}
        <div className="summary-grid">
            <div className="summary-card">
            <Wallet size={30} color="#d8b4fe" style={{marginBottom:10}}/>
            <div>Total Balance</div>
            <div className="amount-display">${totalBalance.toFixed(2)}</div>
            </div>
            <div className="summary-card">
            <Calendar size={30} color="#d8b4fe" style={{marginBottom:10}}/>
            <div>This Month</div>
            <div className="amount-display">${monthSpend.toFixed(2)}</div>
            </div>
        </div>

        {/* 2. ADD TRANSACTION FORM */}
        <div className="card">
            <h3 style={{marginTop:0}}>Add New Expense</h3>
            <form onSubmit={handleAdd} className="form-grid">
            <div>
                <label>Title</label>
                <input 
                type="text" 
                placeholder="e.g. Burger King" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
            </div>
            <div>
                <label>Amount ($)</label>
                <input 
                type="number" 
                placeholder="0.00" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
            </div>
            <div>
                <label>Category</label>
                <select 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                <option>Food</option>
                <option>Transport</option>
                <option>Health</option>
                <option>Entertainment</option>
                <option>Other</option>
                </select>
            </div>
            <div>
                <label>Date</label>
                <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
            </div>
            <button type="submit" className="primary-btn">
                <PlusCircle size={18} style={{marginRight:5, verticalAlign:'text-bottom'}}/> Add
            </button>
            </form>
        </div>

        {/* 3. HISTORY & FILTERS */}
        <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 20}}>
            <h3 style={{margin:0}}>History</h3>
            
            {/* Filters */}
            <div className="filter-bar" style={{marginBottom:0}}>
                <select 
                onChange={(e) => setFilterCat(e.target.value)} 
                style={{padding: '8px', width: 'auto'}}
                >
                <option value="All">All Categories</option>
                <option>Food</option>
                <option>Transport</option>
                <option>Health</option>
                <option>Entertainment</option>
                <option>Other</option>
                </select>
                <input 
                type="date" 
                onChange={(e) => setFilterDate(e.target.value)}
                style={{padding: '8px', width: 'auto'}} 
                />
            </div>
            </div>

            <div>
            {filteredList.length === 0 ? (
                <p style={{textAlign:'center', color:'#666', padding:20}}>No expenses found.</p>
            ) : (
                filteredList.map((t) => (
                <div key={t.id} className="transaction-item">
                    <div className="t-info">
                    <h4>{t.title}</h4>
                    <span>{t.date} • <span style={{color:'#d8b4fe'}}>{t.category}</span></span>
                    </div>
                    <div className="t-actions">
                    <div className="price-tag">-${t.amount.toFixed(2)}</div>
                    <button className="delete-btn" onClick={() => handleDelete(t.id)}>
                        <Trash2 size={18} />
                    </button>
                    </div>
                </div>
                ))
            )}
            </div>
        </div>

        </div>
    </>
  );
}

export default Dashboard;