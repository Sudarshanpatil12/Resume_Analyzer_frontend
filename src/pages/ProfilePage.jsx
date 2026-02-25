import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/common/Navbar';

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleColor = (role) => {
    if (role === 'admin') return { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' };
    return { color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' };
  };

  const roleStyle = getRoleColor(user?.role);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .pp-root {
          font-family:'DM Sans',sans-serif;
          background:#080C12;
          color:#E8EDF5;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          position:relative;
          overflow-x:hidden;
        }

        .pp-root::before {
          content:'';
          position:fixed;
          inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none;
          z-index:0;
          opacity:0.4;
        }

        .pp-grid-bg {
          position:fixed;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
          background-size:60px 60px;
          mask-image:radial-gradient(ellipse 80% 60% at 50% 20%,black 30%,transparent 100%);
          pointer-events:none;
          z-index:0;
        }

        .pp-glow {
          position:fixed;
          top:10%;left:50%;
          transform:translateX(-50%);
          width:500px;height:280px;
          background:radial-gradient(ellipse,rgba(59,130,246,0.08) 0%,transparent 70%);
          pointer-events:none;
          z-index:0;
        }

        /* NAV */
        .pp-nav {
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

        .pp-logo {
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

        .pp-logo-dot {
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

        .pp-nav-links { display:flex;gap:8px;align-items:center; }

        .pp-btn-ghost {
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

        .pp-btn-ghost:hover {
          background:rgba(255,255,255,0.09);
          border-color:rgba(255,255,255,0.18);
        }

        .pp-btn-primary {
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

        .pp-btn-primary:hover {
          background:#2563EB;
          transform:translateY(-1px);
          box-shadow:0 6px 20px rgba(59,130,246,0.3);
        }

        /* CONTENT */
        .pp-content {
          position:relative;
          z-index:1;
          max-width:720px;
          margin:0 auto;
          padding:48px 24px 80px;
          display:flex;
          flex-direction:column;
          gap:20px;
          animation:fadeUp 0.5s ease both;
          width:100%;
        }

        @keyframes fadeUp {
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }

        /* PROFILE HERO CARD */
        .pp-hero-card {
          background:rgba(13,17,23,0.85);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:20px;
          padding:40px 40px 36px;
          position:relative;
          overflow:hidden;
        }

        .pp-hero-card::before {
          content:'';
          position:absolute;
          top:0;left:10%;right:10%;
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(59,130,246,0.55),transparent);
        }

        .pp-hero-glow {
          position:absolute;
          top:-60px;right:-60px;
          width:280px;height:200px;
          background:radial-gradient(ellipse,rgba(59,130,246,0.07),transparent 70%);
          pointer-events:none;
        }

        .pp-eyebrow {
          font-size:11px;
          font-weight:600;
          letter-spacing:2px;
          text-transform:uppercase;
          color:#3B82F6;
          margin-bottom:24px;
          display:flex;
          align-items:center;
          gap:8px;
        }

        .pp-eyebrow::before {
          content:'';
          width:18px;height:2px;
          background:#3B82F6;
          border-radius:2px;
        }

        .pp-profile-row {
          display:flex;
          align-items:center;
          gap:24px;
          flex-wrap:wrap;
        }

        /* AVATAR */
        .pp-avatar {
          width:72px;height:72px;
          border-radius:18px;
          background:linear-gradient(135deg,#1D4ED8,#3B82F6);
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:'Syne',sans-serif;
          font-size:24px;
          font-weight:800;
          color:#fff;
          flex-shrink:0;
          border:2px solid rgba(59,130,246,0.3);
          box-shadow:0 0 24px rgba(59,130,246,0.15);
          position:relative;
        }

        .pp-avatar-online {
          position:absolute;
          bottom:-3px;right:-3px;
          width:14px;height:14px;
          border-radius:50%;
          background:#22C55E;
          border:2px solid #080C12;
          box-shadow:0 0 8px rgba(34,197,94,0.5);
        }

        .pp-user-info { flex:1; }

        .pp-user-name {
          font-family:'Syne',sans-serif;
          font-size:24px;
          font-weight:800;
          letter-spacing:-0.5px;
          color:#F0F4FC;
          margin-bottom:6px;
        }

        .pp-user-email {
          font-size:14px;
          color:#5E7394;
          margin-bottom:10px;
          font-weight:300;
        }

        .pp-role-pill {
          display:inline-flex;
          align-items:center;
          gap:5px;
          padding:4px 12px;
          border-radius:100px;
          font-size:12px;
          font-weight:600;
          text-transform:capitalize;
        }

        .pp-role-dot {
          width:5px;height:5px;
          border-radius:50%;
        }

        /* INFO CARDS */
        .pp-info-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:16px;
        }

        @media(max-width:540px){
          .pp-info-grid{grid-template-columns:1fr;}
          .pp-nav{padding:14px 20px;}
          .pp-content{padding:32px 16px 60px;}
          .pp-hero-card{padding:28px 24px;}
        }

        .pp-info-card {
          background:rgba(13,17,23,0.8);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;
          padding:22px 24px;
          transition:border-color 0.3s,transform 0.3s;
        }

        .pp-info-card:hover {
          border-color:rgba(59,130,246,0.2);
          transform:translateY(-2px);
        }

        .pp-info-label {
          font-size:11px;
          font-weight:600;
          letter-spacing:1.5px;
          text-transform:uppercase;
          color:#2E3D52;
          margin-bottom:8px;
        }

        .pp-info-value {
          font-family:'Syne',sans-serif;
          font-size:15px;
          font-weight:700;
          color:#C4D0E3;
          word-break:break-all;
        }

        .pp-info-icon {
          font-size:20px;
          margin-bottom:10px;
          display:block;
        }

        /* TIP CARD */
        .pp-tip-card {
          background:rgba(59,130,246,0.04);
          border:1px solid rgba(59,130,246,0.12);
          border-radius:14px;
          padding:22px 24px;
          display:flex;
          gap:16px;
          align-items:flex-start;
        }

        .pp-tip-icon {
          width:36px;height:36px;
          border-radius:10px;
          background:rgba(59,130,246,0.1);
          border:1px solid rgba(59,130,246,0.2);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:16px;
          flex-shrink:0;
          margin-top:2px;
        }

        .pp-tip-title {
          font-family:'Syne',sans-serif;
          font-size:14px;
          font-weight:700;
          color:#93C5FD;
          margin-bottom:6px;
        }

        .pp-tip-text {
          font-size:13px;
          color:#5E7394;
          line-height:1.65;
          font-weight:300;
        }

        /* CTA ROW */
        .pp-cta-row {
          display:flex;
          gap:12px;
          flex-wrap:wrap;
        }

        .pp-cta-primary {
          background:#3B82F6;
          color:#fff;
          border:none;
          border-radius:10px;
          padding:13px 24px;
          font-family:'Syne',sans-serif;
          font-size:14px;
          font-weight:700;
          cursor:pointer;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:8px;
          transition:all 0.2s ease;
        }

        .pp-cta-primary:hover {
          background:#2563EB;
          transform:translateY(-2px);
          box-shadow:0 8px 22px rgba(59,130,246,0.3);
        }

        .pp-cta-ghost {
          background:rgba(255,255,255,0.05);
          color:#C4D0E3;
          border:1px solid rgba(255,255,255,0.1);
          border-radius:10px;
          padding:13px 24px;
          font-family:'DM Sans',sans-serif;
          font-size:14px;
          font-weight:500;
          cursor:pointer;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:8px;
          transition:all 0.2s ease;
        }

        .pp-cta-ghost:hover {
          background:rgba(255,255,255,0.09);
          border-color:rgba(255,255,255,0.2);
          transform:translateY(-2px);
        }

        .pp-cta-danger {
          background: rgba(239,68,68,0.12);
          color: #FCA5A5;
          border: 1px solid rgba(239,68,68,0.35);
        }

        .pp-cta-danger:hover {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.6);
        }

        /* FOOTER */
        .pp-footer {
          position:relative;
          z-index:1;
          text-align:center;
          padding:20px;
          font-size:12px;
          color:#1E2A38;
          border-top:1px solid rgba(255,255,255,0.04);
          margin-top:auto;
        }
      `}</style>

      <Navbar />

      <div className="pp-root">
        <div className="pp-grid-bg" />
        <div className="pp-glow" />
        {/* nav removed - using shared Navbar component */}

        {/* CONTENT */}
        <div className="pp-content">

          {/* HERO PROFILE CARD */}
          <div className="pp-hero-card">
            <div className="pp-hero-glow" />
            <p className="pp-eyebrow">My Account</p>

            <div className="pp-profile-row">
              <div className="pp-avatar">
                {getInitials(user?.fullName)}
                <span className="pp-avatar-online" />
              </div>
              <div className="pp-user-info">
                <div className="pp-user-name">{user?.fullName || 'User'}</div>
                <div className="pp-user-email">{user?.email || '—'}</div>
                <span
                  className="pp-role-pill"
                  style={{ background: roleStyle.bg, border: `1px solid ${roleStyle.border}`, color: roleStyle.color }}
                >
                  <span className="pp-role-dot" style={{ background: roleStyle.color }} />
                  {user?.role || 'user'}
                </span>
              </div>
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="pp-info-grid">
            {[
              { icon: '👤', label: 'Full Name',     value: user?.fullName || '—' },
              { icon: '📧', label: 'Email Address', value: user?.email || '—' },
              { icon: '🔑', label: 'Account Role',  value: user?.role || 'user' },
              { icon: '📅', label: 'Member Since',  value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : 'Active' },
            ].map((item) => (
              <div className="pp-info-card" key={item.label}>
                <span className="pp-info-icon">{item.icon}</span>
                <div className="pp-info-label">{item.label}</div>
                <div className="pp-info-value">{item.value}</div>
              </div>
            ))}
          </div>

          {/* TIP CARD */}
          <div className="pp-tip-card">
            <div className="pp-tip-icon">💡</div>
            <div>
              <div className="pp-tip-title">Portfolio Tip</div>
              <p className="pp-tip-text">
                Add your target role and top skills in backend profile settings to get more
                accurate ATS scores and personalized keyword suggestions for every analysis.
              </p>
            </div>
          </div>

          {/* CTA ROW */}
          <div className="pp-cta-row">
            <Link to="/upload" className="pp-cta-primary">
              Analyze My Resume →
            </Link>
            <Link to="/dashboard" className="pp-cta-ghost">
              View Dashboard
            </Link>
            <button type="button" className="pp-cta-ghost pp-cta-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

        </div>

        <footer className="pp-footer">
          © {new Date().getFullYear()} CV Forge AI — Powered by Google Gemini AI
        </footer>
      </div>
    </>
  );
}

export default ProfilePage;
