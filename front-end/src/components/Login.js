import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.log('email, password:', email, password);
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      console.log(result);
      if (result.auth) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/');
      } else {
        alert('Enter the correct details');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login">
      <input
        className="inputBox"
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin} className="appbutton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;