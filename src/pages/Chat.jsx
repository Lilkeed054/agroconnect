import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { FaSeedling, FaPaperPlane, FaUser } from 'react-icons/fa';

const Chat = () => {
  const { userId } = useParams();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => socket.off('receive-message');
  }, [socket]);

  const send = () => {
    if (!input.trim()) return;
    socket.emit('private-message', { receiver_id: userId, message: input });
    setMessages([...messages, { text: input, fromMe: true, time: new Date() }]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
      <div className="card border-0 shadow rounded-4 overflow-hidden">
        {/* Chat Header - Branded */}
        <div className="card-header py-3 px-4" style={{ background: 'linear-gradient(135deg, #F4E04D, #B2EC05)', borderBottom: 'none' }}>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white rounded-circle p-2" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaSeedling size={22} style={{ color: '#09F315' }} />
            </div>
            <div>
              <h5 className="fw-bold mb-0" style={{ color: '#2C3A1F' }}>Farmer Support</h5>
              <small style={{ color: '#2C3A1F', opacity: 0.8 }}>Online • Usually replies in minutes</small>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="card-body p-0" style={{ height: '500px', overflowY: 'auto', backgroundColor: '#F9FAFB' }}>
          <div className="p-4">
            {messages.length === 0 ? (
              <div className="text-center py-5">
                <FaUser size={48} className="mb-3" style={{ color: '#B2EC05' }} />
                <p className="text-muted">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`d-flex mb-3 ${m.fromMe ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className={`px-3 py-2 rounded-4 shadow-sm`}
                    style={{
                      maxWidth: '70%',
                      backgroundColor: m.fromMe ? '#09F315' : '#FFFFFF',
                      color: m.fromMe ? '#2C3A1F' : '#1F2937',
                      border: m.fromMe ? 'none' : '1px solid #E5E7EB',
                      borderRadius: m.fromMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    }}
                  >
                    {m.text}
                    <div
                      className="small mt-1"
                      style={{
                        color: m.fromMe ? '#2C3A1F' : '#9CA3AF',
                        fontSize: '0.65rem',
                        opacity: 0.7,
                      }}
                    >
                      {m.time ? new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="card-footer bg-white p-3" style={{ borderTop: '1px solid #F4E04D' }}>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control rounded-pill border-0 shadow-sm"
              style={{ backgroundColor: '#F9FAFB' }}
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn rounded-pill px-4"
              style={{ backgroundColor: '#09F315', color: '#2C3A1F', border: 'none' }}
              onClick={send}
            >
              <FaPaperPlane /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;