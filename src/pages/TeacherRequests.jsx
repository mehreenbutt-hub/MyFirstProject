import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TutorCard from '../components/TutorCard';
import API_URL from '../config';

const TeacherRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/users`);
        const allUsers = Array.isArray(res.data) ? res.data : (res.data.users || []);
        const teachersOnly = allUsers.filter(u => {
          const role = u.role ? u.role.toLowerCase() : '';
          return role === 'teacher' || role === 'tutor';
        });
        setData(teachersOnly);
      } catch (err) {
        console.error("Data error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><h3>Loading Tutors...</h3></div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', padding: '10px' }}>
      {data.length === 0 ? (
        <div style={{ textAlign: 'center', width: '100%', padding: '50px' }}>
          <p>No tutors available at the moment.</p>
        </div>
      ) : (
        data.map((item, index) => (
          <TutorCard key={item._id} {...item} price={item.hourlyRate || "1000"} index={index} />
        ))
      )}
    </div>
  );
};

export default TeacherRequests;