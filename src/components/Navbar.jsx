import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to={user ? "/dashboard" : "/"} className="brand-logo">
          <div className="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/>
            </svg>
          </div>
          <span>Scam<span style={{ color: 'var(--primary-cyan)' }}>Shield</span></span>
        </Link>

        <ul className="nav-links">
          {user ? (
            <>
              <li>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/analyze" className={`nav-link ${isActive('/analyze') ? 'active' : ''}`}>
                  Analyze
                </Link>
              </li>
              <li>
                <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
                  History
                </Link>
              </li>
              <li>
                <Link to="/reports" className={`nav-link ${isActive('/reports') ? 'active' : ''}`}>
                  Reports
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                    Admin Portal <span className="admin-badge">ADMIN</span>
                  </Link>
                </li>
              )}
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {user.name}
                </span>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
