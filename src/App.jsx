import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TutorDetails from './pages/TutorDetails';
import TeacherProfile from './pages/TeacherProfile'; 
import Chat from './pages/Chat';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard'; 
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [search, setSearch] = useState(""); 

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Navbar */}
        <Navbar search={search} setSearch={setSearch} />
        
        {/* Main Layout: Sidebar + Content */}
        <div style={{ display: 'flex', flex: 1 }}>
          
          {/* Left Side: Sidebar */}
          <Sidebar />

          {/* Right Side: Main Pages Content */}
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f7f6' }}>
            <Routes>
              <Route path="/" element={<Home search={search} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tutor/:id" element={<TutorDetails />} />
              
              {/* 2. TEACHER PROFILE ROUTE ADD KIYA */}
              <Route path="/teacher-profile/:id" element={<TeacherProfile />} />
              <Route path="/chat/:receiverId" element={<Chat />} />

              {/* Dashboards */}
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/teacher-dashboard" element={<Dashboard />} />
              <Route path="/student-dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;