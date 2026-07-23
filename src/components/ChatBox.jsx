import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { FaComments, FaTimes, FaPaperPlane, FaSmile, FaSeedling } from 'react-icons/fa';

const ChatBox = ({ receiverId, receiverName }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const messagesEndRef = useRef(null);

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
  if (!open) {
    return (
      <button 
        className="btn rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg animate-float"
        style={{ 
          width: '60px', 
          height: '60px', 
          background: '#D4A837',
          border: 'none',
          transition: 'transform 0.3s, box-shadow 0.3s',
          boxShadow: '0 4px 15px rgba(212, 168, 55, 0.4)'
        }}
        onClick={() => setOpen(true)}
        onMouseEnter={e => { 
          e.currentTarget.style.transform = 'scale(1.1)'; 
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 168, 55, 0.6)'; 
          e.currentTarget.style.background = '#C49A2E';
        }}
        onMouseLeave={e => { 
          e.currentTarget.style.transform = 'scale(1)'; 
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 168, 55, 0.4)'; 
          e.currentTarget.style.background = '#D4A837';
        }}
      >
        <FaComments size={28} style={{ color: '#0A120A' }} />
      </button>
    );
  }

  // Open chat window
  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .chat-window {
          width: 360px;
          z-index: 1050;
          border-radius: 20px;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.7);
        }
        .chat-header {
          background: linear-gradient(135deg, #0A120A 0%, #1A2A1A 100%);
          border-bottom: 1px solid rgba(212, 168, 55, 0.2);
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-header .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #7C9A5E;
          display: inline-block;
          margin-right: 0.5rem;
        }
        .chat-header .receiver-name {
          color: #D4A837;
          font-weight: 700;
        }
        .chat-close {
          color: #B0C0A8;
          background: transparent;
          border: none;
          transition: transform 0.2s;
          font-size: 1.2rem;
        }
        .chat-close:hover {
          color: #D4A837;
          transform: rotate(90deg);
        }
        .chat-body {
          height: 400px;
          overflow-y: auto;
          padding: 1rem;
          background: #0A120A;
        }
        .chat-body::-webkit-scrollbar {
          width: 4px;
        }
        .chat-body::-webkit-scrollbar-track {
          background: #1A2A1A;
        }
        .chat-body::-webkit-scrollbar-thumb {
          background: #D4A837;
          border-radius: 10px;
        }
        .message-bubble {
          max-width: 80%;
          padding: 0.5rem 1rem;
          border-radius: 1.2rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          word-wrap: break-word;
          margin-bottom: 0.5rem;
        }
        .message-bubble.me {
          background: #D4A837;
          color: #0A120A;
          border-bottom-right-radius: 0.25rem;
        }
        .message-bubble.other {
          background: #1A2A1A;
          color: #D0D8C8;
          border: 1px solid rgba(212, 168, 55, 0.1);
          border-bottom-left-radius: 0.25rem;
        }
        .message-time {
          font-size: 0.6rem;
          opacity: 0.6;
          margin-top: 0.15rem;
          display: block;
          text-align: right;
        }
        .message-time.me {
          color: #0A120A;
        }
        .message-time.other {
          color: #B0C0A8;
        }
        .chat-empty {
          text-align: center;
          padding: 2rem 0;
          color: #B0C0A8;
        }
        .chat-empty svg {
          color: #D4A837;
          margin-bottom: 0.5rem;
        }
        .chat-footer {
          background: #162016;
          border-top: 1px solid rgba(212, 168, 55, 0.1);
          padding: 0.5rem 0.75rem;
        }
        .chat-input {
          background: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          border-radius: 2rem !important;
          padding: 0.5rem 1rem;
        }
        .chat-input:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .chat-input::placeholder {
          color: #6A7A62 !important;
        }
        .chat-send {
          background: #D4A837;
          color: #0A120A;
          border: none;
          border-radius: 2rem;
          padding: 0.5rem 1rem;
          transition: all 0.2s;
          margin-left: 0.25rem;
        }
        .chat-send:hover {
          background: #C49A2E;
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(212, 168, 55, 0.4);
        }
      `}</style>

      <div className="position-fixed bottom-0 end-0 m-4 chat-window">
        {/* Header */}
        <div className="chat-header">
          <div>
            <span className="status-dot"></span>
            <span className="receiver-name">{receiverName}</span>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Chat body */}
        <div className="chat-body">
          {messages.length === 0 && (
            <div className="chat-empty">
              <FaSeedling size={40} />
              <p className="small">Say hello! Start the conversation.</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`d-flex ${msg.fromMe ? 'justify-content-end' : 'justify-content-start'} mb-2`}
              style={{ animation: 'fadeIn 0.2s ease-out' }}
            >
              <div className={`message-bubble ${msg.fromMe ? 'me' : 'other'}`}>
                {msg.text}
                <span className={`message-time ${msg.fromMe ? 'me' : 'other'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer input */}
        <div className="chat-footer">
          <div className="d-flex gap-1">
            <input 
              type="text" 
              className="form-control chat-input" 
              placeholder="Type a message..." 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && send()}
            />
            <button className="chat-send" onClick={send}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;