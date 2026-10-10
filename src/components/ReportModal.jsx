import React, { useState } from 'react';
import api from '../services/api';

const ReportModal = ({ isOpen, onClose, analysisId, reportedContent }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Please describe why you are reporting this content.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.post('/reports', {
        analysisId: analysisId || null,
        reportedContent: reportedContent || '',
        reason: reason.trim()
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setReason('');
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Submit Scam Report</h3>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Report submitted successfully! Admins will review it.</div>}

        <form onSubmit={handleSubmit}>
          {reportedContent && (
            <div className="form-group">
              <label className="form-label">Reported Content Preview</label>
              <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '6px', fontSize: '0.88rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {reportedContent.length > 150 ? reportedContent.substring(0, 147) + '...' : reportedContent}
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Reason for Report</label>
            <textarea
              className="form-control"
              placeholder="Explain why this message/URL is suspicious (e.g., impersonates bank, false lottery win, phishing link)..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
