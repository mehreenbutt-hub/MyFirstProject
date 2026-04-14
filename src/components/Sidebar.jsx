import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#2c3e50',
      color: 'white',
      height: '100vh',
      position: 'sticky',
      top: 0,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#3498db' }}>Dashboard</h3>
      
      <ul style={{ listStyle: 'none', padding: 0, flex: 1 }}>
        <li style={{ padding: '15px 0', borderBottom: '1px solid #34495e' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Home</Link>
        </li>
        <li style={{ padding: '15px 0', borderBottom: '1px solid #34495e' }}>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>👤 My Profile</Link>
        </li>
      </ul>

      
    </div>
  );
};

export default Sidebar;