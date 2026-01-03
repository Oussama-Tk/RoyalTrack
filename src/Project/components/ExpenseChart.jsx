import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseChart = ({ transactions }) => {
  // 1. Group amounts by Category (same logic as before)
  const categories = ['Food', 'Transport', 'Health', 'Entertainment', 'Other'];
  
  // Prepare data in the format Recharts expects: [ { name: 'Food', value: 100 }, ... ]
  const data = categories.map(cat => {
    const total = transactions
      .filter(t => t.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { name: cat, value: total };
  }).filter(item => item.value > 0); // Hide categories with $0 spending

  // Royal Purple Color Palette
  const COLORS = [
    '#7e22ce', // Royal Purple
    '#67ff50ff', // Lighter Purple
    '#47acffff', // Lavender
    '#ff5b5bff', // Violet
    '#ffbe28ff', // Dark Deep Purple
  ];

  // Custom Tooltip to match Dark Theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#1a1625', 
          border: '1px solid #7e22ce', 
          padding: '10px', 
          borderRadius: '5px'
        }}>
          <p style={{color: '#d8b4fe', margin: 0}}>{`${payload[0].name} : $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // This makes it a "Doughnut"
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none" // Removes ugly white borders
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span style={{ color: '#a1a1aa' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;