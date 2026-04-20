import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import API_URL from '../config';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user'));
    const adminId = userData?.id;
    const adminRole = userData?.role;

    useEffect(() => {
        if (!userData || adminRole !== 'admin') {
            Swal.fire({ icon: 'error', title: 'Access Denied', text: 'You are not an Admin!', confirmButtonColor: '#e74c3c' });
            navigate('/login');
        }
    }, [adminRole, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const usersRes = await axios.get(`${API_URL}/api/auth/users`);
                setUsers(usersRes.data);
                const bookingsRes = await axios.get(`${API_URL}/api/auth/bookings?userId=admin&role=admin`);
                setBookings(bookingsRes.data);
            } catch (err) {
                console.error("Data load error:", err);
            } finally {
                setLoading(false);
            }
        };
        if (adminRole === 'admin') fetchData();
    }, [adminRole]);

    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#95a5a6',
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/api/auth/delete/${id}`);
                    setUsers(users.filter(user => user._id !== id));
                    Swal.fire('Deleted!', 'User has been deleted successfully.', 'success');
                } catch (err) {
                    Swal.fire('Error!', 'User could not be deleted.', 'error');
                }
            }
        });
    };

    const deleteBooking = async (id) => {
        Swal.fire({
            title: 'Delete Booking?',
            text: "This booking will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#95a5a6',
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/api/auth/bookings/delete/${id}`);
                    setBookings(bookings.filter(b => b._id !== id));
                    Swal.fire('Deleted!', 'Booking has been deleted successfully.', 'success');
                } catch (err) {
                    Swal.fire('Error!', 'Booking could not be deleted.', 'error');
                }
            }
        });
    };

    const updateBookingStatus = async (id, status) => {
        try {
            await axios.put(`${API_URL}/api/auth/bookings/update/${id}`, { status });
            setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
            const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true });
            Toast.fire({ icon: 'success', title: `Booking ${status} successfully!` });
        } catch (err) {
            Swal.fire('Failed!', 'Status could not be updated.', 'error');
        }
    };

    const getRoleBadge = (role) => {
        const colors = { teacher: { bg: '#e1f5fe', color: '#0288d1' }, student: { bg: '#f3e5f5', color: '#7b1fa2' }, admin: { bg: '#e8f5e9', color: '#2e7d32' } };
        const style = colors[role] || { bg: '#f5f5f5', color: '#333' };
        return <span style={{ padding: '4px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', backgroundColor: style.bg, color: style.color }}>{role?.toUpperCase()}</span>;
    };

    if (loading) return <Loader />;

    return (
        <div style={{ padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
            <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '10px' }}>Admin Control Panel</h1>
            <p style={{ textAlign: 'center', color: '#95a5a6', marginBottom: '30px' }}>Manage users and bookings</p>
            <hr style={{ marginBottom: '30px', opacity: 0.2 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={statCard}><h2 style={{ margin: 0, color: '#3498db' }}>{users.length}</h2><p style={{ margin: 0, color: '#95a5a6', fontSize: '14px' }}>Total Users</p></div>
                <div style={statCard}><h2 style={{ margin: 0, color: '#2ecc71' }}>{users.filter(u => u.role === 'teacher').length}</h2><p style={{ margin: 0, color: '#95a5a6', fontSize: '14px' }}>Teachers</p></div>
                <div style={statCard}><h2 style={{ margin: 0, color: '#9b59b6' }}>{users.filter(u => u.role === 'student').length}</h2><p style={{ margin: 0, color: '#95a5a6', fontSize: '14px' }}>Students</p></div>
                <div style={statCard}><h2 style={{ margin: 0, color: '#e67e22' }}>{bookings.length}</h2><p style={{ margin: 0, color: '#95a5a6', fontSize: '14px' }}>Total Bookings</p></div>
            </div>

            {/* Users Table */}
            <div style={tableCard}>
                <h3 style={{ borderLeft: '5px solid #3498db', paddingLeft: '10px', marginBottom: '20px' }}>Registered Users ({users.length})</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#2c3e50', color: 'white', textAlign: 'left' }}>
                                <th style={th}>Name</th><th style={th}>Email</th><th style={th}>Role</th><th style={th}>Experience</th><th style={th}>Rate ($)</th><th style={th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={td}><strong>{user.name}</strong></td>
                                    <td style={td}>{user.email}</td>
                                    <td style={td}>{getRoleBadge(user.role)}</td>
                                    <td style={td}>{user.role === 'teacher' ? (user.experience || "0") + " Years" : "-"}</td>
                                    <td style={{ ...td, color: '#2ecc71', fontWeight: 'bold' }}>{user.role === 'teacher' ? "$" + (user.hourlyRate || "0") : "-"}</td>
                                    <td style={td}>{user._id !== adminId && (<button onClick={() => deleteUser(user._id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bookings Table */}
            <div style={{ ...tableCard, marginTop: '30px' }}>
                <h3 style={{ borderLeft: '5px solid #2ecc71', paddingLeft: '10px', marginBottom: '20px' }}>All Booking Requests ({bookings.length})</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#27ae60', color: 'white', textAlign: 'left' }}>
                                <th style={th}>Student</th><th style={th}>Teacher</th><th style={th}>Subject</th><th style={th}>Date</th><th style={th}>Status</th><th style={th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#95a5a6' }}>No bookings yet.</td></tr>
                            ) : (
                                bookings.map(book => (
                                    <tr key={book._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={td}>{book.studentId?.name || 'N/A'}</td>
                                        <td style={td}>{book.teacherId?.name || 'N/A'}</td>
                                        <td style={td}>{book.subject || '-'}</td>
                                        <td style={td}>{book.date || '-'}</td>
                                        <td style={td}>
                                            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', backgroundColor: book.status === 'approved' ? '#e8f5e9' : book.status === 'rejected' ? '#ffebee' : '#fff3e0', color: book.status === 'approved' ? '#27ae60' : book.status === 'rejected' ? '#e74c3c' : '#e67e22' }}>
                                                {book.status?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={td}>
                                            <button onClick={() => updateBookingStatus(book._id, 'approved')} style={{ marginRight: '5px', backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Approve</button>
                                            <button onClick={() => updateBookingStatus(book._id, 'rejected')} style={{ marginRight: '5px', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Reject</button>
                                            <button onClick={() => deleteBooking(book._id)} style={{ backgroundColor: '#7f8c8d', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const statCard = { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' };
const tableCard = { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const th = { padding: '12px 15px', fontWeight: '600' };
const td = { padding: '12px 15px', fontSize: '14px', color: '#2c3e50' };

export default AdminDashboard;