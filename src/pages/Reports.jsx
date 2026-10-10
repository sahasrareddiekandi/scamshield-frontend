import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Flag, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, RefreshCw, FileText } from 'lucide-react';
import { submitReport, getMyReports } from '../services/reportService';
import { useAuth } from '../context/AuthContext';

const Reports = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'myReports'
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('MESSAGE');
  const [scamType, setScamType] = useState('Phishing');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  // My Reports list
  const [myReports, setMyReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  // Prepopulate if navigated from analysis dossier
  useEffect(() => {
    if (location.state) {
      if (location.state.content) setContent(location.state.content);
      if (location.state.contentType) setContentType(location.state.contentType);
      if (location.state.scamType) setScamType(location.state.scamType);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessData(null);

    if (!content.trim()) {
      setError('Please provide the suspicious content to report.');
      return;
    }

    try {
      setLoading(true);
      const res = await submitReport({
        content: content.trim(),
        contentType,
        scamType,
        description: description.trim(),
      });
      setSuccessData(res);
      setContent('');
      setDescription('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit security report.');
    } finally {
      setLoading(false);
    }
  };

  const loadMyReports = async () => {
    if (!isAuthenticated) return;
    try {
      setLoadingReports(true);
      const data = await getMyReports();
      setMyReports(data || []);
    } catch (err) {
      console.error('Failed to load user reports', err);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'myReports') {
      loadMyReports();
    }
  }, [activeTab]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'VERIFIED_THREAT':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">VERIFIED THREAT</span>;
      case 'RESOLVED':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">RESOLVED</span>;
      case 'FALSE_POSITIVE':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">DISMISSED</span>;
      default:
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">PENDING REVIEW</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-red-400 mb-3">
          <Flag className="w-3.5 h-3.5" />
          <span>ZERO-DAY THREAT REPORTING</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Report Suspicious Threat
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Contribute new scam patterns, malicious links, and phishing campaigns to the ScamShield collective defense engine.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-3 border-b border-cyber-border pb-4">
        <button
          onClick={() => setActiveTab('submit')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'submit'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Submit Threat Report
        </button>

        {isAuthenticated && (
          <button
            onClick={() => setActiveTab('myReports')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'myReports'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Submitted Reports
          </button>
        )}
      </div>

      {activeTab === 'submit' ? (
        <div className="max-w-2xl mx-auto bg-cyber-card/80 border border-cyber-border rounded-2xl p-6 sm:p-8 relative shadow-xl">
          
          {successData && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Security Report Filed Successfully!</h4>
                <p className="text-xs text-emerald-300 mt-1">
                  Report reference ID: #{successData.id}. Our threat moderation team will review and verify this pattern.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Content Type */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Threat Classification Type:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setContentType('MESSAGE')}
                  className={`py-2.5 rounded-xl text-xs font-semibold border transition ${
                    contentType === 'MESSAGE'
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Suspicious Message / Email
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('URL')}
                  className={`py-2.5 rounded-xl text-xs font-semibold border transition ${
                    contentType === 'URL'
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Malicious Link / Website URL
                </button>
              </div>
            </div>

            {/* Content Payload */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Reported Content / URL:
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                required
                placeholder="Paste the suspicious content, phone number, SMS text, or web link here..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-mono leading-relaxed"
              />
            </div>

            {/* Suspected Scam Type */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Suspected Scam Category:
              </label>
              <select
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
              >
                <option value="Phishing">Banking / Credential Phishing</option>
                <option value="Financial Extortion">Financial Extortion / Blackmail</option>
                <option value="Advance Fee Scam">Lottery / Prize / Advance-Fee Scam</option>
                <option value="Crypto Scam">Cryptocurrency / Investment Fraud</option>
                <option value="Brand Impersonation">Brand Impersonation / Fake Support</option>
                <option value="Malicious Software">Malware Distribution / APK Bait</option>
                <option value="Other">Other / Uncategorized</option>
              </select>
            </div>

            {/* Description & Context */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Incident Context / Observations:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Optional: How did you receive this? What actions did the sender demand?"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow-cyber-cyan transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Submitting to Telemetry Vault...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Security Report</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* My Reports Tab */
        <div className="max-w-4xl mx-auto space-y-4">
          {loadingReports ? (
            <div className="py-16 text-center">
              <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-mono">Fetching your reported telemetry...</p>
            </div>
          ) : myReports.length === 0 ? (
            <div className="p-10 bg-cyber-card/40 border border-cyber-border rounded-2xl text-center space-y-2">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-300 font-medium">No reports filed yet</p>
              <p className="text-xs text-slate-500">You have not submitted any threat alerts.</p>
            </div>
          ) : (
            myReports.map((r) => (
              <div
                key={r.id}
                className="p-5 bg-cyber-card/80 border border-cyber-border rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold">Report #{r.id}</span>
                    <span className="text-xs text-slate-300 font-medium">{r.scamType}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                      {r.contentType}
                    </span>
                  </div>
                  {getStatusBadge(r.status)}
                </div>

                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-lg break-all">
                  {r.content}
                </p>

                {r.adminNotes && (
                  <div className="p-2.5 bg-slate-900 border border-cyan-500/20 rounded-lg text-xs text-cyan-300">
                    <span className="font-mono font-semibold block mb-0.5">Moderator Assessment:</span>
                    {r.adminNotes}
                  </div>
                )}

                <div className="text-[11px] font-mono text-slate-500">
                  Filed at: {new Date(r.reportedAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default Reports;
