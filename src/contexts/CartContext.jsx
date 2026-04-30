import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const { user } = useAuth();

  const loadCart = async () => {
    if (!user) return;
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updated = await api.addToCart(productId, quantity);
      setCart(updated);
    } catch (err) {
      throw err;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    const updated = await api.updateCartItem(itemId, quantity);
    setCart(updated);
  };

  const removeItem = async (itemId) => {
    const updated = await api.removeCartItem(itemId);
    setCart(updated);
  };

  const clearCart = () => setCart({ items: [], total: 0 });

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);