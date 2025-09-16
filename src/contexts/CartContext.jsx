import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const { user } = useAuth();

  console.log('CartProvider mounted'); // ✅ debug

  const loadCart = useCallback(async () => {
    if (!user) return;
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  }, [user]);

  const syncCart = useCallback(async (items) => {
    try {
      const updated = await api.syncCart(items);
      setCart(updated);
      localStorage.removeItem('guestCart');
      return updated;
    } catch (err) {
      console.error('Failed to sync cart:', err);
      throw err;
    }
  }, []);

  // Save guest cart to localStorage on every change (if not logged in)
  useEffect(() => {
    if (!user && cart.items.length > 0) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart, user]);

  // On login: sync guest cart and clear localStorage
  useEffect(() => {
    if (!user) {
      const savedCart = localStorage.getItem('guestCart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (parsedCart.items?.length > 0) {
            setCart(parsedCart);
          }
        } catch (e) {
          console.error('Error loading guest cart:', e);
        }
      }
      return;
    }

    const guestCartStr = localStorage.getItem('guestCart');
    if (guestCartStr) {
      try {
        const guestCart = JSON.parse(guestCartStr);
        if (guestCart.items?.length > 0) {
          const items = guestCart.items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
          }));
          syncCart(items)
            .then(() => {
              localStorage.removeItem('guestCart');
            })
            .catch(() => loadCart());
        } else {
          loadCart();
        }
      } catch (e) {
        console.error('Error parsing guest cart:', e);
        loadCart();
      }
    } else {
      loadCart();
    }
  }, [user, loadCart, syncCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updated = await api.addToCart(productId, quantity);
      setCart(updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    const updated = await api.updateCartItem(itemId, quantity);
    setCart(updated);
    return updated;
  };

  const removeItem = async (itemId) => {
    const updated = await api.removeCartItem(itemId);
    setCart(updated);
    return updated;
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
    if (!user) localStorage.removeItem('guestCart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        loadCart,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};