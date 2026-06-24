import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Map, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl shadow-lg shadow-accent-glow/30 group-hover:shadow-accent-glow/50 transition-all">
            <Map className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            AI Career <span className="text-gradient">Navigator</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-secondary hover:text-primary transition-colors font-medium flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-primary transition-all text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-secondary hover:text-primary transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium hover:shadow-lg hover:shadow-accent-glow/40 transition-all hover-lift"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
