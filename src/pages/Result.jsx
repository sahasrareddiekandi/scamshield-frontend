import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flag, Share2, Check, RefreshCw } from 'lucide-react';
import { getAnalysisById } from '../services/analysisService';
import RiskBadge from '../components/RiskBadge';
import RiskGauge from '../components/RiskGauge';
import IndicatorList from '../components/IndicatorList';
import SafetyAdviceCard from '../components/SafetyAdviceCard';
import GeminiAiCard from '../components/GeminiAiCard';
import UrlBreakdownCard from '../components/UrlBreakdownCard';

const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const result = await getAnalysisById(id);
        setData(result);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to retrieve analysis dossier.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-sm text-slate-400 font-mono">Loading Security Telemetry...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm">
          {error || 'Analysis record could not be found.'}
        </div>
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-sm hover:bg-slate-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Analyzer</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Analysis</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Dossier'}</span>
          </button>
          <button
            onClick={() => {
              navigate('/reports', {
                state: {
                  content: data.content,
                  contentType: data.contentType,
                  scamType: data.scamType,
                }
              });
            }}
            className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-lg transition"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Report Threat</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-cyber-border pb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Threat Dossier #{data.id}</h1>
            <RiskBadge level={data.riskLevel} size="lg" />
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {data.contentType} Scan • Category: {data.scamType} • Verified at {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Analyzed Content preview */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
          Analyzed Content Payload:
        </span>
        <p className="text-sm text-slate-200 font-mono break-all leading-relaxed">
          {data.content}
        </p>
      </div>

      {/* Grid: Gauge + Gemini Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <RiskGauge
            score={data.riskScore}
            level={data.riskLevel}
            confidence={data.confidence}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <GeminiAiCard
            geminiUsed={data.geminiUsed}
            summary={data.summary}
            techniques={data.socialEngineeringTechniques}
          />

          {data.urlDetails && (
            <UrlBreakdownCard urlDetails={data.urlDetails} />
          )}
        </div>
      </div>

      {/* Detected Risk Indicators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white text-base">
            Flagged Threat Indicators ({data.indicators?.length || 0})
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Rule Weight Deductions
          </span>
        </div>
        <IndicatorList indicators={data.indicators} />
      </div>

      {/* Practical Action Advice */}
      <div>
        <SafetyAdviceCard advice={data.safetyAdvice} />
      </div>
    </div>
  );
};

export default Result;
