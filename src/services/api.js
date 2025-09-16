const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const getToken = () => localStorage.getItem('token');

async function request(endpoint, method = 'GET', data = null, formData = false) {
  const headers = {
    Accept: 'application/json',
  };

  if (!formData) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    body: data
      ? (formData ? data : JSON.stringify(data))
      : null,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const json = await response.json();

    if (!response.ok) {
      // Extract validation errors if present
      if (response.status === 422 && json.errors) {
        const errorMessages = Object.values(json.errors).flat().join(', ');
        throw new Error(errorMessages);
      }
      throw new Error(json.message || 'Request failed');
    }

    return json;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const api = {
  // Auth
  register: (userData) => request('/v1/auth/register', 'POST', userData),
  login: (credentials) => request('/v1/auth/login', 'POST', credentials),
  logout: () => request('/v1/auth/logout', 'POST'),
  getUser: () => request('/v1/user'),

  // Products – JSON
  getProducts: (params = {}) =>
    request(`/v1/products?${new URLSearchParams(params)}`),
  getProduct: (id) => request(`/v1/products/${id}`),
  createProduct: (productData) =>
    request('/v1/products', 'POST', productData, false),
  updateProduct: (id, data) =>
    request(`/v1/products/${id}`, 'PUT', data, false),
  deleteProduct: (id) => request(`/v1/products/${id}`, 'DELETE'),

  // Orders
  createOrder: (orderData) => request('/v1/orders', 'POST', orderData),
  getOrders: (role) => request(`/v1/orders?role=${role}`),
  updateOrderStatus: (id, status) =>
    request(`/v1/orders/${id}/status`, 'PATCH', { status }),
  markOrderPaid: (orderId) =>
    request(`/v1/orders/${orderId}/mark-paid`, 'PATCH'),

    // Cart
    getCart: () => request('/v1/cart'),
    addToCart: (productId, quantity) =>
      request('/v1/cart', 'POST', { product_id: productId, quantity }),
    updateCartItem: (itemId, quantity) =>
      request(`/v1/cart/${itemId}`, 'PUT', { quantity }),
    removeCartItem: (itemId) => request(`/v1/cart/${itemId}`, 'DELETE'),
    syncCart: (items) => request('/v1/cart/sync', 'POST', { items }), // ✅ add this line

  // Vendors
  getVendorsNearby: (lat, lng, radius) =>
    request(`/v1/vendors/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
  getVendorProfile: (id) => request(`/v1/vendors/${id}`),
  updateVendorProfile: (data) =>
    request('/v1/vendor/profile', 'PUT', data, false), // JSON (not FormData)
  getVendorStats: () => request('/v1/vendor/stats'),

  // Payments
  initiatePayment: (orderId, gateway) =>
    request('/v1/payments/initiate', 'POST', { order_id: orderId, gateway }),

  getVendorDetails: () => request('/v1/checkout/vendor-details'),
};