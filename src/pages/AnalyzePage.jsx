import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import RiskBadge from '../components/RiskBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import ReportModal from '../components/ReportModal';

const AnalyzePage = () => {
  const location = useLocation();
  const [inputType, setInputType] = useState('MESSAGE');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    // If navigated from history with an analysisId, load details
    if (location.state?.analysisId) {
      loadAnalysisDetails(location.state.analysisId);
    }
  }, [location.state]);

  const loadAnalysisDetails = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/analysis/${id}`);
      setResult(response.data);
      setInputType(response.data.inputType);
      setContent(response.data.originalInput);
    } catch (err) {
      setError('Failed to load analysis details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please enter text content or a URL to analyze.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.post('/analysis/analyze', {
        inputType,
        content: content.trim()
      });
      setResult(response.data);
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 429) {
          setError('Rate limit exceeded (Max 20 analysis requests/min). Please wait a moment before trying again.');
        } else if (status === 401) {
          setError('Session expired. Please log out and log in again to continue.');
        } else if (status === 403) {
          setError('Access denied. You do not have permission to perform this analysis.');
        } else if (status === 400) {
          setError(err.response.data?.message || 'Invalid input. Please check your submission and try again.');
        } else if (status === 500) {
          setError('Server error occurred. Please try again in a moment.');
        } else {
          setError(err.response.data?.message || `Request failed with status ${status}.`);
        }
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Cannot connect to the ScamShield server. Please ensure the backend service is running on port 8081.');
      } else {
        setError('Analysis failed. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score < 30) return 'var(--risk-low)';
    if (score < 60) return 'var(--risk-medium)';
    return 'var(--risk-high)';
  };

  return (
    <div className="container" style={{ maxWidth: '900px', padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Risk Analysis Center</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Submit suspicious SMS text messages or URLs to evaluate scam probability indicators.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        {/* Input Type Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <button
            type="button"
            className={`btn ${inputType === 'MESSAGE' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setInputType('MESSAGE')}
          >
            💬 Text Message Analysis
          </button>
          <button
            type="button"
            className={`btn ${inputType === 'URL' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setInputType('URL')}
          >
            🔗 URL / Web Link Analysis
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleAnalyze}>
          <div className="form-group">
            <label className="form-label">
              {inputType === 'MESSAGE' ? 'Paste Suspicious Text Message Content' : 'Enter Suspicious Web URL'}
            </label>
            {inputType === 'MESSAGE' ? (
              <textarea
                className="form-control"
                placeholder="Paste message here (e.g. 'URGENT! Your account will be blocked. Click https://suspicious-bank-link.com to verify now.')"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                required
              />
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder="https://example-phishing-site.com/login"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              🔒 Content is analyzed safely without clicking suspicious links
            </span>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Analyzing...' : 'Run Risk Analysis'}
            </button>
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner text="Running rule-based scam detection engine..." />}

      {result && (
        <div className="card" style={{ borderTop: `4px solid ${getScoreColor(result.riskScore)}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                Analysis Result #{result.analysisId}
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.2rem' }}>
                Threat Assessment Report
              </h2>
            </div>
            <RiskBadge riskLevel={result.riskLevel} />
          </div>

          {/* Score Gauge Progress Bar */}
          <div style={{ marginBottom: '2rem', background: '#090d16', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '700' }}>
              <span>Scam Risk Score</span>
              <span style={{ color: getScoreColor(result.riskScore), fontSize: '1.2rem' }}>
                {result.riskScore} / 100
              </span>
            </div>
            <div style={{ height: '12px', background: '#1a253e', borderRadius: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${result.riskScore}%`,
                  background: getScoreColor(result.riskScore),
                  transition: 'width 0.8s ease-in-out',
                  borderRadius: '6px'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <span>0 (Safe)</span>
              <span>30 (Medium Risk)</span>
              <span>60 (High Risk)</span>
              <span>100 (Severe Threat)</span>
            </div>
          </div>

          {/* Detected Reasons */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Detected Scam Indicators ({result.reasons?.length || 0})
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {result.reasons?.map((reason, index) => (
                <li key={index} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: `3px solid ${getScoreColor(result.riskScore)}`, fontSize: '0.92rem' }}>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Extracted URLs */}
          {result.detectedUrls && result.detectedUrls.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                Extracted Embedded Links
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {result.detectedUrls.map((url, index) => (
                  <li key={index} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary-cyan)', background: '#090d16', padding: '0.6rem 0.8rem', borderRadius: '6px', wordBreak: 'break-all' }}>
                    🔗 {url}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety Advice */}
          <div style={{ marginBottom: '2rem', background: 'rgba(0, 242, 254, 0.05)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--primary-cyan)' }}>
              Recommended Safety Actions
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem' }}>
              {result.safetyAdvice?.map((advice, index) => (
                <li key={index}>{advice}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button onClick={() => setIsReportModalOpen(true)} className="btn btn-danger btn-sm">
              🚩 Report Malicious Content
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        analysisId={result?.analysisId}
        reportedContent={result?.originalInput}
      />
    </div>
  );
};

export default AnalyzePage;
