import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import API_URL from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please fill in all fields!', confirmButtonColor: '#3498db' });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      if (response.data && response.data.user) {
        const { user } = response.data;
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true });
        Toast.fire({ icon: 'success', title: `Welcome Back, ${user.name}! 🎉` });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id || user._id);
        localStorage.setItem("userRole", user.role);
        setTimeout(() => {
          if (user.role === 'admin') navigate("/admin-dashboard");
          else navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Login Failed', text: err.response?.data?.message || "Invalid Email or Password", confirmButtonColor: '#e74c3c' });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="Enter your email" />
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="Enter password" />
            <span onClick={() => setShowPassword(!showPassword)} style={eyeIconStyle}>{showPassword ? '👁️' : '👁️‍🗨️'}</span>
          </div>
          <button type="submit" style={{...buttonStyle, background: '#3498db'}}>Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#2c3e50', fontWeight: 'bold' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f4f7f6' };
const cardStyle = { background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '12px', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const eyeIconStyle = { position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '20px', userSelect: 'none' };

export default Login;