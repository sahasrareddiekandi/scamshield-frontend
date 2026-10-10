import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--primary-cyan)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.5rem', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
          🛡 NEXT-GEN SCAM & PHISHING ANALYSIS PLATFORM
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.25rem', letterSpacing: '-1px' }}>
          Analyze Suspicious Messages & Links Before Taking Action
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
          ScamShield uses transparent rule-based threat indicators, domain pattern normalization, and urgency scoring to identify SMS scams, phishing URLs, fake lottery claims, and payment fraud attempts.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to={user ? "/analyze" : "/register"} className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            {user ? "Start Risk Analysis" : "Create Free Account"}
          </Link>
          <Link to={user ? "/dashboard" : "/login"} className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            {user ? "View Dashboard" : "Sign In"}
          </Link>
        </div>
      </div>

      <div className="grid-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="card">
          <div style={{ color: 'var(--primary-cyan)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>⚡</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Instant Rule Engine</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Real-time pattern matching for urgency language, suspicious payment demands, credential phishing, and IP-based host redirection.
          </p>
        </div>

        <div className="card">
          <div style={{ color: 'var(--primary-cyan)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Safe URL Extraction</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Automatically extracts and parses embedded links inside SMS or chat messages without making dangerous HTTP requests to malicious servers.
          </p>
        </div>

        <div className="card">
          <div style={{ color: 'var(--primary-cyan)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>🛡</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Actionable Advice</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Receive clear, tailored safety recommendations alongside a 0–100 risk score and specific detection reasons for complete transparency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
