import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

function JobMatchPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .jm-root {
          font-family:'DM Sans',sans-serif;
          background:#080C12;
          color:#E8EDF5;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          position:relative;
          overflow:hidden;
        }

        .jm-root::before {
          content:'';
          position:fixed;
          inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none;
          z-index:0;
          opacity:0.4;
        }

        .jm-grid-bg {
          position:fixed;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
          background-size:60px 60px;
          mask-image:radial-gradient(ellipse 80% 60% at 50% 40%,black 30%,transparent 100%);
          pointer-events:none;
          z-index:0;
        }

        .jm-glow {
          position:fixed;
          top:15%;left:50%;
          transform:translateX(-50%);
          width:600px;height:300px;
          background:radial-gradient(ellipse,rgba(59,130,246,0.09) 0%,transparent 70%);
          pointer-events:none;
          z-index:0;
        }

        /* NAV */
        .jm-nav {
          position:relative;
          z-index:10;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:16px 48px;
          border-bottom:1px solid rgba(255,255,255,0.06);
          background:rgba(8,12,18,0.8);
          backdrop-filter:blur(16px);
        }

        .jm-logo {
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

        .jm-logo-dot {
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

        .jm-nav-links { display:flex;gap:8px;align-items:center; }

        .jm-btn-ghost {
          background:rgba(255,255,255,0.05);
          color:#C4D0E3;
          border:1px solid rgba(255,255,255,0.1);
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

        .jm-btn-ghost:hover {
          background:rgba(255,255,255,0.09);
          border-color:rgba(255,255,255,0.18);
        }

        .jm-btn-primary {
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

        .jm-btn-primary:hover {
          background:#2563EB;
          transform:translateY(-1px);
          box-shadow:0 6px 20px rgba(59,130,246,0.3);
        }

        /* MAIN */
        .jm-main {
          position:relative;
          z-index:1;
          flex:1;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:60px 24px;
        }

        .jm-inner {
          width:100%;
          max-width:720px;
          display:flex;
          flex-direction:column;
          gap:28px;
          animation:fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }

        /* HERO CARD */
        .jm-hero-card {
          background:rgba(13,17,23,0.85);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:20px;
          padding:44px 48px;
          position:relative;
          overflow:hidden;
          text-align:center;
        }

        .jm-hero-card::before {
          content:'';
          position:absolute;
          top:0;left:15%;right:15%;
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(59,130,246,0.6),transparent);
        }

        .jm-hero-glow-inner {
          position:absolute;
          top:-60px;left:50%;
          transform:translateX(-50%);
          width:400px;height:200px;
          background:radial-gradient(ellipse,rgba(59,130,246,0.08),transparent 70%);
          pointer-events:none;
        }

        .jm-badge {
          display:inline-flex;
          align-items:center;
          gap:6px;
          background:rgba(59,130,246,0.1);
          border:1px solid rgba(59,130,246,0.25);
          border-radius:100px;
          padding:5px 14px;
          font-size:11px;
          font-weight:500;
          color:#93C5FD;
          letter-spacing:0.5px;
          text-transform:uppercase;
          margin-bottom:22px;
        }

        .jm-badge-dot {
          width:5px;height:5px;
          border-radius:50%;
          background:#3B82F6;
          box-shadow:0 0 6px #3B82F6;
        }

        .jm-icon-wrap {
          width:72px;height:72px;
          border-radius:18px;
          background:rgba(59,130,246,0.08);
          border:1px solid rgba(59,130,246,0.18);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:32px;
          margin:0 auto 24px;
        }

        .jm-title {
          font-family:'Syne',sans-serif;
          font-size:clamp(26px,4vw,36px);
          font-weight:800;
          letter-spacing:-1px;
          margin-bottom:14px;
          color:#F0F4FC;
        }

        .jm-desc {
          font-size:15px;
          color:#5E7394;
          line-height:1.7;
          font-weight:300;
          max-width:480px;
          margin:0 auto 32px;
        }

        .jm-cta-row {
          display:flex;
          gap:12px;
          justify-content:center;
          flex-wrap:wrap;
        }

        .jm-cta-primary {
          background:#3B82F6;
          color:#fff;
          border:none;
          border-radius:10px;
          padding:14px 28px;
          font-family:'Syne',sans-serif;
          font-size:15px;
          font-weight:700;
          cursor:pointer;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:8px;
          transition:all 0.2s ease;
        }

        .jm-cta-primary:hover {
          background:#2563EB;
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(59,130,246,0.32);
        }

        .jm-cta-ghost {
          background:rgba(255,255,255,0.05);
          color:#C4D0E3;
          border:1px solid rgba(255,255,255,0.1);
          border-radius:10px;
          padding:14px 28px;
          font-family:'DM Sans',sans-serif;
          font-size:15px;
          font-weight:500;
          cursor:pointer;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          transition:all 0.2s ease;
        }

        .jm-cta-ghost:hover {
          background:rgba(255,255,255,0.09);
          border-color:rgba(255,255,255,0.2);
          transform:translateY(-2px);
        }

        /* HOW IT WORKS */
        .jm-steps {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:16px;
        }

        @media(max-width:600px){
          .jm-steps{grid-template-columns:1fr;}
          .jm-nav{padding:14px 20px;}
          .jm-hero-card{padding:32px 24px;}
        }

        .jm-step {
          background:rgba(13,17,23,0.8);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;
          padding:24px 22px;
          transition:border-color 0.3s,transform 0.3s;
        }

        .jm-step:hover {
          border-color:rgba(59,130,246,0.25);
          transform:translateY(-3px);
        }

        .jm-step-num {
          font-family:'Syne',sans-serif;
          font-size:36px;
          font-weight:800;
          color:rgba(59,130,246,0.15);
          line-height:1;
          margin-bottom:12px;
          display:block;
        }

        .jm-step h4 {
          font-family:'Syne',sans-serif;
          font-size:14px;
          font-weight:700;
          color:#C4D0E3;
          margin-bottom:6px;
        }

        .jm-step p {
          font-size:13px;
          color:#5E7394;
          line-height:1.6;
        }

        /* WHAT YOU GET */
        .jm-perks {
          background:rgba(13,17,23,0.8);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px;
          padding:28px 32px;
        }

        .jm-perks-title {
          font-family:'Syne',sans-serif;
          font-size:15px;
          font-weight:700;
          color:#E8EDF5;
          margin-bottom:16px;
        }

        .jm-perks-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
        }

        @media(max-width:480px){ .jm-perks-grid{grid-template-columns:1fr;} }

        .jm-perk {
          display:flex;
          align-items:center;
          gap:10px;
          font-size:13px;
          color:#8B9BB4;
        }

        .jm-perk-icon {
          width:20px;height:20px;
          border-radius:6px;
          background:rgba(59,130,246,0.12);
          border:1px solid rgba(59,130,246,0.25);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:11px;
          color:#60A5FA;
          flex-shrink:0;
        }

        /* FOOTER */
        .jm-footer {
          position:relative;
          z-index:1;
          text-align:center;
          padding:20px;
          font-size:12px;
          color:#1E2A38;
          border-top:1px solid rgba(255,255,255,0.04);
        }
      `}</style>

      <Navbar />

      <div className="jm-root">
        <div className="jm-grid-bg" />
        <div className="jm-glow" />
        {/* nav removed - using shared Navbar component */}

        {/* MAIN */}
        <main className="jm-main">
          <div className="jm-inner">

            {/* HERO */}
            <div className="jm-hero-card">
              <div className="jm-hero-glow-inner" />

              <div className="jm-badge">
                <span className="jm-badge-dot" />
                Powered by Gemini AI
              </div>

              <div className="jm-icon-wrap">🎯</div>

              <h1 className="jm-title">Job Match Studio</h1>
              <p className="jm-desc">
                Paste any job description on the upload page and run an analysis to get your
                role match score, missing keywords, and AI-powered rewrite suggestions — all in one report.
              </p>

              <div className="jm-cta-row">
                <Link to="/upload" className="jm-cta-primary">
                  Go to Upload & Analyze →
                </Link>
                <Link to="/dashboard" className="jm-cta-ghost">
                  View Past Reports
                </Link>
              </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="jm-steps">
              {[
                { n: '01', title: 'Upload Resume',       desc: 'Upload your PDF or DOCX file on the analysis page.' },
                { n: '02', title: 'Paste Job Description', desc: 'Add the JD of the role you are targeting for precision matching.' },
                { n: '03', title: 'Get Match Report',    desc: 'See role fit score, keyword gaps, and AI bullet suggestions.' },
              ].map((s) => (
                <div className="jm-step" key={s.n}>
                  <span className="jm-step-num">{s.n}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* PERKS */}
            <div className="jm-perks">
              <p className="jm-perks-title">What you get from Job Match Analysis</p>
              <div className="jm-perks-grid">
                {[
                  'Role fit score out of 100',
                  'Matched keywords highlighted',
                  'Missing keywords listed clearly',
                  'AI rewrite suggestions for bullets',
                  'Section-wise quality breakdown',
                  'Final verdict from Gemini AI',
                ].map((p) => (
                  <div className="jm-perk" key={p}>
                    <div className="jm-perk-icon">✓</div>
                    {p}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        <footer className="jm-footer">
          © {new Date().getFullYear()} CV Forge AI — Powered by Google Gemini AI
        </footer>
      </div>
    </>
  );
}

export default JobMatchPage;