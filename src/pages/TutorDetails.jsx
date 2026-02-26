import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const TutorDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  // Tutors Data
  const tutorsData = [
    { id: 1, name: "Dr. Ahmed", subject: "Mathematics", price: "25", rating: "4.9", image: "https://randomuser.me/api/portraits/men/32.jpg", bio: "Expert in Calculus and Algebra with 10 years of experience. I make complex math simple." },
    { id: 2, name: "Sara Khan", subject: "Physics", price: "20", rating: "4.8", image: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Specialized in Quantum Mechanics and High School Physics. Let's explore the universe together." },
    { id: 3, name: "John Doe", subject: "English", price: "15", rating: "4.7", image: "https://randomuser.me/api/portraits/men/46.jpg", bio: "Professional linguist focusing on literature and communication skills for all levels." },
    { id: 4, name: "Zainab Ali", subject: "Computer Science", price: "30", rating: "5.0", image: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Full-stack developer teaching Python, Java, and Web Development with real-world projects." },
    { id: 5, name: "Ali Raza", subject: "Mathematics", price: "22", rating: "4.6", image: "https://randomuser.me/api/portraits/men/62.jpg", bio: "Helping students master Geometry and Statistics with easy-to-follow techniques." },
    { id: 6, name: "Ayesha Omer", subject: "English", price: "18", rating: "4.9", image: "https://randomuser.me/api/portraits/women/17.jpg", bio: "IELTS and TOEFL expert with a passion for teaching spoken and written English." }
  ];

  const tutor = tutorsData.find(t => t.id === parseInt(id));

  if (!tutor) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Tutor not found!</h2>
        <Link to="/" style={{ color: '#3498db' }}>Go Back to Home</Link>
      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingDone(true);
    setTimeout(() => {
      setShowModal(false);
      setBookingDone(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '50px 20px', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
        ← Back to Search
      </Link>
      
      <div style={{ 
        display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap', 
        background: 'white', padding: '40px', borderRadius: '25px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)' 
      }}>
        {/* Tutor Image */}
        <div style={{ flex: '0 0 300px' }}>
          <img src={tutor.image} alt={tutor.name} style={{ width: '100%', height: '350px', borderRadius: '20px', objectFit: 'cover' }} />
        </div>
        
        {/* Tutor Info */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <span style={{ backgroundColor: '#e8f4fd', color: '#3498db', padding: '5px 15px', borderRadius: '15px', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {tutor.subject}
          </span>
          <h1 style={{ fontSize: '2.8rem', color: '#2c3e50', margin: '15px 0 10px 0' }}>{tutor.name}</h1>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '20px' }}>
            ${tutor.price} <span style={{ fontSize: '1rem', color: '#7f8c8d', fontWeight: 'normal' }}>/ hour</span>
            <span style={{ marginLeft: '20px', color: '#f1c40f' }}>⭐ {tutor.rating}</span>
          </div>
          
          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>About Me</h3>
            <p style={{ lineHeight: '1.8', color: '#7f8c8d', fontSize: '1.1rem' }}>{tutor.bio}</p>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            style={{ 
              marginTop: '30px', padding: '18px 45px', background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', 
              color: 'white', border: 'none', borderRadius: '12px', 
              fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', transition: '0.3s',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
            }}
          >
            Book a Free Trial Session
          </button>
        </div>
      </div>

      {/* --- Booking Modal Popup --- */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            {!bookingDone ? (
              <>
                <h2 style={{ color: '#2c3e50' }}>Schedule Trial Class</h2>
                <p style={{ color: '#7f8c8d' }}>Choose your preferred date and time for a 30-min trial with <b>{tutor.name}</b>.</p>
                <form onSubmit={handleBooking} style={{ marginTop: '20px' }}>
                  <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Date:</label>
                    <input type="date" required style={inputStyle} />
                  </div>
                  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Time:</label>
                    <input type="time" required style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={confirmBtnStyle}>Confirm Booking</button>
                    <button type="button" onClick={() => setShowModal(false)} style={cancelBtnStyle}>Cancel</button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '4rem', color: '#27ae60' }}>✅</div>
                <h2 style={{ color: '#2c3e50' }}>Booking Successful!</h2>
                <p style={{ color: '#7f8c8d' }}>A confirmation email has been sent to you.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Internal Styles
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(5px)' };
const modalContentStyle = { background: 'white', padding: '40px', borderRadius: '20px', width: '90%', maxWidth: '450px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
const confirmBtnStyle = { flex: 2, padding: '14px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const cancelBtnStyle = { flex: 1, padding: '14px', background: '#ecf0f1', color: '#2c3e50', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };

export default TutorDetails;