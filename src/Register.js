import React, { useState } from 'react';

const Register = ({ onRegister, message }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    onRegister(username, password);
  };

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      <br />
      <a>{message}</a>
      <br />
      <a href='http://localhost:3000/login'>login</a>
    </div>
  );
};

export default Register;