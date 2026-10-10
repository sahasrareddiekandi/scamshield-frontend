import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RiskBadge from '../components/RiskBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterLevel, setFilterLevel] = useState('ALL');
  const navigate = useNavigate();

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
          setError(`Failed to fetch analysis history (${status}).`);
        }
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Cannot connect to the ScamShield server. Please ensure the backend is running on port 8081.');
      } else {
        setError('Failed to fetch analysis history.');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item => {
    if (filterLevel === 'ALL') return true;
    return item.riskLevel === filterLevel;
  });

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Analysis History</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review your previously submitted text messages and link assessments.</p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['ALL', 'LOW', 'MEDIUM', 'HIGH'].map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`btn btn-sm ${filterLevel === level ? 'btn-primary' : 'btn-secondary'}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <LoadingSpinner text="Fetching your analysis logs..." />
        ) : filteredHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p>No history records found for the selected filter.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Input Content Preview</th>
                  <th>Risk Score</th>
                  <th>Risk Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
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
                      <button
                        onClick={() => navigate('/analyze', { state: { analysisId: item.id } })}
                        className="btn btn-secondary btn-sm"
                      >
                        View Details
                      </button>
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

export default HistoryPage;
