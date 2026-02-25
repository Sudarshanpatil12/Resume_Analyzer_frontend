import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { fetchAnalysisById } from '../api/analysisApi';
import Loader from '../components/common/Loader';
import AtsGauge from '../components/analysis/AtsGauge';
import SectionScoreChart from '../components/analysis/SectionScoreChart';
import KeywordGapList from '../components/analysis/KeywordGapList';
import SuggestionList from '../components/analysis/SuggestionList';

function AnalysisPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysisById(id)
      .then((res) => setAnalysis(res.data.data.analysis))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .ap-loader-root {
          font-family: 'DM Sans', sans-serif;
          background: #080C12;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: #5E7394;
        }
        .ap-loader-spinner {
          width: 36px; height: 36px;
          border: 3px solid rgba(59,130,246,0.15);
          border-top-color: #3B82F6;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .ap-loader-text { font-size: 14px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="ap-loader-root">
        <div className="ap-loader-spinner" />
        <span className="ap-loader-text">Fetching analysis...</span>
      </div>
    </>
  );

  if (!analysis) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400&display=swap');
        .ap-empty { font-family: 'DM Sans', sans-serif; background: #080C12; min-height: 100vh; display: flex; align-items: center; justify-content: center; color: #5E7394; font-size: 15px; }
      `}</style>
      <div className="ap-empty">No analysis found.</div>
    </>
  );

  const atsScore = analysis.atsScore ?? 0;
  const jobScore = analysis.jobMatchScore ?? 0;

  const getScoreColor = (score) => {
    if (score >= 75) return '#22C55E';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Strong';
    if (score >= 50) return 'Average';
    return 'Weak';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-root {
          font-family: 'DM Sans', sans-serif;
          background: #080C12;
          color: #E8EDF5;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .ap-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .ap-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* NAV */
        .ap-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(8,12,18,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .ap-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: -0.5px;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ap-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #3B82F6;
          box-shadow: 0 0 12px #3B82F6;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }

        .ap-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ap-btn-ghost {
          background: rgba(255,255,255,0.05);
          color: #C4D0E3;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 9px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .ap-btn-ghost:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.18);
        }

        .ap-btn-primary {
          background: #3B82F6;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 9px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .ap-btn-primary:hover {
          background: #2563EB;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(59,130,246,0.3);
        }

        /* CONTENT */
        .ap-content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* HEADER CARD */
        .ap-header-card {
          background: rgba(13,17,23,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 36px 40px;
          position: relative;
          overflow: hidden;
        }

        .ap-header-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);
        }

        .ap-header-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 300px; height: 200px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.07), transparent 70%);
          pointer-events: none;
        }

        .ap-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #3B82F6;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ap-eyebrow::before {
          content: '';
          width: 18px; height: 2px;
          background: #3B82F6;
          border-radius: 2px;
        }

        .ap-header-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 10px;
        }

        .ap-header-sub {
          font-size: 14px;
          color: #5E7394;
          font-weight: 300;
          max-width: 520px;
          line-height: 1.6;
        }

        /* SCORES ROW */
        .ap-scores-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 640px) {
          .ap-scores-row { grid-template-columns: 1fr; }
          .ap-nav { padding: 14px 20px; }
          .ap-header-card { padding: 24px 20px; }
          .ap-content { padding: 32px 16px 60px; }
        }

        .ap-score-card {
          background: rgba(13,17,23,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 32px 28px;
          display: flex;
          align-items: center;
          gap: 24px;
          transition: border-color 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }

        .ap-score-card:hover {
          border-color: rgba(59,130,246,0.2);
          transform: translateY(-2px);
        }

        .ap-score-ring {
          position: relative;
          width: 88px;
          height: 88px;
          flex-shrink: 0;
        }

        .ap-score-ring svg {
          transform: rotate(-90deg);
          width: 88px;
          height: 88px;
        }

        .ap-score-ring-bg {
          fill: none;
          stroke: rgba(255,255,255,0.06);
          stroke-width: 6;
        }

        .ap-score-ring-fill {
          fill: none;
          stroke-width: 6;
          stroke-linecap: round;
          transition: stroke-dashoffset 1s ease;
        }

        .ap-score-num {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #F0F4FC;
        }

        .ap-score-info { flex: 1; }

        .ap-score-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #5E7394;
          margin-bottom: 6px;
        }

        .ap-score-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #F0F4FC;
          margin-bottom: 6px;
        }

        .ap-score-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
        }

        .ap-score-pill-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
        }

        /* SECTION CARD */
        .ap-section-card {
          background: rgba(13,17,23,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 32px 32px;
          transition: border-color 0.3s;
        }

        .ap-section-card:hover {
          border-color: rgba(59,130,246,0.15);
        }

        .ap-section-heading {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #E8EDF5;
          margin-bottom: 4px;
        }

        .ap-section-sub {
          font-size: 13px;
          color: #5E7394;
          margin-bottom: 24px;
          font-weight: 300;
        }

        /* COMPONENTS WRAPPER */
        .ap-component-wrap > * {
          /* child components inherit the dark theme context */
        }

        /* FOOTER */
        .ap-footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #1E2A38;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
      `}</style>

      <Navbar />

      <div className="ap-root">
        <div className="ap-grid-bg" />
        {/* nav removed - using shared Navbar component */}

        {/* CONTENT */}
        <div className="ap-content">

          {/* HEADER */}
          <div className="ap-header-card">
            <div className="ap-header-glow" />
            <p className="ap-eyebrow">Analysis Report</p>
            <h1 className="ap-header-title">Resume Intelligence Dashboard</h1>
            <p className="ap-header-sub">
              Review your ATS score, keyword gaps, section breakdown, and AI-powered suggestions before applying.
            </p>
          </div>

          {/* SCORE CARDS */}
          <div className="ap-scores-row">
            {[
              { score: atsScore, label: 'ATS Score', title: 'ATS Compatibility' },
              { score: jobScore, label: 'Job Match', title: 'Role Fit Score' },
            ].map(({ score, label, title }) => {
              const color = getScoreColor(score);
              const statusLabel = getScoreLabel(score);
              const r = 36;
              const circ = 2 * Math.PI * r;
              const offset = circ - (score / 100) * circ;

              return (
                <div className="ap-score-card" key={label}>
                  <div className="ap-score-ring">
                    <svg viewBox="0 0 88 88">
                      <circle className="ap-score-ring-bg" cx="44" cy="44" r={r} />
                      <circle
                        className="ap-score-ring-fill"
                        cx="44" cy="44" r={r}
                        stroke={color}
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                      />
                    </svg>
                    <div className="ap-score-num">{score}</div>
                  </div>
                  <div className="ap-score-info">
                    <div className="ap-score-label">{label}</div>
                    <div className="ap-score-title">{title}</div>
                    <div className="ap-score-pill" style={{
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      color: color
                    }}>
                      <span className="ap-score-pill-dot" style={{ background: color }} />
                      {statusLabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECTION SCORE CHART */}
          <div className="ap-section-card">
            <h2 className="ap-section-heading">Section Breakdown</h2>
            <p className="ap-section-sub">Score for each resume section analyzed by AI</p>
            <div className="ap-component-wrap">
              <SectionScoreChart sectionScores={analysis.sectionScores} />
            </div>
          </div>

          {/* KEYWORD GAP */}
          <div className="ap-section-card">
            <h2 className="ap-section-heading">Keyword Gap Analysis</h2>
            <p className="ap-section-sub">Matched and missing keywords compared to the job description</p>
            <div className="ap-component-wrap">
              <KeywordGapList
                matched={analysis.matchedKeywords}
                missing={analysis.missingKeywords}
              />
            </div>
          </div>

          {/* SUGGESTIONS */}
          <div className="ap-section-card">
            <h2 className="ap-section-heading">AI Recommendations</h2>
            <p className="ap-section-sub">Strengths, improvements, and final verdict from Gemini AI</p>
            <div className="ap-component-wrap">
              <SuggestionList
                strengths={analysis.strengths}
                improvements={analysis.improvements}
                verdict={analysis.finalVerdict}
              />
            </div>
          </div>

          {/* CTA ROW */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: '8px'
          }}>
            <Link to="/upload" className="ap-btn-primary" style={{ padding: '12px 28px', fontSize: '14px' }}>
              Analyze Another Resume →
            </Link>
            <Link to="/dashboard" className="ap-btn-ghost" style={{ padding: '12px 28px', fontSize: '14px' }}>
              View Dashboard
            </Link>
          </div>

        </div>

        <footer className="ap-footer">
          © {new Date().getFullYear()} CV Forge AI — Powered by Google Gemini AI
        </footer>
      </div>
    </>
  );
}

export default AnalysisPage;