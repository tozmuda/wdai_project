// src/App.js
import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import './css/App.css';

const App = () => {
  const [users, setUsers] = useState((sessionStorage.getItem('users') === null) ? [{ username: "user", password: "admin"}] : JSON.parse(sessionStorage.getItem('users')));
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    sessionStorage.setItem('users', JSON.stringify(users));
    console.log(JSON.parse(sessionStorage.getItem('users')));
  }, [users]);

  const handleLogin = (username, password) => {
    console.log(JSON.parse(sessionStorage.getItem('users')));
    const user = JSON.parse(sessionStorage.getItem('users')).find((user) => user.username === username && user.password === password);

    if (user) {
      sessionStorage.setItem('user', username);
      window.location.replace("http://localhost:3000/home");
    } else {
      setMessage('Invalid data');
    }
  };

  const handleRegister = (username, password) => {
    const user = JSON.parse(sessionStorage.getItem('users')).find((user) => user.username === username);
    if(user){
      setMessage('User already exists!')
    }
    else if(username.length < 4 || password.length < 4){
      setMessage('Username and Password must be at least 4 letters long')
    }
    else{
      const newUser = { username, password };
      setUsers([...users, newUser]);
      window.location.replace("http://localhost:3000/login");
      alert('Acoount created, now log in');
    }
  };

  const handleVisit = () => {
    if(sessionStorage.getItem('user') === null){
      window.location.replace('http://localhost:3000/login');
    }
    else if(sessionStorage.getItem('user') == ''){
      window.location.replace('http://localhost:3000/login');
    }
    else{
      setMessage("Welcome "+ sessionStorage.getItem('user'));
    }
  }

  const handleLogout = () => {
    sessionStorage.setItem('user', '');
    window.location.replace('http://localhost:3000/login');
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element= { <Navigate to="/login" /> } />
        <Route path="/login" element= { <Login onLogin={handleLogin} message={message}/> } />
        <Route path="/register" element= { <Register onRegister={handleRegister} message={message}/> } />
        <Route path="/home" element= { <Home checkIfLoggedIn={handleVisit} onLogout={handleLogout}message={message}/> } />
      </Routes>
    </Router>
  );
};

export default App;
