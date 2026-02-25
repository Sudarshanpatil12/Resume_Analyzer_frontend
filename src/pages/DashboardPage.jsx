import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { fetchDashboardStats, fetchAnalysisHistory } from '../api/dashboardApi';
import StatCard from '../components/common/StatCard';
import Loader from '../components/common/Loader';

function scoreTone(value) {
  if (value >= 80) return { color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', label: 'Strong' };
  if (value >= 65) return { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', label: 'Average' };
  return { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', label: 'Weak' };
}

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchDashboardStats(), fetchAnalysisHistory()])
      .then(([statsRes, historyRes]) => {
        setStats(statsRes.data.data.stats);
        setHistory(historyRes.data.data.history);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        .dp-loader { font-family:'DM Sans',sans-serif; background:#080C12; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:#5E7394; }
        .dp-loader-spinner { width:36px;height:36px;border:3px solid rgba(59,130,246,0.15);border-top-color:#3B82F6;border-radius:50%;animation:spin 0.8s linear infinite; }
        .dp-loader-text { font-size:14px; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>
      <div className="dp-loader">
        <div className="dp-loader-spinner" />
        <span className="dp-loader-text">Loading dashboard...</span>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .dp-root {
          font-family:'DM Sans',sans-serif;
          background:#080C12;
          color:#E8EDF5;
          min-height:100vh;
          position:relative;
          overflow-x:hidden;
        }

        .dp-root::before {
          content:'';
          position:fixed;
          inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none;
          z-index:0;
          opacity:0.4;
        }

        .dp-grid-bg {
          position:fixed;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
          background-size:60px 60px;
          mask-image:radial-gradient(ellipse 80% 50% at 50% 0%,black 30%,transparent 100%);
          pointer-events:none;
          z-index:0;
        }

        .dp-nav {
          position:sticky;
          top:0;
          z-index:100;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:16px 48px;
          background:rgba(8,12,18,0.85);
          backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }

        .dp-logo {
          font-family:'Syne',sans-serif;
          font-weight:800;
          font-size:18px;
          letter-spacing:-0.5px;
          color:#fff;
          text-decoration:none;
          display:flex;
          align-items:center;
          gap:8px;
        }

        .dp-logo-dot {
          width:8px;height:8px;
          border-radius:50%;
          background:#3B82F6;
          box-shadow:0 0 12px #3B82F6;
          animation:pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.6;transform:scale(0.8);}
        }

        .dp-btn-primary {
          background:#3B82F6;
          color:#fff;
          border:none;
          border-radius:8px;
          padding:9px 18px;
          font-family:'DM Sans',sans-serif;
          font-size:13px;
          font-weight:500;
          cursor:pointer;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:6px;
          transition:all 0.2s ease;
        }

        .dp-btn-primary:hover {
          background:#2563EB;
          transform:translateY(-1px);
          box-shadow:0 6px 20px rgba(59,130,246,0.3);
        }

        .dp-content {
          position:relative;
          z-index:1;
          max-width:1100px;
          margin:0 auto;
          padding:48px 24px 80px;
          display:flex;
          flex-direction:column;
          gap:24px;
          animation:fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }

        .dp-hero {
          background:rgba(13,17,23,0.8);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:18px;
          padding:40px 44px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:24px;
          position:relative;
          overflow:hidden;
          flex-wrap:wrap;
        }

        .dp-hero::before {
          content:'';
          position:absolute;
          top:0;left:10%;right:10%;
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(59,130,246,0.5),transparent);
        }

        .dp-hero-glow {
          position:absolute;
          top:-80px;right:-80px;
          width:320px;height:240px;
          background:radial-gradient(ellipse,rgba(59,130,246,0.07),transparent 70%);
          pointer-events:none;
        }

        .dp-eyebrow {
          font-size:11px;
          font-weight:600;
          letter-spacing:2px;
          text-transform:uppercase;
          color:#3B82F6;
          margin-bottom:10px;
          display:flex;
          align-items:center;
          gap:8px;
        }

        .dp-eyebrow::before {
          content:'';
          width:18px;height:2px;
          background:#3B82F6;
          border-radius:2px;
        }

        .dp-hero h1 {
          font-family:'Syne',sans-serif;
          font-size:clamp(22px,3vw,30px);
          font-weight:800;
          letter-spacing:-0.8px;
          margin-bottom:8px;
          max-width:520px;
        }

        .dp-hero p {
          font-size:14px;
          color:#5E7394;
          font-weight:300;
          line-height:1.65;
          max-width:480px;
        }

        .dp-hero-btn {
          background:#3B82F6;
          color:#fff;
          border:none;
          border-radius:10px;
          padding:14px 28px;
          font-family:'Syne',sans-serif;
          font-size:14px;
          font-weight:700;
          cursor:pointer;
          text-decoration:none;
          white-space:nowrap;
          display:inline-flex;
          align-items:center;
          gap:8px;
          transition:all 0.2s ease;
          flex-shrink:0;
        }

        .dp-hero-btn:hover {
          background:#2563EB;
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(59,130,246,0.3);
        }

        .dp-stats {
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:16px;
        }

        @media(max-width:900px){ .dp-stats{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:500px){ .dp-stats{grid-template-columns:1fr;} }

        .dp-stat {
          background:rgba(13,17,23,0.8);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;
          padding:24px 24px 20px;
          transition:border-color 0.3s,transform 0.3s;
          position:relative;
          overflow:hidden;
        }

        .dp-stat:hover {
          border-color:rgba(59,130,246,0.2);
          transform:translateY(-2px);
        }

        .dp-stat-accent {
          position:absolute;
          top:0;left:0;right:0;
          height:2px;
          border-radius:14px 14px 0 0;
        }

        .dp-stat-label {
          font-size:11px;
          font-weight:600;
          letter-spacing:1.5px;
          text-transform:uppercase;
          color:#5E7394;
          margin-bottom:12px;
        }

        .dp-stat-value {
          font-family:'Syne',sans-serif;
          font-size:36px;
          font-weight:800;
          line-height:1;
          margin-bottom:6px;
        }

        .dp-stat-helper {
          font-size:12px;
          color:#2E3D52;
        }

        .dp-table-card {
          background:rgba(13,17,23,0.8);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px;
          overflow:hidden;
          transition:border-color 0.3s;
        }

        .dp-table-card:hover { border-color:rgba(59,130,246,0.12); }

        .dp-table-header {
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:24px 28px 20px;
          border-bottom:1px solid rgba(255,255,255,0.06);
          flex-wrap:wrap;
          gap:12px;
        }

        .dp-table-title {
          font-family:'Syne',sans-serif;
          font-size:17px;
          font-weight:700;
          color:#E8EDF5;
        }

        .dp-table-link {
          font-size:13px;
          color:#60A5FA;
          text-decoration:none;
          font-weight:500;
          transition:color 0.2s;
        }

        .dp-table-link:hover { color:#93C5FD; }

        .dp-table-wrap { overflow-x:auto; }

        .dp-table {
          width:100%;
          border-collapse:collapse;
          font-size:13px;
        }

        .dp-table thead tr {
          background:rgba(255,255,255,0.02);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }

        .dp-table th {
          padding:12px 20px;
          text-align:left;
          font-size:11px;
          font-weight:600;
          letter-spacing:1px;
          text-transform:uppercase;
          color:#2E3D52;
          white-space:nowrap;
        }

        .dp-table tbody tr {
          border-bottom:1px solid rgba(255,255,255,0.04);
          transition:background 0.2s;
        }

        .dp-table tbody tr:last-child { border-bottom:none; }
        .dp-table tbody tr:hover { background:rgba(255,255,255,0.02); }

        .dp-table td {
          padding:14px 20px;
          color:#8B9BB4;
          white-space:nowrap;
        }

        .dp-table td:first-child { color:#C4D0E3; font-weight:500; }

        .dp-score-pill {
          display:inline-flex;
          align-items:center;
          gap:5px;
          padding:4px 10px;
          border-radius:100px;
          font-size:12px;
          font-weight:600;
        }

        .dp-score-dot { width:5px;height:5px;border-radius:50%; }

        .dp-open-link {
          color:#60A5FA;
          text-decoration:none;
          font-size:12px;
          font-weight:500;
          display:inline-flex;
          align-items:center;
          gap:4px;
          padding:5px 12px;
          border:1px solid rgba(59,130,246,0.2);
          border-radius:6px;
          transition:all 0.2s;
          background:rgba(59,130,246,0.05);
        }

        .dp-open-link:hover {
          background:rgba(59,130,246,0.12);
          border-color:rgba(59,130,246,0.4);
          color:#93C5FD;
        }

        .dp-empty {
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          padding:64px 24px;
          gap:12px;
        }

        .dp-empty-icon {
          width:56px;height:56px;
          border-radius:14px;
          background:rgba(59,130,246,0.08);
          border:1px solid rgba(59,130,246,0.15);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:24px;
          margin-bottom:4px;
        }

        .dp-empty h4 {
          font-family:'Syne',sans-serif;
          font-size:17px;
          font-weight:700;
          color:#C4D0E3;
        }

        .dp-empty p {
          font-size:13px;
          color:#5E7394;
          max-width:280px;
          line-height:1.6;
        }

        .dp-empty-btn {
          margin-top:8px;
          background:#3B82F6;
          color:#fff;
          border:none;
          border-radius:8px;
          padding:11px 22px;
          font-family:'DM Sans',sans-serif;
          font-size:13px;
          font-weight:500;
          cursor:pointer;
          text-decoration:none;
          transition:all 0.2s;
          display:inline-block;
        }

        .dp-empty-btn:hover {
          background:#2563EB;
          transform:translateY(-1px);
          box-shadow:0 6px 18px rgba(59,130,246,0.28);
        }

        .dp-footer {
          position:relative;
          z-index:1;
          text-align:center;
          padding:20px;
          font-size:12px;
          color:#1E2A38;
          border-top:1px solid rgba(255,255,255,0.04);
        }

        @media(max-width:640px){
          .dp-nav{padding:14px 20px;}
          .dp-content{padding:32px 16px 60px;}
          .dp-hero{padding:28px 24px;}
        }
      `}</style>

      <Navbar />

      <div className="dp-root">
        <div className="dp-grid-bg" />
        {/* nav removed - using shared Navbar component */}

        <div className="dp-content">

          {/* HERO */}
          <div className="dp-hero">
            <div className="dp-hero-glow" />
            <div>
              <p className="dp-eyebrow">Placement Portfolio</p>
              <h1>Track Resume Quality Like a Product Metric</h1>
              <p>Upload, analyze, fix keyword gaps, and improve ATS score before every application.</p>
            </div>
            <Link to="/upload" className="dp-hero-btn">Run New Analysis →</Link>
          </div>

          {/* STATS */}
          <div className="dp-stats">
            {[
              { label: 'Total Resumes',  value: stats.resumeCount,   helper: 'Versions uploaded',     accent: '#EF4444' },
              { label: 'Total Analyses', value: stats.analysisCount,  helper: 'Evaluation runs',       accent: '#22C55E' },
              { label: 'Latest ATS',     value: stats.latestAtsScore, helper: 'Most recent score',     accent: '#3B82F6' },
              { label: 'Average ATS',    value: stats.avgAtsScore,    helper: 'Overall quality trend', accent: '#F59E0B' },
            ].map((s) => (
              <div className="dp-stat" key={s.label}>
                <div className="dp-stat-accent" style={{ background: s.accent }} />
                <div className="dp-stat-label">{s.label}</div>
                <div className="dp-stat-value" style={{ color: s.accent }}>{s.value ?? '—'}</div>
                <div className="dp-stat-helper">{s.helper}</div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div className="dp-table-card">
            <div className="dp-table-header">
              <span className="dp-table-title">Recent Analyses</span>
              <Link to="/upload" className="dp-table-link">+ New Analysis →</Link>
            </div>

            {history.length ? (
              <div className="dp-table-wrap">
                <table className="dp-table">
                  <thead>
                    <tr>
                      <th>Resume File</th>
                      <th>ATS Score</th>
                      <th>Job Match</th>
                      <th>Date</th>
                      <th>Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => {
                      const ats = scoreTone(item.atsScore);
                      const jm  = scoreTone(item.jobMatchScore);
                      return (
                        <tr key={item._id}>
                          <td>{item.resumeId?.fileName || 'Untitled Resume'}</td>
                          <td>
                            <span className="dp-score-pill" style={{ background: ats.bg, border: `1px solid ${ats.border}`, color: ats.color }}>
                              <span className="dp-score-dot" style={{ background: ats.color }} />
                              {item.atsScore}
                            </span>
                          </td>
                          <td>
                            <span className="dp-score-pill" style={{ background: jm.bg, border: `1px solid ${jm.border}`, color: jm.color }}>
                              <span className="dp-score-dot" style={{ background: jm.color }} />
                              {item.jobMatchScore}
                            </span>
                          </td>
                          <td>{new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                          <td>
                            <Link className="dp-open-link" to={`/analysis/${item._id}`}>View →</Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="dp-empty">
                <div className="dp-empty-icon">📄</div>
                <h4>No analyses yet</h4>
                <p>Upload your first resume and generate an ATS report to get started.</p>
                <Link to="/upload" className="dp-empty-btn">Start Now →</Link>
              </div>
            )}
          </div>

        </div>

        <footer className="dp-footer">
          © {new Date().getFullYear()} CV Forge AI — Powered by Google Gemini AI
        </footer>
      </div>
    </>
  );
}

export default DashboardPage;