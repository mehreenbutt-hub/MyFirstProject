import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TutorDetails from './pages/TutorDetails';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [search, setSearch] = useState(""); // Search state

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar ko search aur setSearch dono bhej rahe hain */}
        <Navbar search={search} setSearch={setSearch} />
        
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Home ko search bhej rahe hain filter karne ke liye */}
            <Route path="/" element={<Home search={search} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tutor/:id" element={<TutorDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;