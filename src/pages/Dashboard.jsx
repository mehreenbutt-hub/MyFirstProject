import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from '../config';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [editMode, setEditMode] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [profileData, setProfileData] = useState({
    experience: user?.experience || "",
    hourlyRate: user?.hourlyRate || "",
    subject: user?.subject || ""
  });

  useEffect(() => {
    if (!user) navigate("/login");
    // ✅ Admin yahan nahi aayega — admin-dashboard pe jayega
    if (user?.role === 'admin') navigate("/admin-dashboard");
  }, [user, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = user?.id || user?._id;
        const role = user?.role;
        const res = await axios.get(`${API_URL}/api/auth/bookings?userId=${userId}&role=${role}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Bookings fetch error:", err);
      } finally {
        setLoadingBookings(false);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(`${API_URL}/api/auth/update/${user.id || user._id}`, profileData);
      if (res.status === 200) {
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        Swal.fire({ title: 'Success!', text: 'Profile updated.', icon: 'success', timer: 1500 });
        setEditMode(false);
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error!', text: 'Update failed.' });
    }
  };

  const handleBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`${API_URL}/api/auth/bookings/update/${bookingId}`, { status });
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, status } : b));
      Swal.fire({ icon: 'success', title: `Booking ${status}!`, timer: 1500 });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error!', text: 'Could not update status.' });
    }
  };

  if (!user) return null;

  const isTeacher = user.role?.toLowerCase() === 'teacher' || user.role?.toLowerCase() === 'tutor';
  const isStudent = user.role?.toLowerCase() === 'student';

  const getStatusColor = (status) => {
    if (status === 'approved') return '#27ae60';
    if (status === 'rejected') return '#e74c3c';
    return '#f39c12';
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh', width: '100%' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '25px' }}>Welcome, {user.name}! 👋</h2>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4 style={{ margin: 0, color: '#34495e' }}>Profile Details</h4>
          {isTeacher && (
            <button onClick={() => setEditMode(!editMode)} style={editBtnStyle}>
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          )}
        </div>
        {isTeacher && (
          editMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input style={inputStyle} value={profileData.subject} onChange={(e) => setProfileData({ ...profileData, subject: e.target.value })} placeholder="Subject" />
              <input type="number" style={inputStyle} value={profileData.experience} onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })} placeholder="Experience (Years)" />
              <input type="number" style={inputStyle} value={profileData.hourlyRate} onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })} placeholder="Hourly Rate ($)" />
              <button onClick={handleUpdateProfile} style={saveBtnStyle}>Save Changes</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
              <div style={infoBox}><strong>Subject:</strong><br />{user.subject || "Not set"}</div>
              <div style={infoBox}><strong>Experience:</strong><br />{user.experience || "0"} Years</div>
              <div style={infoBox}><strong>Rate:</strong><br />${user.hourlyRate || "0"}/hr</div>
            </div>
          )
        )}
        {isStudent && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
            <div style={infoBox}><strong>Name:</strong><br />{user.name}</div>
            <div style={infoBox}><strong>Email:</strong><br />{user.email}</div>
            <div style={infoBox}><strong>Role:</strong><br />Student</div>
          </div>
        )}
      </div>
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', display: 'inline-block', paddingBottom: '5px', marginBottom: '20px' }}>
          {isTeacher ? "Booking Requests" : "My Bookings"}
        </h3>
        <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {loadingBookings ? (
            <p style={{ textAlign: 'center', color: '#95a5a6' }}>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#95a5a6' }}>
              {isTeacher ? "No booking requests yet." : "You have not booked any tutor yet."}
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    {isTeacher && <th style={thStyle}>Student</th>}
                    {isStudent && <th style={thStyle}>Teacher</th>}
                    <th style={thStyle}>Subject</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Time</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Chat</th>
                    {isTeacher && <th style={thStyle}>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} style={{ borderBottom: '1px solid #eee' }}>
                      {isTeacher && <td style={tdStyle}>{booking.studentId?.name || 'N/A'}</td>}
                      {isStudent && <td style={tdStyle}>{booking.teacherId?.name || 'N/A'}</td>}
                      <td style={tdStyle}>{booking.subject}</td>
                      <td style={tdStyle}>{booking.date}</td>
                      <td style={tdStyle}>{booking.time}</td>
                      <td style={tdStyle}>{booking.message || '-'}</td>
                      <td style={tdStyle}>
                        <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', backgroundColor: getStatusColor(booking.status) + '22', color: getStatusColor(booking.status) }}>
                          {booking.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <button onClick={() => navigate(`/chat/${isTeacher ? booking.studentId?._id : booking.teacherId?._id}`)}
                          style={{ padding: '5px 12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                          Chat
                        </button>
                      </td>
                      {isTeacher && (
                        <td style={tdStyle}>
                          {booking.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => handleBookingStatus(booking._id, 'approved')} style={{ padding: '5px 10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Approve</button>
                              <button onClick={() => handleBookingStatus(booking._id, 'rejected')} style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Reject</button>
                            </div>
                          )}
                          {booking.status !== 'pending' && <span style={{ color: '#95a5a6', fontSize: '13px' }}>Done</span>}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const infoBox = { padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #eee' };
const cardStyle = { background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' };
const editBtnStyle = { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const saveBtnStyle = { backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const thStyle = { padding: '12px 15px', textAlign: 'left', fontWeight: '600' };
const tdStyle = { padding: '12px 15px', color: '#2c3e50', fontSize: '14px' };

export default Dashboard;