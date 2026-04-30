import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { FaComments, FaTimes, FaPaperPlane, FaSmile, FaSeedling } from 'react-icons/fa';

const ChatBox = ({ receiverId, receiverName }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const send = () => {
    if (!message.trim()) return;
    socket?.emit('private-message', { receiver_id: receiverId, message });
    setMessages([...messages, { text: message, fromMe: true, time: new Date() }]);
    setMessage('');
  };

  // Floating chat button (closed state)
  if (!open) return (
    <button 
      className="btn rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg animate-float"
      style={{ 
        width: '60px', 
        height: '60px', 
        background: 'linear-gradient(135deg, #B2EC05, #09F315)',
        border: 'none',
        transition: 'transform 0.3s, box-shadow 0.3s'
      }}
      onClick={() => setOpen(true)}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(9,243,21,0.5)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)'; }}
    >
      <FaComments size={28} style={{ color: '#2C3A1F' }} />
    </button>
  );

  // Open chat window
  return (
    <div 
      className="card position-fixed bottom-0 end-0 m-4 shadow-xl border-0"
      style={{ 
        width: '360px', 
        zIndex: 1050,
        borderRadius: '20px',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      {/* Header with brand gradient (yellow → lime) */}
      <div 
        className="d-flex justify-content-between align-items-center p-3"
        style={{ background: 'linear-gradient(135deg, #F4E04D, #B2EC05)' }}
      >
        <div className="d-flex align-items-center gap-2">
          <div className="rounded-circle bg-white p-1" style={{ width: '10px', height: '10px', backgroundColor: '#09F315' }}></div>
          <span className="fw-bold" style={{ color: '#2C3A1F' }}>{receiverName}</span>
        </div>
        <button 
          className="btn btn-sm rounded-circle" 
          onClick={() => setOpen(false)}
          style={{ 
            color: '#2C3A1F',
            transition: 'transform 0.2s',
            backgroundColor: 'transparent',
            border: 'none'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'rotate(90deg)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0)'}
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* Chat body */}
      <div className="card-body p-3" style={{ height: '400px', overflowY: 'auto', backgroundColor: '#F9FAFB' }}>
        {messages.length === 0 && (
          <div className="text-center text-muted mt-5">
            <FaSeedling size={40} className="mb-2" style={{ color: '#B2EC05' }} />
            <p className="small">Say hello! Start the conversation.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`d-flex ${msg.fromMe ? 'justify-content-end' : 'justify-content-start'} mb-3 animate-fade-in`}
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          >
            <div 
              className={`p-2 rounded-3 shadow-sm ${msg.fromMe ? 'text-dark' : 'text-dark'}`}
              style={{
                maxWidth: '80%',
                backgroundColor: msg.fromMe ? '#09F315' : 'white',
                border: msg.fromMe ? 'none' : '1px solid #E5E7EB',
                borderRadius: msg.fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
              }}
            >
              {msg.text}
              <div className="small mt-1" style={{ fontSize: '10px', opacity: 0.7, color: msg.fromMe ? '#2C3A1F' : '#9CA3AF' }}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer with input */}
      <div className="card-footer bg-white p-2 border-0" style={{ borderTop: '1px solid #F4E04D' }}>
        <div className="input-group">
          <input 
            type="text" 
            className="form-control border-0 rounded-pill" 
            placeholder="Type a message..." 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && send()}
            style={{ backgroundColor: '#F9FAFB' }}
          />
          <button 
            className="btn rounded-pill px-3" 
            onClick={send}
            style={{ 
              backgroundColor: '#09F315', 
              color: '#2C3A1F',
              transition: 'transform 0.2s',
              border: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;