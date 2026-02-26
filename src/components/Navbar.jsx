import { Link } from 'react-router-dom';

const Navbar = ({ search, setSearch }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 50px', background: '#fff', alignItems: 'center', boxShadow: '0 2px 15px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000, width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}><h2 style={{ margin: 0, color: '#3498db', fontWeight: '800' }}>TutorHub</h2></Link>
        <input 
          type="text" 
          placeholder="Search tutors..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ padding: '10px 18px', borderRadius: '25px', border: '1px solid #eee', width: '220px', outline: 'none', backgroundColor: '#f9f9f9' }} 
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>Home</Link>
        <Link to="/login" style={{ textDecoration: 'none' }}><button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Log In</button></Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}><button style={{ padding: '10px 25px', borderRadius: '30px', border: 'none', backgroundColor: '#2c3e50', color: 'white', cursor: 'pointer' }}>Sign Up</button></Link>
      </div>
    </nav>
  );
};
export default Navbar;