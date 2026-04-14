import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from '../config';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student', experience: '', hourlyRate: '', subject: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({ icon: 'error', title: 'Missing Fields', text: 'Please fill in all required fields!', confirmButtonColor: '#2c3e50' });
      return;
    } else if (formData.password !== formData.confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Passwords do not match!', confirmButtonColor: '#2c3e50' });
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, formData);
      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        Swal.fire({ icon: 'success', title: 'Account Created!', text: 'Welcome to TutorHub!', confirmButtonColor: '#2ecc71', timer: 1500, showConfirmButton: false })
        .then(() => { navigate('/dashboard'); });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: err.response?.data?.error || 'Something went wrong!', confirmButtonColor: '#e74c3c' });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Join TutorHub</h2>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email Address" style={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword ? "text" : "password"} placeholder="Password" style={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <span onClick={() => setShowPassword(!showPassword)} style={eyeIconStyle}>{showPassword ? '👁️' : '👁️‍🗨️'}</span>
          </div>
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" style={inputStyle} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={eyeIconStyle}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</span>
          </div>
          <div style={{ margin: '10px 0' }}>
            <label style={labelStyle}>I want to join as:</label>
            <select style={inputStyle} value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="student">Student (I want to find a tutor)</option>
              <option value="teacher">Teacher (I want to teach students)</option>
            </select>
          </div>
          {formData.role === 'teacher' && (
            <div style={{ padding: '10px', backgroundColor: '#eef2f3', borderRadius: '8px', marginBottom: '10px' }}>
              <p style={{ fontSize: '12px', color: '#7f8c8d', margin: '0 0 10px 0' }}>Teacher Details:</p>
              <select style={inputStyle} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                <option value="">Select Your Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
              </select>
              <input type="number" placeholder="Years of Experience" style={inputStyle} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
              <input type="number" placeholder="Hourly Rate ($)" style={inputStyle} onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})} />
            </div>
          )}
          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#3498db', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', backgroundColor: '#f4f7f6', padding: '20px' };
const cardStyle = { background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const inputStyle = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' };
const labelStyle = { display: 'block', marginBottom: '5px', color: '#2c3e50', fontWeight: 'bold', fontSize: '14px' };
const eyeIconStyle = { position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '18px' };

export default Signup;