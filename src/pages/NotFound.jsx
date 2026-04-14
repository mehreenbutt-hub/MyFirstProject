import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '20px'
    }}>
      <h1 style={{ fontSize: '8rem', fontWeight: '800', color: '#3498db', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '2rem', color: '#2c3e50', margin: '10px 0' }}>Page Not Found!</h2>
      <p style={{ color: '#95a5a6', fontSize: '16px', marginBottom: '30px' }}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" style={{
        padding: '12px 30px', background: '#2c3e50', color: 'white',
        borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px'
      }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;