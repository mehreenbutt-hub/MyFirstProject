const Loader = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      minHeight: '60vh', gap: '15px'
    }}>
      <div style={{
        width: '50px', height: '50px', borderRadius: '50%',
        border: '5px solid #f0f0f0',
        borderTop: '5px solid #3498db',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: '#95a5a6', fontSize: '16px' }}>Loading...</p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loader;