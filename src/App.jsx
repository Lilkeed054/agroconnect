import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { CartProvider } from './contexts/CartContext';
import { SocketProvider } from './contexts/SocketContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationSector from './components/LocationSector';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import VendorDashboard from './pages/VendorDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Chat from './pages/Chat';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <BrowserRouter>
      {/* Global animations for ChatBox and other components */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
      
      <AuthProvider>
        <LocationProvider>
          <CartProvider>
            <SocketProvider>
              <div className="d-flex flex-column min-vh-100">
                {/* Optional top bar to display your LocationSector component */}
                <div className="bg-light py-1 border-bottom">
                  <div className="container d-flex justify-content-end">
                    <LocationSector />
                  </div>
                </div>
                <Navbar />
                <main className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={
                      <ProtectedRoute allowedRoles={['customer']}>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="/vendor/dashboard" element={
                      <ProtectedRoute allowedRoles={['vendor']}>
                        <VendorDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/customer/dashboard" element={
                      <ProtectedRoute allowedRoles={['customer']}>
                        <CustomerDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/dashboard" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/chat/:userId?" element={
                      <ProtectedRoute>
                        <Chat />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer position="bottom-right" autoClose={3000} />
              </div>
            </SocketProvider>
          </CartProvider>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;