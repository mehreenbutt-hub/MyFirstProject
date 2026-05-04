import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Back Button */}
      <Link to="/" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>← Back to Home</Link>

      {/* Blog Header */}
      <div style={{ marginTop: '30px', marginBottom: '40px' }}>
        <span style={{ backgroundColor: '#e8f4fd', color: '#3498db', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Online Tutoring</span>
        <h1 style={{ fontSize: '2.2rem', color: '#2c3e50', marginTop: '15px', marginBottom: '10px', lineHeight: '1.3' }}>
          TutorHub — Find Your Perfect Tutor Online
        </h1>
        <p style={{ color: '#95a5a6', fontSize: '14px' }}>By TutorHub Team &nbsp;|&nbsp; May 2026 &nbsp;|&nbsp; 4 min read</p>
        <hr style={{ marginTop: '20px', opacity: 0.15 }} />
      </div>

      {/* Blog Content */}
      <div style={{ lineHeight: '1.9', color: '#2c3e50', fontSize: '16px' }}>

        {/* Intro - Hook */}
        <p>
          <strong>Finding the right tutor used to be hard. Not anymore.</strong> Think about it — you need help with Mathematics or Physics, but you don't know where to start. You ask around, scroll through random contacts, and still end up confused. That's exactly the problem <strong>TutorHub</strong> solves. TutorHub is an <strong>online tutor booking platform</strong> that connects students with professional tutors in just a few clicks — no hassle, no wasted time.
        </p>

        {/* What is TutorHub */}
        <h2 style={headingStyle}>What is TutorHub?</h2>
        <p>
          TutorHub is a smart and simple <strong>online tutoring platform</strong> designed for students who want to learn and teachers who want to teach. Whether you need help in <strong>Mathematics, Physics, English, or Computer Science</strong>, TutorHub has a professional tutor ready for you. Every tutor on the platform has a detailed profile showing their subject, experience in years, and hourly rate — so you know exactly who you are booking before you even click a button.
        </p>

        {/* How Does It Work */}
        <h2 style={headingStyle}>How Does It Work?</h2>
        <p>
          Using TutorHub is as easy as it gets. Students can browse through all available <strong>tutors online</strong> on the home page, filter them by subject, and view any tutor's full profile. When you find the right tutor, simply <strong>book a free trial session</strong> by selecting your preferred date and time. The tutor receives your booking request and can approve or reject it directly from their dashboard. Once approved, you can even <strong>chat with your tutor</strong> directly on the platform — no need for WhatsApp or any third-party app.
        </p>

        {/* Who Is It For */}
        <h2 style={headingStyle}>Who Is TutorHub For?</h2>
        <p>
          TutorHub is built for three types of users. First, <strong>students</strong> who are looking for the best online tutors to improve their grades and understanding. Second, <strong>teachers and professional tutors</strong> who want to reach more students and manage their bookings easily in one place. Third, <strong>admins</strong> who keep the platform running smoothly by managing all users and bookings from a powerful admin control panel.
        </p>

        {/* Why Choose TutorHub */}
        <h2 style={headingStyle}>Why Choose TutorHub?</h2>
        <p>
          There are plenty of reasons to choose TutorHub as your go-to <strong>online tutor booking platform</strong>. Every tutor profile is transparent — you can see their subject, years of experience, and hourly rate before booking. The booking system is smooth and real-time. The built-in <strong>chat feature</strong> means you can communicate with your tutor without leaving the platform. And the best part? You can start with a <strong>free trial session</strong> — zero risk, all reward.
        </p>

        {/* Conclusion */}
        <h2 style={headingStyle}>The Bottom Line</h2>
        <p>
          If you are a student struggling with a subject or a tutor looking to connect with more students, TutorHub is the platform for you. It is clean, simple, and built with one goal in mind — make <strong>online tutoring</strong> easy and accessible for everyone. So why wait?
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '15px 40px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(52,152,219,0.3)' }}>
              Find Your Tutor Now →
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

const headingStyle = { fontSize: '1.4rem', color: '#2c3e50', marginTop: '35px', marginBottom: '10px', fontWeight: '700', borderLeft: '4px solid #3498db', paddingLeft: '12px' };

export default Blog;