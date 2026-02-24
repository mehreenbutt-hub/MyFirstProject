import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple Validation
    if (!email || !password) {
      setError('Please fill in all fields');
    } else if (!email.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
      alert('Login Successful! (Abhi humne backend nahi jora)');
    }
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '80vh', backgroundColor: '#f4f7f6' 
    }}>
      <div style={{ 
        background: 'white', padding: '40px', borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>Welcome Back</h2>
        
        {error && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle} 
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle} 
              placeholder="Enter password"
            />
          </div>

          <button type="submit" style={{ 
            width: '100%', padding: '12px', background: '#3498db', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none'
};

export default Login;