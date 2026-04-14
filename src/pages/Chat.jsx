import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

const Chat = () => {
  const { receiverId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiver, setReceiver] = useState(null);
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => { if (!user) navigate('/login'); }, []);

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/users`);
        const allUsers = Array.isArray(res.data) ? res.data : [];
        const found = allUsers.find(u => u._id === receiverId);
        setReceiver(found);
      } catch (err) { console.error(err); }
    };
    fetchReceiver();
  }, [receiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userId = user?.id || user?._id;
        const res = await axios.get(`${API_URL}/api/auth/messages/${userId}/${receiverId}`);
        setMessages(res.data);
      } catch (err) { console.error(err); }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [receiverId]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      const userId = user?.id || user?._id;
      await axios.post(`${API_URL}/api/auth/messages/send`, { senderId: userId, receiverId, message: newMessage });
      setNewMessage('');
      const res = await axios.get(`${API_URL}/api/auth/messages/${userId}/${receiverId}`);
      setMessages(res.data);
    } catch (err) { console.error(err); }
  };

  const userId = user?.id || user?._id;

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>
      <div style={{ background: '#2c3e50', padding: '15px 20px', borderRadius: '15px 15px 0 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>←</button>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
          {receiver?.name?.charAt(0) || '?'}
        </div>
        <div>
          <p style={{ margin: 0, color: 'white', fontWeight: 'bold', fontSize: '16px' }}>{receiver?.name || 'Loading...'}</p>
          <p style={{ margin: 0, color: '#95a5a6', fontSize: '12px' }}>{receiver?.role || ''}</p>
        </div>
      </div>
      <div style={{ background: '#f4f7f6', padding: '20px', height: '400px', overflowY: 'auto', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd' }}>
        {messages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#95a5a6', marginTop: '150px' }}>No messages yet. Say hello!</p>
        ) : (
          messages.map((msg) => {
            const isMine = msg.senderId === userId || msg.senderId?._id === userId;
            return (
              <div key={msg._id} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
                <div style={{ maxWidth: '65%', padding: '10px 15px', borderRadius: isMine ? '15px 15px 0 15px' : '15px 15px 15px 0', background: isMine ? '#2c3e50' : 'white', color: isMine ? 'white' : '#2c3e50', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <p style={{ margin: 0, fontSize: '14px' }}>{msg.message}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '10px', opacity: 0.7, textAlign: 'right' }}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ background: 'white', padding: '15px', borderRadius: '0 0 15px 15px', border: '1px solid #ddd', borderTop: 'none', display: 'flex', gap: '10px' }}>
        <input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, padding: '10px 15px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none', fontSize: '14px' }} />
        <button onClick={handleSend} style={{ padding: '10px 20px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
      </div>
    </div>
  );
};

export default Chat;