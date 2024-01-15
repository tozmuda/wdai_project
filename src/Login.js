import React, { useState } from 'react';
import './css/Login.css';

const Login = ({ onLogin, message }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
            <br />
            <a>{message}</a>
            <br />
            <a href='http://localhost:3000/register'>Register</a>
        </div>
    );
};

export default Login;
