import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessageSquare, Link2, ShieldCheck, Sparkles, AlertCircle, RefreshCw, ArrowRight, CornerDownLeft, CheckCircle2 } from 'lucide-react';
import { analyzeMessage, analyzeUrl } from '../services/analysisService';
import RiskBadge from '../components/RiskBadge';
import RiskGauge from '../components/RiskGauge';
import IndicatorList from '../components/IndicatorList';
import SafetyAdviceCard from '../components/SafetyAdviceCard';
import GeminiAiCard from '../components/GeminiAiCard';
import UrlBreakdownCard from '../components/UrlBreakdownCard';

const SAMPLE_PRESETS = {
  bank: {
    type: 'message',
    text: 'URGENT: Your Chase Bank debit card has been suspended due to suspicious activity. Verify immediately at http://192.168.1.10/verify-account or your card will be permanently blocked within 24 hours.',
    label: 'Chase Bank Suspended Alert (Phishing)',
  },
  lottery: {
    type: 'message',
    text: 'CONGRATULATIONS! You have been selected as the international lottery winner of $1,000,000. Send your full name, SSN, and pay the $150 processing fee via Bitcoin to claim your jackpot immediately.',
    label: 'International Lottery Win (Extortion)',
  },
  url: {
    type: 'url',
    text: 'http://paypal-security-account-update.xyz/login/verify?token=928471',
    label: 'PayPal Brand Spoofing (.xyz)',
  },
  ipUrl: {
    type: 'url',
    text: 'http://185.220.101.4/secure-banking/login',
    label: 'Direct IP Host (Unencrypted)',
  },
  safe: {
    type: 'message',
    text: 'Hi Alex, let\'s meet tomorrow at 10 AM in the conference room for the quarterly sprint review.',
    label: 'Workplace Calendar Sync (Legitimate)',
  },
  safeUrl: {
    type: 'url',
    text: 'https://github.com/torvalds/linux',
    label: 'Official GitHub Repository (Legitimate)',
  }
};

const Analyze = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'url'
  const [messageInput, setMessageInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Load sample preset if query param provided
  useEffect(() => {
    const sampleKey = searchParams.get('sample');
    if (sampleKey && SAMPLE_PRESETS[sampleKey]) {
      const preset = SAMPLE_PRESETS[sampleKey];
      setActiveTab(preset.type);
      if (preset.type === 'message') {
        setMessageInput(preset.text);
      } else {
        setUrlInput(preset.text);
      }
    }
  }, [searchParams]);

  const loadPreset = (key) => {
    const preset = SAMPLE_PRESETS[key];
    setActiveTab(preset.type);
    if (preset.type === 'message') {
      setMessageInput(preset.text);
      setUrlInput('');
    } else {
      setUrlInput(preset.text);
      setMessageInput('');
    }
    setError(null);
    setResult(null);
  };

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);

    const payload = activeTab === 'message' ? messageInput.trim() : urlInput.trim();
    if (!payload) {
      setError(`Please enter a suspicious ${activeTab === 'message' ? 'message' : 'URL'} to analyze.`);
      return;
    }

    setLoading(true);
    setScanStep(1);

    // Realistic scanning pipeline animation progression
    const timer1 = setTimeout(() => setScanStep(2), 500);
    const timer2 = setTimeout(() => setScanStep(3), 1000);

    try {
      let data;
      if (activeTab === 'message') {
        data = await analyzeMessage(payload);
      } else {
        data = await analyzeUrl(payload);
      }
      setResult(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'An error occurred during threat analysis.';
      setError(msg);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setLoading(false);
      setScanStep(0);
    }
  };

  const clearForm = () => {
    setMessageInput('');
    setUrlInput('');
    setError(null);
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>REAL-TIME THREAT SCANNER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Analyze Suspicious Content
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Paste any message, email snippet, SMS alert, or suspicious link to receive an immediate security risk breakdown.
        </p>
      </div>

      {/* Preset Quick Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        <span className="text-xs font-mono text-slate-500 mr-1">Load Demo Case:</span>
        <button
          onClick={() => loadPreset('bank')}
          className="text-xs bg-slate-900 hover:bg-slate-800 text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg transition"
        >
          🚨 Bank Phishing SMS
        </button>
        <button
          onClick={() => loadPreset('lottery')}
          className="text-xs bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg transition"
        >
          🎁 Lottery Extortion
        </button>
        <button
          onClick={() => loadPreset('url')}
          className="text-xs bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg transition"
        >
          🔗 Spoofed PayPal Link
        </button>
        <button
          onClick={() => loadPreset('ipUrl')}
          className="text-xs bg-slate-900 hover:bg-slate-800 text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg transition"
        >
          🌐 Direct IP Link
        </button>
        <button
          onClick={() => loadPreset('safe')}
          className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition"
        >
          ✅ Safe Team Message
        </button>
      </div>

      {/* Main Analysis Input Box */}
      <div className="max-w-4xl mx-auto bg-cyber-card/80 border border-cyber-border rounded-2xl p-6 sm:p-8 relative shadow-2xl backdrop-blur-md">
        
        {/* Dual Mode Switcher */}
        <div className="flex items-center gap-2 border-b border-cyber-border pb-6 mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('message'); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'message'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Suspicious Message / Email / SMS</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('url'); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'url'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-cyber-cyan'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Suspicious URL / Web Link</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="space-y-4">
          {activeTab === 'message' ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Raw Message Content:
                </label>
                <span className="text-xs font-mono text-slate-500">
                  {messageInput.length} characters
                </span>
              </div>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                rows={5}
                placeholder="Paste the suspicious text, email, or WhatsApp/SMS message here (e.g. 'URGENT: Your account has been locked. Verify at http://...')..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition font-sans leading-relaxed"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Target URL / Link:
                </label>
                <span className="text-xs font-mono text-slate-500">
                  {urlInput.length} characters
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="e.g. http://192.168.1.10/login or paypal-security-verify.xyz"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition font-mono"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={clearForm}
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg transition"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3.5 rounded-xl text-sm font-bold text-black flex items-center gap-2 transition-all ${
                loading
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-cyan-400 hover:bg-cyan-300 shadow-cyber-cyan'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>
                    {scanStep === 1 && 'Scanning Rule Heuristics...'}
                    {scanStep === 2 && 'Querying Gemini AI Studio...'}
                    {scanStep === 3 && 'Synthesizing Risk Report...'}
                  </span>
                </>
              ) : (
                <>
                  <span>Perform Risk Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Result Presentation Section */}
      {result && (
        <section className="max-w-5xl mx-auto space-y-8 animate-fadeIn pt-6">
          <div className="flex items-center justify-between border-b border-cyber-border pb-4 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-bold text-white">Threat Analysis Dossier</h2>
                <RiskBadge level={result.riskLevel} size="lg" />
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Payload Type: {result.contentType} • Classification: {result.scamType} • Timestamp: {new Date(result.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => {
                navigate('/reports', {
                  state: {
                    content: result.content,
                    contentType: result.contentType,
                    scamType: result.scamType,
                  }
                });
              }}
              className="text-xs font-mono bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3.5 py-2 rounded-xl transition"
            >
              🚩 Report to Threat Registry
            </button>
          </div>

          {/* Top Row: Gauge + Key Findings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <RiskGauge
                score={result.riskScore}
                level={result.riskLevel}
                confidence={result.confidence}
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <GeminiAiCard
                geminiUsed={result.geminiUsed}
                summary={result.summary}
                techniques={result.socialEngineeringTechniques}
              />

              {/* URL Breakdown if URL details present */}
              {result.urlDetails && (
                <UrlBreakdownCard urlDetails={result.urlDetails} />
              )}
            </div>
          </div>

          {/* Detected Risk Indicators Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-base">
                Identified Risk Factors & Penalties ({result.indicators?.length || 0})
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Transparent Rule Weights
              </span>
            </div>
            <IndicatorList indicators={result.indicators} />
          </div>

          {/* Practical Action Advice */}
          <div>
            <SafetyAdviceCard advice={result.safetyAdvice} />
          </div>
        </section>
      )}

    </div>
  );
};

export default Analyze;
