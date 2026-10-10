import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import RiskBadge from '../components/RiskBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/analysis/history');
      setHistory(response.data);
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 401) {
          setError('Session expired. Please log out and log in again.');
        } else {
          setError(`Failed to fetch recent analysis history (${status}).`);
        }
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Cannot connect to the ScamShield server. Please ensure the backend is running on port 8081.');
      } else {
        setError('Failed to fetch recent analysis history.');
      }
    } finally {
      setLoading(false);
    }
  };

  const highRiskCount = history.filter(h => h.riskLevel === 'HIGH').length;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Security Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
        </div>
        <Link to="/analyze" className="btn btn-primary">
          🔍 Analyze Message / Link
        </Link>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <span className="stat-label">Total Content Analyzed</span>
          <span className="stat-value">{history.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">High Risk Flagged</span>
          <span className="stat-value" style={{ color: 'var(--risk-high)' }}>{highRiskCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Account Role</span>
          <span className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)' }}>
            {user?.role}
          </span>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 className="card-title" style={{ margin: 0 }}>
            Recent Analyses
          </h3>
          <Link to="/history" className="btn btn-secondary btn-sm">
            View All History
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <LoadingSpinner text="Loading recent history..." />
        ) : history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>You haven't submitted any messages or URLs for analysis yet.</p>
            <Link to="/analyze" className="btn btn-primary">
              Run First Scam Analysis
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Content Preview</th>
                  <th>Risk Score</th>
                  <th>Risk Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'var(--bg-surface)' }}>
                        {item.inputType}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
                      {item.inputPreview}
                    </td>
                    <td style={{ fontWeight: '700' }}>
                      {item.riskScore} / 100
                    </td>
                    <td>
                      <RiskBadge riskLevel={item.riskLevel} />
                    </td>
                    <td>
                      <Link to="/analyze" state={{ analysisId: item.id }} className="btn btn-secondary btn-sm">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
