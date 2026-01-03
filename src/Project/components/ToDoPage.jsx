import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, deleteTask } from '../features/todoSlice';
import Navbar from '../components/Navbar';
import { CheckCircle, Circle, Trash2, Plus } from 'lucide-react';

const ToDoPage = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.tasks);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask(text));
    setText('');
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Task Manager</h2>
          
          {/* Input Form */}
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="primary-btn" style={{ width: 'auto' }}>
              <Plus size={20} />
            </button>
          </form>

          {/* Task List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map((task) => (
              <div 
                key={task.id} 
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  background: '#272036',
                  padding: '15px',
                  borderRadius: '8px',
                  border: task.completed ? '1px solid #7e22ce' : '1px solid transparent',
                  opacity: task.completed ? 0.6 : 1
                }}
              >
                <div 
                  onClick={() => dispatch(toggleTask(task.id))}
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
                >
                  {task.completed ? <CheckCircle color="#d8b4fe" /> : <Circle color="#666" />}
                  <span style={{ 
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#a1a1aa' : 'white'
                  }}>
                    {task.text}
                  </span>
                </div>
                
                <button 
                  onClick={() => dispatch(deleteTask(task.id))}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;