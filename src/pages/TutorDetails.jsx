import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from '../config';

const TutorDetails = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/users`);
        const allUsers = Array.isArray(res.data) ? res.data : (res.data.users || []);
        const found = allUsers.find(t => t._id === id);
        setTutor(found);
        if (found) setSubject(found.subject || "General Tuition");
      } catch (err) {
        console.error("Error fetching tutor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  const handleBooking = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) { Swal.fire({ icon: 'warning', title: 'Login Required', text: 'Please login first!' }); return; }
    if (!subject.trim()) { Swal.fire({ icon: 'warning', title: 'Subject Missing', text: 'Please enter a subject!' }); return; }
    if (!bookingDate) { Swal.fire({ icon: 'warning', title: 'Date Missing', text: 'Please select a date!' }); return; }
    if (!bookingTime) { Swal.fire({ icon: 'warning', title: 'Time Missing', text: 'Please select a time!' }); return; }

    try {
      const response = await axios.post(`${API_URL}/api/auth/book-teacher`, {
        studentId: currentUser.id || currentUser._id,
        teacherId: id, subject, date: bookingDate, time: bookingTime,
        message: message || "Trial session request"
      });
      if (response.status === 201 || response.status === 200) {
        setBookingDone(true);
        setTimeout(() => { setShowModal(false); setBookingDone(false); }, 3000);
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.error || "Server issue" });
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><h3>Loading info...</h3></div>;
  if (!tutor) return <div style={{ textAlign: 'center', padding: '100px' }}><h2>Tutor not found!</h2></div>;

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ fontWeight: 'bold', color: '#3498db' }}>← Back</Link>
      <div style={{ display: 'flex', gap: '30px', marginTop: '20px', background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1 }}>
          <span style={{ background: '#e8f4fd', color: '#3498db', padding: '5px 10px', borderRadius: '10px' }}>{tutor.subject}</span>
          <h1 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{tutor.name}</h1>
          <p style={{ color: '#7f8c8d' }}>Experience: {tutor.experience} years</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rs. {tutor.hourlyRate} / hr</p>
          <button onClick={() => setShowModal(true)} style={{ marginTop: '20px', padding: '15px 30px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            Book a Free Trial
          </button>
        </div>
      </div>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', width: '430px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            {!bookingDone ? (
              <>
                <h2 style={{ marginBottom: '5px', color: '#2c3e50' }}>Schedule Trial</h2>
                <p style={{ color: '#95a5a6', fontSize: '14px', marginBottom: '20px' }}>Book a session with {tutor.name}</p>
                <input type="text" placeholder="Subject (e.g. Mathematics)" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} />
                <input type="date" style={inputStyle} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                <input type="time" style={inputStyle} value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} />
                <textarea placeholder="Any special message or question... (Optional)" value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, height: '80px', resize: 'none' }} />
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button onClick={handleBooking} style={{ flex: 2, padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>Confirm Booking</button>
                  <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                </div>
              </>
            ) : (
              <div style={{ padding: '20px' }}>
                <h2 style={{ color: '#27ae60' }}>Booking Sent!</h2>
                <p style={{ color: '#7f8c8d' }}>Your booking request has been sent to {tutor.name}!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = { width: '100%', padding: '11px', margin: '7px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' };
export default TutorDetails;