import { Link } from 'react-router-dom';

const TutorCard = ({ id, name, subject, price, rating, image }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
      <img src={image} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px' }} />
      <h3>{name}</h3>
      <span style={{ backgroundColor: '#e8f4fd', color: '#3498db', padding: '5px 15px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>{subject}</span>
      <div style={{ margin: '15px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>${price}/hr</div>
      <div style={{ color: '#f1c40f', marginBottom: '15px' }}>⭐ {rating}</div>
      
      {/* View Profile ko Link mein badal diya */}
      <Link to={`/tutor/${id}`}>
        <button style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default TutorCard;