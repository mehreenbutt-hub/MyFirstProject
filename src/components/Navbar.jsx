import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2c3e50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          navigate("/signup");
        }, 1500);
      }
    });
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ margin: 0, color: '#3498db', fontWeight: '800', letterSpacing: '-1px' }}>TutorHub</h2>
        </Link>
        <input
          type="text"
          placeholder="Search tutors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={linkStyle}>Home</Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={userInfoStyle} onClick={() => navigate('/dashboard')} title="Go to Dashboard">
              <div style={avatarStyle}>{user.name.charAt(0).toUpperCase()}</div>
              <span style={{ fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>Hi, {user.name.split(' ')[0]}!</span>
            </div>
            <button onClick={handleLogout} style={logoutBtnStyle}>Log Out</button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={loginBtnStyle}>Log In</button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button style={signupBtnStyle}>Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const navStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px 50px', background: '#ffffff', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 1000, width: '100%', boxSizing: 'border-box' };
const searchInputStyle = { padding: '10px 20px', borderRadius: '25px', border: '1px solid #e0e0e0', width: '250px', outline: 'none', backgroundColor: '#f8f9fa', fontSize: '14px', transition: '0.3s' };
const linkStyle = { color: '#546e7a', textDecoration: 'none', fontWeight: '500', fontSize: '15px' };
const userInfoStyle = { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px 10px', borderRadius: '20px', transition: '0.2s', backgroundColor: '#f0f4f8' };
const avatarStyle = { width: '32px', height: '32px', backgroundColor: '#3498db', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px' };
const logoutBtnStyle = { padding: '8px 20px', borderRadius: '20px', border: '1px solid #e74c3c', backgroundColor: 'transparent', color: '#e74c3c', fontWeight: '600', cursor: 'pointer', fontSize: '13px', transition: '0.3s' };
const loginBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', color: '#2c3e50', fontWeight: '600', fontSize: '15px' };
const signupBtnStyle = { padding: '10px 25px', borderRadius: '25px', border: 'none', backgroundColor: '#2c3e50', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(44, 62, 80, 0.2)' };

export default Navbar;