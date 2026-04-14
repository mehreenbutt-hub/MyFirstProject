import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import API_URL from '../config';

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/users`);
        const allUsers = Array.isArray(res.data) ? res.data : (res.data.users || []);
        const found = allUsers.find(t => t._id === id);
        setTeacher(found);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      Swal.fire('Login Required', 'Please login first to book a tutor!', 'warning');
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/auth/book-teacher`, {
        studentId: user.id || user._id, teacherId: id,
        subject: teacher.subject || "General Tuition",
        date: new Date().toLocaleDateString(), time: "10:00 AM",
        message: `Booking request for ${teacher.name}`
      });
      Swal.fire({ icon: 'success', title: 'Sent!', text: res.data.message || "Booking request sent!", confirmButtonColor: '#00b894' });
    } catch (err) {
      Swal.fire('Error', (err.response?.data?.error || "Server issue"), 'error');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '20px' }}>Loading teacher details...</div>;
  if (!teacher) return <div style={{ textAlign: 'center', padding: '100px' }}>Teacher not found!</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '8px 15px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', cursor: 'pointer', fontWeight: 'bold' }}>
        ← Back to Tutors
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '30px', borderBottom: '2px solid #f1f2f6', paddingBottom: '30px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#00b894', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontWeight: 'bold' }}>
          {teacher.name?.charAt(0)}
        </div>
        <div>
          <h1 style={{ margin: '0', color: '#2d3436', fontSize: '32px' }}>{teacher.name}</h1>
          <p style={{ margin: '5px 0 0', color: '#0984e3', fontSize: '20px', fontWeight: '600' }}>{teacher.subject || "Expert Tutor"}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={infoBox}><span style={infoLabel}>EXPERIENCE</span><div style={infoValue}>{teacher.experience || "Not Listed"} Years</div></div>
        <div style={infoBox}><span style={infoLabel}>HOURLY RATE</span><div style={infoValue}>${teacher.hourlyRate || "15"}/hr</div></div>
        <div style={infoBox}><span style={infoLabel}>EMAIL ADDRESS</span><div style={infoValue}>{teacher.email}</div></div>
        <div style={infoBox}><span style={infoLabel}>STATUS</span><div style={infoValue}>Available</div></div>
      </div>
      <button onClick={handleBooking} style={{ width: '100%', padding: '18px', border: 'none', borderRadius: '15px', backgroundColor: '#00b894', color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
        Book Now with {teacher.name}
      </button>
    </div>
  );
};

const infoBox = { backgroundColor: '#fcfcfc', padding: '20px', borderRadius: '15px', border: '1px solid #f1f2f6' };
const infoLabel = { fontSize: '12px', color: '#b2bec3', letterSpacing: '1px', fontWeight: '800' };
const infoValue = { fontSize: '18px', color: '#2d3436', fontWeight: 'bold', marginTop: '5px' };

export default TeacherProfile;