import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;
    const newSocket = io(import.meta.env.VITE_WS_URL || 'http://localhost:6001', {
      auth: { token: localStorage.getItem('token') },
    });
    setSocket(newSocket);

    newSocket.on('order-update', (data) => {
      toast.info(`Order #${data.order_id} status: ${data.status}`);
    });
    newSocket.on('new-message', (data) => {
      toast.info(`New message from ${data.sender_name}`);
    });

    return () => newSocket.close();
  }, [user]);

  const sendMessage = (receiverId, message) => {
    if (socket) socket.emit('private-message', { receiver_id: receiverId, message });
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);