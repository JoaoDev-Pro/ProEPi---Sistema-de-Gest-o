// frontend\web\src\pages\Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>ProEPI Admin</h2>
        {error && <div className="error" style={{marginBottom: '15px', padding: '10px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', fontSize: '0.9rem'}}>{error}</div>}
        
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Seu e-mail" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required
          />
        </div>
        
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Sua senha" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required
          />
        </div>
        
        <button type="submit" className="login-btn">Acessar Sistema</button>
      </form>
    </div>
  );
}