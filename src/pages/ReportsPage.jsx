import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    try {
      const response = await api.get('/reports/my');
      setReports(response.data);
    } catch (err) {
      setError('Failed to fetch your submitted reports.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'REVIEWED') {
      return <span className="badge badge-low">✓ REVIEWED</span>;
    }
    if (status === 'DISMISSED') {
      return <span className="badge" style={{ background: 'rgba(100, 116, 139, 0.2)', color: '#94a3b8', border: '1px solid #475569' }}>DISMISSED</span>;
    }
    return <span className="badge badge-medium">⏳ PENDING REVIEW</span>;
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>My Scam Reports</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track status of suspicious items reported to ScamShield security administrators.</p>
      </div>

      <div className="card">
        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <LoadingSpinner text="Fetching your submitted reports..." />
        ) : reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p>You haven't submitted any threat reports yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Submitted Date</th>
                  <th>Reason Given</th>
                  <th>Content Snippet</th>
                  <th>Moderation Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>#{report.id}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {new Date(report.createdAt).toLocaleString()}
                    </td>
                    <td style={{ fontWeight: '500' }}>
                      {report.reason}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {report.reportedContent ? (report.reportedContent.length > 50 ? report.reportedContent.substring(0, 47) + '...' : report.reportedContent) : 'N/A'}
                    </td>
                    <td>
                      {getStatusBadge(report.status)}
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

export default ReportsPage;
