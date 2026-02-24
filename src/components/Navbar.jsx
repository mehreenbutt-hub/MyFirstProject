import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px 50px', 
      background: '#ffffff', 
      alignItems: 'center',
      boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%', 
      boxSizing: 'border-box'
    }}>
      {/* Left Side: Logo & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ margin: 0, color: '#3498db', fontWeight: '800', fontSize: '1.6rem' }}>
          Tutor<span style={{color: '#2c3e50'}}>Hub</span>
        </h2>
        <input 
          type="text" 
          placeholder="Search tutors..." 
          style={{
            padding: '10px 18px', borderRadius: '25px', border: '1px solid #eee', 
            width: '220px', outline: 'none', backgroundColor: '#f9f9f9'
          }} 
        />
      </div>

      {/* Right Side: Links & Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
        <Link to="#" style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Courses</Link>
        
        {/* Login Link */}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'none', border: 'none', color: '#2c3e50', fontWeight: '600', cursor: 'pointer' }}>
            Log In
          </button>
        </Link>

        {/* Signup Link (Abhi humne page nahi banaya, isliye ye bhi login par le jayega) */}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{ 
            padding: '10px 25px', borderRadius: '30px', border: 'none', 
            backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', cursor: 'pointer'
          }}>
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;