import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Validation Logic
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields!');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
    } else if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
    } else {
      setError('');
      alert('Account Created Successfully!');
      // Yahan hum baad mein backend connect karenge
    }
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '80vh', backgroundColor: '#f4f7f6', padding: '20px' 
    }}>
      <div style={{ 
        background: 'white', padding: '40px', borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Join TutorHub</h2>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>Create an account to start learning</p>
        
        {error && <p style={{ color: '#e74c3c', textAlign: 'center', backgroundColor: '#fdeaea', padding: '10px', borderRadius: '5px' }}>{error}</p>}

        <form onSubmit={handleSignup}>
          <input 
            type="text" placeholder="Full Name" style={inputStyle} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="email" placeholder="Email Address" style={inputStyle} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            type="password" placeholder="Password" style={inputStyle} 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <input 
            type="password" placeholder="Confirm Password" style={inputStyle} 
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
          />
          
          <button type="submit" style={{ 
            width: '100%', padding: '12px', background: '#2c3e50', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' 
          }}>
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#7f8c8d' }}>
          Already have an account? <Link to="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box'
};

export default Signup;