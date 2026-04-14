import React from 'react';
import { Link } from 'react-router-dom';

const colors = [
  { bg: '#E6F1FB', color: '#0C447C', btn: '#185FA5' },
  { bg: '#E1F5EE', color: '#085041', btn: '#0F6E56' },
  { bg: '#FAEEDA', color: '#633806', btn: '#854F0B' },
  { bg: '#FBEAF0', color: '#72243E', btn: '#993556' },
  { bg: '#EEEDFE', color: '#3C3489', btn: '#534AB7' },
];

const TutorCard = ({ _id, name, subject, experience, price, image, index = 0 }) => {
  const scheme = colors[index % colors.length];
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Tutor')}&background=random&color=fff&size=128`;
  const stars = Math.min(5, Math.max(1, Math.round((experience || 0) / 2) + 3));
  const starDisplay = '★'.repeat(stars) + '☆'.repeat(5 - stars);

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: '1px solid #dce3eb',
      padding: '28px 22px',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)';
      }}
    >
      {/* Avatar */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
        <img
          src={image && image !== "" && image !== "https://via.placeholder.com/150" ? image : avatarUrl}
          alt={name}
          style={{
            width: '90px', height: '90px', borderRadius: '50%',
            objectFit: 'cover',
            border: `3px solid ${scheme.btn}`,
            padding: '2px',
          }}
        />
        <div style={{
          position: 'absolute', bottom: '4px', right: '4px',
          width: '14px', height: '14px', borderRadius: '50%',
          background: '#2ecc71', border: '2px solid white'
        }} />
      </div>

      {/* Subject Badge */}
      <div style={{
        display: 'inline-block', fontSize: '12px', fontWeight: '600',
        padding: '5px 14px', borderRadius: '20px', marginBottom: '12px',
        background: scheme.bg, color: scheme.color,
        letterSpacing: '0.5px'
      }}>
        {subject || "General Subject"}
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: '18px', fontWeight: '700',
        color: '#2c3e50', margin: '0 0 4px'
      }}>
        {name || "Anonymous Tutor"}
      </h3>

      <p style={{ fontSize: '13px', color: '#95a5a6', margin: '0 0 16px' }}>
        Professional Tutor
      </p>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '0 0 16px' }} />

      {/* Stars + Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
        <div>
          <div style={{ color: '#f39c12', fontSize: '14px', marginBottom: '4px' }}>{starDisplay}</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#2c3e50' }}>{experience || "0"} Yrs</div>
          <div style={{ fontSize: '12px', color: '#95a5a6' }}>Experience</div>
        </div>
        <div style={{ width: '1px', background: '#f0f0f0' }} />
        <div>
          <div style={{ fontSize: '14px', color: '#95a5a6', marginBottom: '4px' }}>Per Hour</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: scheme.btn }}>${price || "1000"}</div>
          <div style={{ fontSize: '12px', color: '#95a5a6' }}>Rate</div>
        </div>
      </div>

      {/* Button */}
      <Link to={`/tutor/${_id}`} style={{
        display: 'block', background: scheme.btn,
        color: 'white', textDecoration: 'none',
        padding: '12px', borderRadius: '10px',
        fontSize: '14px', fontWeight: '600',
        letterSpacing: '0.5px',
        transition: 'opacity 0.2s'
      }}>
        View Profile →
      </Link>
    </div>
  );
};

export default TutorCard;