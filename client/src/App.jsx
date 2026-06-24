import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';

// --- Placeholder Components for Phase 3 & 4 ---
// We define these inline so your app doesn't crash before we create the actual files!
const Home = () => (
  <div className="flex flex-col items-center justify-center text-center mt-20">
    <h1 className="text-5xl font-bold mb-6">Welcome to AI Career <span className="text-gradient">Navigator</span></h1>
    <p className="text-xl text-secondary max-w-2xl">Your personal AI-powered guide to transitioning into your dream tech role. Sign up to get started.</p>
  </div>
);

const Login = () => <div className="text-center mt-20 text-2xl font-semibold">Login Page (Coming in Phase 3)</div>;
const Register = () => <div className="text-center mt-20 text-2xl font-semibold">Register Page (Coming in Phase 3)</div>;
const Dashboard = () => <div className="text-center mt-20 text-2xl font-semibold">Protected Dashboard (Coming in Phase 4)</div>;

// --- Protected Route Wrapper ---
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col text-primary">
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
