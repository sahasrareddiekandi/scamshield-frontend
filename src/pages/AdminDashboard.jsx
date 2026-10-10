import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, FileText, CheckCircle, XCircle, AlertTriangle, RefreshCw, Radio, Terminal, Filter } from 'lucide-react';
import {
  getAllReports,
  updateReportStatus,
  getAllUsers,
  toggleUserStatus,
  getAdminAnalytics,
  getAuditLogs
} from '../services/adminService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('moderation'); // 'moderation' | 'users' | 'telemetry' | 'audit'
  
  // Data states
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Moderation modal / prompt
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [targetStatus, setTargetStatus] = useState('VERIFIED_THREAT');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [reportsData, usersData, analyticsData, logsData] = await Promise.all([
        getAllReports(),
        getAllUsers(),
        getAdminAnalytics(),
        getAuditLogs()
      ]);
      setReports(reportsData || []);
      setUsers(usersData || []);
      setAnalytics(analyticsData);
      setAuditLogs(logsData || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load administrator telemetry.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reportId, status, notes) => {
    try {
      const updated = await updateReportStatus(reportId, status, notes);
      setReports(reports.map(r => r.id === reportId ? updated : r));
      setActionSuccess(`Report #${reportId} updated to ${status}`);
      setSelectedReport(null);
      setAdminNote('');
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleToggleUser = async (userId) => {
    try {
      const updated = await toggleUserStatus(userId);
      setUsers(users.map(u => u.id === userId ? updated : u));
      setActionSuccess(`User ${updated.email} status toggled (active=${updated.enabled})`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      alert('Failed to toggle user status: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Loading Security Operations Center Telemetry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cyber-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white">Security Operations Console</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Elevated privileges active • Role: ROLE_ADMIN • ScamShield Threat Moderation
          </p>
        </div>

        <button
          onClick={loadAllData}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 transition w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Console</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* KPI Counters */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-cyber-card/80 border border-cyber-border rounded-xl">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Pending Triage</div>
            <div className="text-2xl font-mono font-bold text-amber-400">{analytics.pendingReports}</div>
          </div>
          <div className="p-4 bg-cyber-card/80 border border-cyber-border rounded-xl">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Total Reports</div>
            <div className="text-2xl font-mono font-bold text-white">{analytics.totalReports}</div>
          </div>
          <div className="p-4 bg-cyber-card/80 border border-cyber-border rounded-xl">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Registered Users</div>
            <div className="text-2xl font-mono font-bold text-cyan-400">{analytics.totalUsers}</div>
          </div>
          <div className="p-4 bg-cyber-card/80 border border-cyber-border rounded-xl">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Audit Records</div>
            <div className="text-2xl font-mono font-bold text-slate-200">{analytics.totalAuditLogs}</div>
          </div>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-cyber-border pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
            activeTab === 'moderation'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Community Reports Queue ({reports.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
            activeTab === 'users'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          User Management ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
            activeTab === 'telemetry'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Threat Signatures ({analytics?.topThreatPatterns?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
            activeTab === 'audit'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          System Audit Trail ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: Incident Moderation */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="p-8 text-center bg-cyber-card/40 rounded-xl text-slate-400 text-xs">
              No reports currently in moderation vault.
            </div>
          ) : (
            reports.map((r) => (
              <div
                key={r.id}
                className="p-5 bg-cyber-card/80 border border-cyber-border rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">Report #{r.id}</span>
                    <span className="text-xs font-semibold text-white">{r.scamType}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {r.contentType}
                    </span>
                    <span className="text-[11px] text-slate-500">by {r.reporterEmail}</span>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    r.status === 'VERIFIED_THREAT'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : r.status === 'RESOLVED'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : r.status === 'FALSE_POSITIVE'
                      ? 'bg-slate-700 text-slate-300'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {r.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 break-all">
                  {r.content}
                </div>

                {r.description && (
                  <p className="text-xs text-slate-400 italic">
                    User context: "{r.description}"
                  </p>
                )}

                {r.adminNotes && (
                  <div className="text-xs text-cyan-300 bg-cyan-950/30 p-2 rounded border border-cyan-800/40">
                    <span className="font-mono font-bold">Admin Note: </span>
                    {r.adminNotes}
                  </div>
                )}

                {/* Moderation Actions */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleStatusUpdate(r.id, 'VERIFIED_THREAT', 'Confirmed threat. Signature cataloged.')}
                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-mono transition"
                  >
                    Confirm Threat
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(r.id, 'RESOLVED', 'Mitigated and resolved.')}
                    className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono transition"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(r.id, 'FALSE_POSITIVE', 'Non-malicious content.')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: User Governance */}
      {activeTab === 'users' && (
        <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-xl space-y-4">
          <h3 className="font-semibold text-white text-base">User Directory & Authorization</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cyber-border text-slate-400 font-mono uppercase">
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Full Name</th>
                  <th className="py-2.5 px-3">Email Address</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-mono text-slate-400">#{u.id}</td>
                    <td className="py-3 px-3 font-semibold text-white">{u.fullName}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{u.email}</td>
                    <td className="py-3 px-3 font-mono text-cyan-400">{u.role}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        u.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {u.enabled ? 'ACTIVE' : 'DEACTIVATED'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleUser(u.id)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                          u.enabled
                            ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {u.enabled ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Threat Signatures */}
      {activeTab === 'telemetry' && (
        <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-xl space-y-4">
          <h3 className="font-semibold text-white text-base">Active Attack Patterns & Signatures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics?.topThreatPatterns?.map((t) => (
              <div key={t.id} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">{t.pattern}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {t.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Detections: {t.detectionCount}</span>
                  <span>Severity: {t.severity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Trail */}
      {activeTab === 'audit' && (
        <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-base">Security Audit Event Log</h3>
            <span className="text-xs font-mono text-slate-400">Immutable Log Chain</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-cyber-border text-slate-400 uppercase">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Actor</th>
                  <th className="py-2.5 px-3">Client IP</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-2.5 px-3 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-cyan-400 font-bold">{log.action}</td>
                    <td className="py-2.5 px-3 text-slate-300">{log.performedBy || 'ANONYMOUS'}</td>
                    <td className="py-2.5 px-3 text-slate-500">{log.ipAddress}</td>
                    <td className="py-2.5 px-3 text-slate-300 max-w-sm truncate">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
