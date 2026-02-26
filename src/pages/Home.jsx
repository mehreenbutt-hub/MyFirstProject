import { useState } from 'react';
import TutorCard from '../components/TutorCard';

const Home = ({ search = "" }) => { // Default empty string agar search na mile
  const [selectedSubject, setSelectedSubject] = useState('All');

  const tutors = [
    { id: 1, name: "Dr. Ahmed", subject: "Mathematics", price: "25", rating: "4.9", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Sara Khan", subject: "Physics", price: "20", rating: "4.8", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "John Doe", subject: "English", price: "15", rating: "4.7", image: "https://randomuser.me/api/portraits/men/46.jpg" },
    { id: 4, name: "Zainab Ali", subject: "Computer Science", price: "30", rating: "5.0", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 5, name: "Ali Raza", subject: "Mathematics", price: "22", rating: "4.6", image: "https://randomuser.me/api/portraits/men/62.jpg" },
    { id: 6, name: "Ayesha Omer", subject: "English", price: "18", rating: "4.9", image: "https://randomuser.me/api/portraits/women/17.jpg" }
  ];

  // Search aur Subject dono ko ek sath filter karne ki logic
  const filteredTutors = tutors.filter(tutor => {
    const matchesSubject = selectedSubject === 'All' || tutor.subject === selectedSubject;
    const matchesSearch = tutor.name.toLowerCase().includes(search.toLowerCase()) || 
                          tutor.subject.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
      {/* Hero Section (Wahi purana gradient design) */}
      <div style={{ 
        textAlign: 'center', padding: '80px 20px', 
        background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)', 
        color: 'white', borderRadius: '0 0 50px 50px', marginBottom: '40px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: '800' }}>Find Your Perfect Tutor</h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
          Connect with world-class tutors and start your learning journey today.
        </p>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px', flexWrap: 'wrap', padding: '0 20px' }}>
        {['All', 'Mathematics', 'Physics', 'English', 'Computer Science'].map(sub => (
          <button 
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            style={{
              padding: '12px 25px', borderRadius: '30px', border: 'none',
              backgroundColor: selectedSubject === sub ? '#3498db' : '#fff',
              color: selectedSubject === sub ? 'white' : '#2c3e50',
              cursor: 'pointer', fontWeight: '600', transition: '0.3s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' 
      }}>
        {filteredTutors.length > 0 ? (
          filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} {...tutor} />
          ))
        ) : (
          <h3 style={{ textAlign: 'center', gridColumn: '1/-1', color: '#7f8c8d' }}>
            No tutors found for "{search}"
          </h3>
        )}
      </div>
    </div>
  );
};

export default Home;