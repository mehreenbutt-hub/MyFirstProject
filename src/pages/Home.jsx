import { useState, useEffect } from 'react';
import axios from 'axios';
import TutorCard from '../components/TutorCard';
import Loader from '../components/Loader';
import API_URL from '../config';

const Home = ({ search = "" }) => {
  const [tutors, setTutors] = useState([]); 
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/auth/users`);
        const allUsers = Array.isArray(res.data) ? res.data : (res.data.users || []);
        const teachersOnly = allUsers.filter(user => {
          const role = user.role ? user.role.toLowerCase() : '';
          return role === 'teacher' || role === 'tutor';
        });
        setTutors(teachersOnly);
        setLoading(false);
      } catch (err) {
        console.error("Backend error:", err);
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter(tutor => {
    const matchesSubject = selectedSubject === 'All' || 
      (tutor.subject && tutor.subject.toLowerCase() === selectedSubject.toLowerCase());
    const matchesSearch = (tutor.name || "").toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
      <div style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)', color: 'white', borderRadius: '0 0 50px 50px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', margin: 0 }}>Find Your Perfect Tutor</h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>Connect with world-class tutors and start your learning journey today.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px', flexWrap: 'wrap', padding: '0 20px' }}>
        {['All', 'Mathematics', 'Physics', 'English', 'Computer Science'].map(sub => (
          <button key={sub} onClick={() => setSelectedSubject(sub)}
            style={{ padding: '12px 25px', borderRadius: '30px', border: 'none', backgroundColor: selectedSubject === sub ? '#3498db' : '#fff', color: selectedSubject === sub ? 'white' : '#2c3e50', cursor: 'pointer', fontWeight: '600', transition: '0.3s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {sub}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {loading ? (
          <div style={{ gridColumn: '1/-1' }}><Loader /></div>
        ) : filteredTutors.length > 0 ? (
          filteredTutors.map((tutor, index) => (
            <TutorCard key={tutor._id} {...tutor} price={tutor.hourlyRate || "1000"} index={index} />
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
            <h3 style={{ color: '#2c3e50' }}>No Tutors Found.</h3>
            <p style={{ color: '#95a5a6' }}>No tutor found, please check the subject filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;