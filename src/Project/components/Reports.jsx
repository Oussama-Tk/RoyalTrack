import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ExpenseChart from './ExpenseChart';

const Reports = () => {
  const transactions = useSelector((state) => state.expenses.transactions);

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <div className="card">
           <h2 style={{textAlign: 'center'}}>Monthly Spending Analysis</h2>
           <p style={{textAlign: 'center', color: '#a1a1aa', marginBottom: 30}}>
             Visual representation of your financial habits
           </p>
           <ExpenseChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Reports;