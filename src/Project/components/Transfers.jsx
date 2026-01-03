import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransfer } from '../features/transfersSlice';
import Navbar from '../components/Navbar';
import { Send, ArrowRight } from 'lucide-react';

const TransfersPage = () => {
  const [formData, setFormData] = useState({ to: '', amount: '' });
  const dispatch = useDispatch();
  const transfers = useSelector((state) => state.transfers.transfers);

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.to || !formData.amount) return;
    dispatch(addTransfer({ to: formData.to, amount: parseFloat(formData.amount) }));
    setFormData({ to: '', amount: '' });
    alert("Transfer Sent Successfully!");
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        
        {/* Transfer Form */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Send color="#d8b4fe" /> Quick Transfer
          </h2>
          <form onSubmit={handleSend} className="form-grid">
             <div>
               <label>Recipient Name / IBAN</label>
               <input 
                 type="text" 
                 placeholder="e.g. John Doe" 
                 value={formData.to} 
                 onChange={(e) => setFormData({...formData, to: e.target.value})}
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
             <button type="submit" className="primary-btn" style={{ height: '48px', marginTop: 'auto' }}>
               Send Money
             </button>
          </form>
        </div>

        {/* Transfer History */}
        <div className="card">
          <h3>Recent Transfers</h3>
          {transfers.length === 0 ? <p style={{color:'#666'}}>No transfers yet.</p> : (
            transfers.slice().reverse().map((t) => (
              <div key={t.id} className="transaction-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ background: 'rgba(126, 34, 206, 0.2)', padding: '10px', borderRadius: '50%' }}>
                    <ArrowRight color="#d8b4fe" size={20} />
                  </div>
                  <div className="t-info">
                    <h4 style={{ margin: 0 }}>To: {t.to}</h4>
                    <span>{t.date} • {t.status}</span>
                  </div>
                </div>
                <div className="price-tag">-${t.amount.toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
};

export default TransfersPage;