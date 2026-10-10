import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, AlertTriangle, Cpu, CheckCircle2, ArrowRight, Lock, Eye, ExternalLink, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 py-8">
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
        <div className="absolute inset-0 max-w-3xl mx-auto h-96 radar-glow pointer-events-none" />

        {/* Live Security Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-8 shadow-cyber-cyan">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>CYBER DEFENSE ENGINE v2.4 ACTIVE • GEMINI AI READY</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight font-sans">
          Suspicious Message & Link <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Risk-Analysis Platform
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Neutralize phishing attacks, financial extortion, and deceptive links before they cause data or financial loss. Transparent rule-based telemetry augmented by Google Gemini AI.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/analyze"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-black bg-cyan-400 hover:bg-cyan-300 shadow-cyber-cyan transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Analyze Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/insights"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Live Threat Insights</span>
          </Link>
        </div>

        {/* Quick Threat Metric Counters */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 bg-cyber-card/60 border border-cyber-border rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-mono font-bold text-cyan-400">0 - 100</div>
            <div className="text-xs text-slate-400 mt-1">Granular Risk Scoring</div>
          </div>
          <div className="p-4 bg-cyber-card/60 border border-cyber-border rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-mono font-bold text-emerald-400">&lt; 150ms</div>
            <div className="text-xs text-slate-400 mt-1">Rule Engine Latency</div>
          </div>
          <div className="p-4 bg-cyber-card/60 border border-cyber-border rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-mono font-bold text-amber-400">Dual-Layer</div>
            <div className="text-xs text-slate-400 mt-1">Heuristics + Gemini AI</div>
          </div>
          <div className="p-4 bg-cyber-card/60 border border-cyber-border rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-mono font-bold text-red-400">Zero-Data</div>
            <div className="text-xs text-slate-400 mt-1">Privacy Safe Analysis</div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            INTELLIGENT DEFENSE ARCHITECTURE
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Dual-Layer Threat Detection Pipeline
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            ScamShield pairs deterministic regex heuristics with Google Gemini's cognitive reasoning to defeat sophisticated social-engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Layer 1: Rule-Based Engine */}
          <div className="p-8 bg-cyber-card/80 border border-cyber-border rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl w-fit mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Layer 1: Rule-Based Risk Engine</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Deterministic, sub-millisecond static analysis engine executing specialized threat inspection on every submitted payload.
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Detection of urgency triggers & legal ultimatum coercion</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Flagging untraceable payment demands (Crypto, Wire, Gift cards)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Harvesting attempts targeting 2FA OTPs, Passwords & SSNs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Deep URL parsing: Direct IP hosts, disposable TLDs & brand spoofing</span>
              </li>
            </ul>
          </div>

          {/* Layer 2: Google Gemini AI */}
          <div className="p-8 bg-cyber-card/80 border border-cyan-500/30 rounded-2xl relative overflow-hidden group shadow-cyber-cyan">
            <div className="p-3 bg-gradient-to-tr from-cyan-600 to-blue-500 text-white rounded-xl w-fit mb-6 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Layer 2: Google Gemini AI Intelligence</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Cognitive context analysis via Google AI Studio. Synthesizes psychological deception nuances that circumvent traditional filters.
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Recognizes complex contextual impersonation & spear-phishing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Pinpoints psychological manipulation tactics (Greed, Fear, Authority)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Explains the 'Why' behind risks in clear, human-readable language</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Zero single-point-of-failure: Full automatic fallback to Rule Engine</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Try-It Samples */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-slate-900/60 border border-cyber-border rounded-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Quick Scenario Simulator</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Test pre-configured real-world scam vectors immediately in our sandbox.
              </p>
            </div>
            <Link
              to="/analyze"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Launch Full Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/analyze?sample=bank"
              className="p-4 bg-cyber-card/90 border border-red-500/30 hover:border-red-500/60 rounded-xl transition group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-red-400 mb-2">
                <span>BANK PHISHING SMS</span>
                <span className="font-bold">HIGH RISK</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                "URGENT: Your Chase Bank debit card is locked. Verify immediately at http://192.168.1.10/verify-account"
              </p>
              <div className="mt-3 text-[11px] text-cyan-400 group-hover:underline flex items-center gap-1">
                <span>Simulate Threat</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/analyze?sample=url"
              className="p-4 bg-cyber-card/90 border border-amber-500/30 hover:border-amber-500/60 rounded-xl transition group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span>DECEPTIVE BRAND URL</span>
                <span className="font-bold">HIGH RISK</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                "http://paypal-security-account-update.xyz/login/verify?token=928471"
              </p>
              <div className="mt-3 text-[11px] text-cyan-400 group-hover:underline flex items-center gap-1">
                <span>Simulate Threat</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/analyze?sample=safe"
              className="p-4 bg-cyber-card/90 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl transition group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                <span>WORKPLACE MESSAGE</span>
                <span className="font-bold">LOW RISK</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                "Hi Alex, let's meet tomorrow at 10 AM in the conference room for the quarterly sprint review."
              </p>
              <div className="mt-3 text-[11px] text-cyan-400 group-hover:underline flex items-center gap-1">
                <span>Simulate Threat</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
