import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, Search, Filter, ShieldAlert, ArrowRight, ExternalLink, Calendar, RefreshCw } from 'lucide-react';
import { getUserAnalyses } from '../services/analysisService';
import RiskBadge from '../components/RiskBadge';

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL'); // ALL, HIGH, MEDIUM, LOW
  const [typeFilter, setTypeFilter] = useState('ALL'); // ALL, MESSAGE, URL

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getUserAnalyses();
      setAnalyses(data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load analysis history.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAnalyses = analyses.filter((item) => {
    const matchesSearch =
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.scamType && item.scamType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRisk = riskFilter === 'ALL' || item.riskLevel === riskFilter;
    const matchesType = typeFilter === 'ALL' || item.contentType === typeFilter;

    return matchesSearch && matchesRisk && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cyber-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white">Your Analysis History</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Archived threat scans and evaluations associated with your account
          </p>
        </div>

        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs rounded-xl shadow-cyber-cyan transition w-fit"
        >
          <span>Run New Scan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, domain, scam category, or summary..."
            className="w-full bg-cyber-card/80 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-cyber-card/80 border border-cyber-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="HIGH">High Risk Only</option>
            <option value="MEDIUM">Medium Risk Only</option>
            <option value="LOW">Low Risk Only</option>
          </select>

          {/* Content Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-cyber-card/80 border border-cyber-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Types</option>
            <option value="MESSAGE">Messages</option>
            <option value="URL">URLs</option>
          </select>

          <button
            onClick={fetchHistory}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
            title="Refresh history"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-xs text-slate-400 font-mono">Loading telemetry archives...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-center text-red-400 text-sm">
          {error}
        </div>
      ) : filteredAnalyses.length === 0 ? (
        <div className="p-12 bg-cyber-card/40 border border-cyber-border rounded-2xl text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-base text-slate-300 font-medium">No analyses found</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || riskFilter !== 'ALL' || typeFilter !== 'ALL'
              ? 'Try adjusting your filters or search keywords.'
              : 'You have not performed any analyses yet. Paste a message or URL in the analyzer.'}
          </p>
          <Link
            to="/analyze"
            className="inline-block mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-xl border border-cyan-500/30 transition"
          >
            Start Analyzing
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnalyses.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-cyber-card/80 border border-cyber-border hover:border-slate-700 rounded-2xl transition duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <RiskBadge level={item.riskLevel} size="md" />
                  <span className="text-xs font-mono font-bold text-white bg-slate-800/90 px-2 py-0.5 rounded">
                    Score: {item.riskScore}/100
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                    {item.contentType}
                  </span>
                  <span className="text-xs font-medium text-slate-300">
                    {item.scamType}
                  </span>
                </div>

                {/* Content snippet */}
                <p className="text-xs text-slate-300 font-mono break-all line-clamp-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
                  {item.content}
                </p>

                {/* Summary */}
                <p className="text-xs text-slate-400 line-clamp-1">
                  {item.summary}
                </p>
              </div>

              {/* Action Column */}
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>

                <Link
                  to={`/result/${item.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-lg border border-cyan-500/30 transition group"
                >
                  <span>View Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default History;
