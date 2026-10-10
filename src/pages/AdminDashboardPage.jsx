import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RiskBadge from '../components/RiskBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // New Threat Indicator form state
  const [newIndicator, setNewIndicator] = useState({ indicator: '', type: 'KEYWORD', description: '', severity: 20 });
  const [indicatorError, setIndicatorError] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, [activeTab]);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'overview') {
        const res = await api.get('/admin/dashboard');
        setStats(res.data);
      } else if (activeTab === 'users') {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } else if (activeTab === 'reports') {
        const res = await api.get('/admin/reports');
        setReports(res.data);
      } else if (activeTab === 'indicators') {
        const res = await api.get('/admin/threat-indicators');
        setIndicators(res.data);
      } else if (activeTab === 'audit') {
        const res = await api.get('/admin/audit-logs');
        setAuditLogs(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load administrative data.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReportStatus = async (reportId, newStatus) => {
    try {
      await api.put(`/admin/reports/${reportId}/status`, { status: newStatus });
      setActionSuccess(`Report #${reportId} status updated to ${newStatus}`);
      setTimeout(() => setActionSuccess(''), 3000);
      fetchAdminData();
    } catch (err) {
      setError('Failed to update report status.');
    }
  };

  const handleCreateIndicator = async (e) => {
    e.preventDefault();
    if (!newIndicator.indicator.trim()) {
      setIndicatorError('Indicator string value is required.');
      return;
    }
    setIndicatorError('');
    try {
      await api.post('/admin/threat-indicators', newIndicator);
      setNewIndicator({ indicator: '', type: 'KEYWORD', description: '', severity: 20 });
      setActionSuccess('New threat indicator created successfully!');
      setTimeout(() => setActionSuccess(''), 3000);
      fetchAdminData();
    } catch (err) {
      setIndicatorError(err.response?.data?.message || 'Failed to create threat indicator.');
    }
  };

  const handleDeleteIndicator = async (id) => {
    if (!window.confirm('Are you sure you want to delete this threat indicator?')) return;
    try {
      await api.delete(`/admin/threat-indicators/${id}`);
      setActionSuccess(`Threat indicator #${id} deleted.`);
      setTimeout(() => setActionSuccess(''), 3000);
      fetchAdminData();
    } catch (err) {
      setError('Failed to delete threat indicator.');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Admin Security Command Center</h1>
          <p style={{ color: 'var(--text-muted)' }}>System analytics, user management, report moderation, and threat indicators oversight.</p>
        </div>
      </div>

      {actionSuccess && <div className="alert alert-success">{actionSuccess}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', pb: '1rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Security Dashboard
        </button>
        <button
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Registered Users
        </button>
        <button
          className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('reports')}
        >
          🚩 Reports Moderation
        </button>
        <button
          className={`btn ${activeTab === 'indicators' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('indicators')}
        >
          🛡 Threat Indicators
        </button>
        <button
          className={`btn ${activeTab === 'audit' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('audit')}
        >
          📜 Audit Logs
        </button>
      </div>

      {loading ? (
        <LoadingSpinner text="Fetching security console data..." />
      ) : (
        <>
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && stats && (
            <div>
              <div className="grid-stats">
                <div className="stat-card">
                  <span className="stat-label">Total Registered Users</span>
                  <span className="stat-value">{stats.totalUsers}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Total Analyses Run</span>
                  <span className="stat-value">{stats.totalAnalyses}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">High-Risk Flagged</span>
                  <span className="stat-value" style={{ color: 'var(--risk-high)' }}>{stats.highRiskAnalyses}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Pending Reports</span>
                  <span className="stat-value" style={{ color: 'var(--risk-medium)' }}>{stats.pendingReports}</span>
                </div>
              </div>

              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 className="card-title">Recent High-Risk Scam Analyses</h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Content Preview</th>
                        <th>Risk Score</th>
                        <th>Risk Level</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentHighRiskAnalyses?.length === 0 ? (
                        <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No high-risk analyses recorded yet.</td></tr>
                      ) : (
                        stats.recentHighRiskAnalyses?.map((item) => (
                          <tr key={item.id}>
                            <td>#{item.id}</td>
                            <td>{item.inputType}</td>
                            <td style={{ fontFamily: 'var(--font-mono)' }}>{item.inputPreview}</td>
                            <td style={{ fontWeight: '700', color: 'var(--risk-high)' }}>{item.riskScore} / 100</td>
                            <td><RiskBadge riskLevel={item.riskLevel} /></td>
                            <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(item.createdAt).toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="card">
              <h3 className="card-title">Registered System Users ({users.length})</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>#{u.id}</td>
                        <td style={{ fontWeight: '600' }}>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={u.role === 'ADMIN' ? 'admin-badge' : 'badge'} style={u.role !== 'ADMIN' ? { background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-main)' } : {}}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: u.enabled ? 'var(--risk-low)' : 'var(--risk-high)', fontWeight: '600' }}>
                            {u.enabled ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTS MODERATION TAB */}
          {activeTab === 'reports' && (
            <div className="card">
              <h3 className="card-title">User Submitted Scam Reports ({reports.length})</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Reporter</th>
                      <th>Reason</th>
                      <th>Reported Content</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.length === 0 ? (
                      <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No reports pending moderation.</td></tr>
                    ) : (
                      reports.map(r => (
                        <tr key={r.id}>
                          <td>#{r.id}</td>
                          <td>
                            <div style={{ fontWeight: '600' }}>{r.userName}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.userEmail}</div>
                          </td>
                          <td style={{ maxWidth: '250px' }}>{r.reason}</td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', maxWidth: '250px' }}>{r.reportedContent || 'N/A'}</td>
                          <td>
                            <span className={`badge ${r.status === 'REVIEWED' ? 'badge-low' : (r.status === 'DISMISSED' ? '' : 'badge-medium')}`}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button onClick={() => handleUpdateReportStatus(r.id, 'REVIEWED')} className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--risk-low)', color: 'var(--risk-low)' }}>
                                Approve
                              </button>
                              <button onClick={() => handleUpdateReportStatus(r.id, 'DISMISSED')} className="btn btn-secondary btn-sm">
                                Dismiss
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* THREAT INDICATORS TAB */}
          {activeTab === 'indicators' && (
            <div>
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 className="card-title">Add Active Threat Indicator</h3>
                {indicatorError && <div className="alert alert-danger">{indicatorError}</div>}
                <form onSubmit={handleCreateIndicator} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Indicator Value (Domain/Keyword)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. fake-bank-portal.com"
                      value={newIndicator.indicator}
                      onChange={(e) => setNewIndicator({ ...newIndicator, indicator: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Indicator Type</label>
                    <select
                      className="form-control"
                      value={newIndicator.type}
                      onChange={(e) => setNewIndicator({ ...newIndicator, type: e.target.value })}
                    >
                      <option value="KEYWORD">KEYWORD</option>
                      <option value="DOMAIN">DOMAIN</option>
                      <option value="PATTERN">PATTERN</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Severity Score Penalty (1-50)</label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={50}
                      value={newIndicator.severity}
                      onChange={(e) => setNewIndicator({ ...newIndicator, severity: parseInt(e.target.value) || 20 })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Brief note about this threat"
                      value={newIndicator.description}
                      onChange={(e) => setNewIndicator({ ...newIndicator, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      + Add Indicator
                    </button>
                  </div>
                </form>
              </div>

              <div className="card">
                <h3 className="card-title">Active Threat Indicators Database ({indicators.length})</h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Indicator Value</th>
                        <th>Type</th>
                        <th>Severity</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicators.map(ti => (
                        <tr key={ti.id}>
                          <td>#{ti.id}</td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--primary-cyan)' }}>{ti.indicator}</td>
                          <td>
                            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: '#090d16', borderRadius: '4px' }}>
                              {ti.type}
                            </span>
                          </td>
                          <td style={{ fontWeight: '700', color: 'var(--risk-high)' }}>+{ti.severity}</td>
                          <td style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{ti.description || 'N/A'}</td>
                          <td>
                            <button onClick={() => handleDeleteIndicator(ti.id)} className="btn btn-danger btn-sm">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AUDIT LOGS TAB */}
          {activeTab === 'audit' && (
            <div className="card">
              <h3 className="card-title">Security & Administrative Audit Logs ({auditLogs.length})</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Timestamp</th>
                      <th>Actor</th>
                      <th>Action</th>
                      <th>Description</th>
                      <th>IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map(log => (
                      <tr key={log.id}>
                        <td>#{log.id}</td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(log.timestamp).toLocaleString()}</td>
                        <td>
                          <div style={{ fontWeight: '600' }}>{log.userName}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{log.userEmail}</div>
                        </td>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: '700', color: 'var(--primary-cyan)' }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.88rem' }}>{log.description}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboardPage;
