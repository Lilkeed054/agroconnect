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
    <>
      <style>{`
        .chat-container {
          background: #0A120A;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }
        .chat-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.12);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          border-radius: 1.5rem;
          overflow: hidden;
        }
        .chat-header {
          background: linear-gradient(135deg, #0A120A 0%, #1A2A1A 100%);
          border-bottom: 1px solid rgba(212, 168, 55, 0.2);
          padding: 1rem 1.5rem;
        }
        .chat-header .icon-wrapper {
          background: #1A2A1A;
          border: 2px solid #D4A837;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-header .icon-wrapper svg {
          color: #D4A837;
        }
        .chat-header h5 {
          color: #D4A837;
          font-weight: 700;
        }
        .chat-header small {
          color: #B0C0A8;
        }
        .chat-messages {
          height: 500px;
          overflow-y: auto;
          background: #0A120A;
          padding: 1.5rem;
        }
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: #1A2A1A;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: #D4A837;
          border-radius: 10px;
        }
        .message-bubble {
          max-width: 70%;
          padding: 0.75rem 1.25rem;
          border-radius: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          word-wrap: break-word;
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
          margin-top: 0.2rem;
          display: block;
          text-align: right;
        }
        .message-time.me {
          color: #0A120A;
        }
        .message-time.other {
          color: #B0C0A8;
        }
        .chat-input-area {
          background: #162016;
          border-top: 1px solid rgba(212, 168, 55, 0.15);
          padding: 0.75rem 1.5rem;
        }
        .chat-input {
          background: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          border-radius: 2rem !important;
          padding: 0.6rem 1.2rem;
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
        .btn-send {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          padding: 0.6rem 1.8rem;
          border-radius: 2rem;
          transition: all 0.25s ease;
        }
        .btn-send:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #B0C0A8;
        }
        .empty-state svg {
          color: #D4A837;
          margin-bottom: 1rem;
        }
        .empty-state p {
          color: #B0C0A8;
        }
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="chat-container">
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="chat-card">
            {/* Header */}
            <div className="chat-header d-flex align-items-center gap-3">
              <div className="icon-wrapper">
                <FaSeedling size={22} />
              </div>
              <div>
                <h5 className="mb-0">Farmer Support</h5>
                <small>Online • Usually replies in minutes</small>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="empty-state">
                  <FaUser size={48} />
                  <p className="mb-0">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={`d-flex mb-3 fade-in ${m.fromMe ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div className={`message-bubble ${m.fromMe ? 'me' : 'other'}`}>
                      {m.text}
                      <span className={`message-time ${m.fromMe ? 'me' : 'other'}`}>
                        {m.time ? new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-area">
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control chat-input"
                  placeholder="Type your message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="btn-send" onClick={send}>
                  <FaPaperPlane className="me-1" /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;