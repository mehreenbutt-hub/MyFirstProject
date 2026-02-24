const TutorCard = ({ name, subject, price, rating, image }) => {
  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '20px', padding: '30px',
      textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease'
    }}>
      <img src={image} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '5px solid #f0f2f5', marginBottom: '15px' }} />
      <h3 style={{ margin: '10px 0', color: '#2c3e50' }}>{name}</h3>
      <span style={{ backgroundColor: '#e8f4fd', color: '#3498db', padding: '5px 15px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>{subject}</span>
      <div style={{ margin: '20px 0', fontSize: '1.4rem', fontWeight: 'bold', color: '#2c3e50' }}>${price}<small style={{fontSize:'0.8rem', color:'#7f8c8d'}}>/hr</small></div>
      <div style={{ color: '#f1c40f', marginBottom: '20px' }}>⭐ {rating}</div>
      <button style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>View Profile</button>
    </div>
  );
};
export default TutorCard;