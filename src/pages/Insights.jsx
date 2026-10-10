import React, { useState, useEffect } from 'react';
import { BarChart3, ShieldCheck, ShieldAlert, AlertTriangle, Activity, TrendingUp, RefreshCw, Radio } from 'lucide-react';
import { getInsights } from '../services/insightsService';
import RiskBadge from '../components/RiskBadge';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to retrieve threat telemetry.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Aggregating Global Telemetry Insights...</p>
      </div>
    );
  }

  if (error || !insights) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm">
          {error || 'Telemetry data is temporarily unavailable.'}
        </div>
      </div>
    );
  }

  // Chart 1: Risk Level Distribution Doughnut
  const doughnutData = {
    labels: ['Low Risk', 'Medium Suspicion', 'High Threat'],
    datasets: [
      {
        data: [
          insights.lowRiskCount || 0,
          insights.mediumRiskCount || 0,
          insights.highRiskCount || 0,
        ],
        backgroundColor: [
          '#10b981', // emerald
          '#f59e0b', // amber
          '#ef4444', // red
        ],
        borderColor: '#0f172a',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#cbd5e1',
          font: { family: 'Inter', size: 12 },
          padding: 16,
        },
      },
    },
    cutout: '70%',
  };

  // Chart 2: Top Scam Types Bar Chart
  const scamLabels = Object.keys(insights.topScamTypes || {});
  const scamCounts = Object.values(insights.topScamTypes || {});

  const barData = {
    labels: scamLabels.length > 0 ? scamLabels : ['No data yet'],
    datasets: [
      {
        label: 'Detected Instances',
        data: scamCounts.length > 0 ? scamCounts : [0],
        backgroundColor: 'rgba(6, 182, 212, 0.7)',
        borderColor: '#06b6d4',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 10 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#94a3b8', precision: 0 },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cyber-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white">Live Threat Telemetry & Insights</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Global scam telemetry, risk distribution metrics, and trending deception signatures
          </p>
        </div>

        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 transition w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-cyber-card/80 border border-cyber-border rounded-2xl relative overflow-hidden">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Total Scans Run</div>
          <div className="text-3xl font-mono font-extrabold text-white">{insights.totalAnalyses}</div>
          <div className="text-[11px] text-cyan-400 mt-2 flex items-center gap-1 font-mono">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Active Engine Processing</span>
          </div>
        </div>

        <div className="p-5 bg-cyber-card/80 border border-cyber-border rounded-2xl relative overflow-hidden">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">High Risk Intercepts</div>
          <div className="text-3xl font-mono font-extrabold text-red-400">{insights.highRiskCount}</div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Severe scam vectors neutralized
          </div>
        </div>

        <div className="p-5 bg-cyber-card/80 border border-cyber-border rounded-2xl relative overflow-hidden">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Average Threat Score</div>
          <div className="text-3xl font-mono font-extrabold text-amber-400">{insights.averageRiskScore}/100</div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Composite telemetry average
          </div>
        </div>

        <div className="p-5 bg-cyber-card/80 border border-cyber-border rounded-2xl relative overflow-hidden">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Community Reports</div>
          <div className="text-3xl font-mono font-extrabold text-cyan-400">{insights.totalReports}</div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Crowdsourced zero-day flags
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution Chart */}
        <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-base">Risk Classification Distribution</h3>
            <span className="text-xs font-mono text-slate-400">Telemetry Breakdown</span>
          </div>
          <div className="h-64 relative flex items-center justify-center">
            {insights.totalAnalyses > 0 ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <p className="text-xs text-slate-500 font-mono">Insufficient data for chart generation</p>
            )}
          </div>
        </div>

        {/* Top Scam Types Chart */}
        <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-base">Prominent Scam Categories</h3>
            <span className="text-xs font-mono text-slate-400">Frequency Analysis</span>
          </div>
          <div className="h-64 relative">
            {scamLabels.length > 0 ? (
              <Bar data={barData} options={barOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                No scam categories recorded yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Indicators Discovered */}
      <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-2xl space-y-4">
        <h3 className="font-semibold text-white text-base">Most Prevalent Trigger Indicators</h3>
        <p className="text-xs text-slate-400 -mt-2">Frequently encountered deception tactics across recent scans</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(insights.topIndicators || {}).map(([cat, count], idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono text-slate-300 font-semibold">{cat}</span>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">
                {count} triggers
              </span>
            </div>
          ))}
          {Object.keys(insights.topIndicators || {}).length === 0 && (
            <div className="text-xs text-slate-500 col-span-3 py-4 text-center">
              No indicator triggers recorded yet.
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white text-base">Recent Threat Evaluations</h3>
          <span className="text-xs font-mono text-slate-400">Live Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyber-border text-slate-400 font-mono uppercase">
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Content Snippet</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {insights.recentAnalyses?.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-mono text-cyan-400">{item.contentType}</td>
                  <td className="py-3 px-3 font-mono text-slate-300 max-w-xs truncate">{item.content}</td>
                  <td className="py-3 px-3 text-slate-300">{item.scamType}</td>
                  <td className="py-3 px-3 font-mono font-bold text-white">{item.riskScore}/100</td>
                  <td className="py-3 px-3">
                    <RiskBadge level={item.riskLevel} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Insights;
