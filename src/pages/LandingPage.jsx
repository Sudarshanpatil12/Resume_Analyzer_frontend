import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/common/Navbar';

function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          background: #080C12;
          color: #E8EDF5;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── NOISE OVERLAY ── */
        .lp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* ── NAV ── */
        .lp-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 48px;
          background: rgba(8,12,18,0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .lp-logo {
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

        .lp-logo-dot {
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

        .lp-nav-links {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        /* ── HERO ── */
        .lp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          z-index: 1;
          overflow: hidden;
        }

        .lp-hero-glow {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .lp-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%);
          pointer-events: none;
        }

        .lp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 500;
          color: #93C5FD;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease both;
        }

        .lp-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #3B82F6;
          box-shadow: 0 0 8px #3B82F6;
        }

        .lp-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          max-width: 800px;
          margin-bottom: 24px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .lp-h1 .accent {
          background: linear-gradient(135deg, #3B82F6, #60A5FA, #93C5FD);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-subtext {
          font-size: 17px;
          font-weight: 300;
          color: #8B9BB4;
          max-width: 540px;
          line-height: 1.7;
          margin-bottom: 40px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .lp-cta-row {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .btn-primary {
          background: #3B82F6;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 14px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 0 0 0 rgba(59,130,246,0.4);
        }

        .btn-primary:hover {
          background: #2563EB;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59,130,246,0.35);
        }

        .btn-ghost {
          background: rgba(255,255,255,0.05);
          color: #C4D0E3;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 14px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .btn-ghost:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        /* ── STATS BAR ── */
        .lp-stats {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          gap: 0;
          padding: 0 24px 80px;
          flex-wrap: wrap;
        }

        .lp-stat {
          flex: 1;
          min-width: 160px;
          max-width: 220px;
          text-align: center;
          padding: 28px 24px;
          border: 1px solid rgba(255,255,255,0.06);
          border-right: none;
          background: rgba(255,255,255,0.02);
        }

        .lp-stat:first-child { border-radius: 12px 0 0 12px; }
        .lp-stat:last-child { border-radius: 0 12px 12px 0; border-right: 1px solid rgba(255,255,255,0.06); }

        .lp-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          display: block;
        }

        .lp-stat-label {
          font-size: 13px;
          color: #5E7394;
          margin-top: 4px;
          display: block;
        }

        /* ── SECTION ── */
        .lp-section {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 100px;
        }

        .lp-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #3B82F6;
          margin-bottom: 12px;
        }

        .lp-section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 56px;
          max-width: 480px;
        }

        /* ── FEATURE CARDS ── */
        .lp-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
        }

        .lp-card {
          background: #0D1117;
          padding: 36px 32px;
          transition: background 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .lp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3B82F6, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lp-card:hover { background: #111720; }
        .lp-card:hover::before { opacity: 1; }

        .lp-card-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 20px;
        }

        .lp-card h3 {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #E8EDF5;
        }

        .lp-card p {
          font-size: 14px;
          color: #5E7394;
          line-height: 1.65;
        }

        /* ── HOW IT WORKS ── */
        .lp-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .lp-step {
          position: relative;
          padding: 32px 28px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s, transform 0.3s;
        }

        .lp-step:hover {
          border-color: rgba(59,130,246,0.3);
          transform: translateY(-4px);
        }

        .lp-step-num {
          font-family: 'Syne', sans-serif;
          font-size: 48px;
          font-weight: 800;
          color: rgba(59,130,246,0.15);
          line-height: 1;
          margin-bottom: 16px;
          display: block;
        }

        .lp-step h4 {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #E8EDF5;
        }

        .lp-step p {
          font-size: 13px;
          color: #5E7394;
          line-height: 1.6;
        }

        /* ── FEATURES LIST ── */
        .lp-feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .lp-feature-grid { grid-template-columns: 1fr; }
          .lp-nav { padding: 14px 20px; }
          .lp-stat:last-child, .lp-stat:first-child { border-radius: 0; }
        }

        .lp-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.2s;
        }

        .lp-feature-item:hover { border-color: rgba(59,130,246,0.25); }

        .lp-feature-check {
          width: 22px; height: 22px;
          border-radius: 6px;
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(59,130,246,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          font-size: 12px;
          color: #60A5FA;
        }

        .lp-feature-item span {
          font-size: 14px;
          color: #8B9BB4;
          line-height: 1.5;
        }

        /* ── FINAL CTA ── */
        .lp-final {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 100px;
        }

        .lp-final-inner {
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 20px;
          padding: 64px 48px;
          text-align: center;
          background: linear-gradient(135deg, rgba(59,130,246,0.05), rgba(8,12,18,0));
          position: relative;
          overflow: hidden;
        }

        .lp-final-inner::before {
          content: '';
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 200px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.1), transparent 70%);
          pointer-events: none;
        }

        .lp-final-inner h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }

        .lp-final-inner p {
          font-size: 16px;
          color: #5E7394;
          margin-bottom: 32px;
        }

        /* ── FOOTER ── */
        .lp-footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 13px;
          color: #2E3D52;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar />

      <div className="lp-root">

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero-glow" />
          <div className="lp-hero-grid" />

          <div className="lp-badge">
            <span className="lp-badge-dot" />
            Powered by Google Gemini AI
          </div>

          <h1 className="lp-h1">
            Build Resumes That<br />
            <span className="accent">Pass Every ATS</span>
          </h1>

          <p className="lp-subtext">
            Upload your resume, paste a job description, and get an instant ATS score,
            keyword gap analysis, and AI-powered improvement suggestions.
          </p>

          <div className="lp-cta-row">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary">
                  Analyze My Resume →
                </Link>
                <Link to="/login" className="btn-ghost">Login</Link>
              </>
            )}
          </div>
        </section>

        {/* STATS */}
        <div className="lp-stats">
          {[
            { num: '95%', label: 'Keyword Accuracy' },
            { num: '500+', label: 'Resumes Analyzed' },
            { num: '3x', label: 'Interview Callback Rate' },
            { num: 'Free', label: 'No Credit Card Needed' },
          ].map((s) => (
            <div className="lp-stat" key={s.label}>
              <span className="lp-stat-num">{s.num}</span>
              <span className="lp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* WHAT IT DOES */}
        <section className="lp-section">
          <p className="lp-section-label">Platform Features</p>
          <h2 className="lp-section-title">Everything you need to land the interview</h2>

          <div className="lp-cards">
            {[
              { icon: '📄', title: 'Resume Parsing', desc: 'Upload PDF, DOC, or DOCX. Our parser extracts all content automatically — no manual input needed.' },
              { icon: '🎯', title: 'ATS Score Analysis', desc: 'Get a detailed ATS compatibility score with section-wise breakdown — Summary, Skills, Experience, and more.' },
              { icon: '🔍', title: 'Keyword Gap Analysis', desc: 'Compare your resume against any job description. See matched and missing keywords instantly.' },
              { icon: '✍️', title: 'AI Bullet Rewriter', desc: 'Weak bullet points get rewritten by Gemini AI with action verbs, metrics, and impact-first framing.' },
              { icon: '📊', title: 'Job Match Score', desc: 'Quantified role-fit score based on skills overlap, experience relevance, and keyword density.' },
              { icon: '🗂️', title: 'Dashboard History', desc: 'All your past analyses saved. Track improvement over time and revisit any previous report.' },
            ].map((c) => (
              <div className="lp-card" key={c.title}>
                <div className="lp-card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="lp-section">
          <p className="lp-section-label">How It Works</p>
          <h2 className="lp-section-title">From upload to offer in 4 steps</h2>

          <div className="lp-steps">
            {[
              { n: '01', title: 'Create Account', desc: 'Sign up free and access your personal resume analysis dashboard.' },
              { n: '02', title: 'Upload Resume', desc: 'Upload your PDF or DOCX file. System parses and extracts all content.' },
              { n: '03', title: 'Add Job Description', desc: 'Paste the JD of your target role for precise keyword matching.' },
              { n: '04', title: 'Get ATS Report', desc: 'See your score, keyword gaps, section ratings, and AI suggestions.' },
            ].map((s) => (
              <div className="lp-step" key={s.n}>
                <span className="lp-step-num">{s.n}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO SHOULD USE IT */}
        <section className="lp-section">
          <p className="lp-section-label">Built For</p>
          <h2 className="lp-section-title">Who gets the most value</h2>

          <div className="lp-feature-grid">
            {[
              'Final year students preparing for campus placements',
              'Freshers applying for internships and full-time roles',
              'Developers optimizing resume for ATS shortlisting',
              'Anyone who wants data-driven resume improvement',
              'Job seekers targeting specific company JDs',
              'Candidates with multiple resume versions to compare',
            ].map((item) => (
              <div className="lp-feature-item" key={item}>
                <div className="lp-feature-check">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="lp-final">
          <div className="lp-final-inner">
            <h2>Ready to get shortlisted?</h2>
            <p>Start for free — no credit card required. Get your ATS score in under 60 seconds.</p>
            <div className="lp-cta-row" style={{ justifyContent: 'center' }}>
              {isAuthenticated ? (
                <Link to="/upload" className="btn-primary">Analyze My Resume →</Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary">Sign Up Free →</Link>
                  <Link to="/login" className="btn-ghost">Login</Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          © {new Date().getFullYear()} CV Forge AI — Built with React + Gemini AI
        </footer>

      </div>
    </>
  );
}

export default LandingPage;