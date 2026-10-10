import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="container" style={{ maxWidth: '440px', padding: '3rem 1rem' }}>
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem' }}>
          Welcome Back
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Sign in to access your ScamShield risk analysis portal
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="user@scamshield.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Accounts Quick-Fill Box */}
        <div style={{ marginTop: '1.75rem', padding: '1rem', background: '#090d16', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
          <div style={{ fontWeight: '700', color: 'var(--primary-cyan)', marginBottom: '0.5rem' }}>
            🔑 Development Demo Accounts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              type="button" 
              onClick={() => handleQuickLogin('user@scamshield.com', 'User@123')}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: '0.8rem' }}
            >
              Fill Standard User (user@scamshield.com)
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickLogin('admin@scamshield.com', 'Admin@123')}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: '0.8rem', borderColor: 'rgba(168, 85, 247, 0.4)' }}
            >
              Fill Security Admin (admin@scamshield.com)
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
