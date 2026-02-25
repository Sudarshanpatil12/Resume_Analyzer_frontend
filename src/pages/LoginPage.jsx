import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/common/Navbar';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(form);
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          font-family: 'DM Sans', sans-serif;
          background: #080C12;
          color: #E8EDF5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* noise */
        .auth-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* grid bg */
        .auth-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* glow */
        .auth-glow {
          position: fixed;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* NAV */
        .auth-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 48px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .auth-logo {
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

        .auth-logo-dot {
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

        /* MAIN */
        .auth-main {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: rgba(13,17,23,0.9);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 44px 40px;
          backdrop-filter: blur(20px);
          animation: fadeUp 0.5s ease both;
          position: relative;
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 500;
          color: #93C5FD;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .auth-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #3B82F6;
          box-shadow: 0 0 6px #3B82F6;
        }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.8px;
          margin-bottom: 6px;
          color: #F0F4FC;
        }

        .auth-subtitle {
          font-size: 14px;
          color: #5E7394;
          margin-bottom: 32px;
          font-weight: 300;
        }

        /* FORM */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .auth-label {
          font-size: 12px;
          font-weight: 500;
          color: #8B9BB4;
          letter-spacing: 0.3px;
        }

        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #E8EDF5;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .auth-input::placeholder { color: #2E3D52; }

        .auth-input:focus {
          border-color: rgba(59,130,246,0.5);
          background: rgba(59,130,246,0.04);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
        }

        .auth-btn {
          width: 100%;
          background: #3B82F6;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 6px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.2px;
        }

        .auth-btn:hover:not(:disabled) {
          background: #2563EB;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(59,130,246,0.3);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* spinner */
        .auth-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ERROR */
        .auth-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 13px;
          color: #FCA5A5;
          margin-top: 4px;
        }

        /* DIVIDER */
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 20px;
        }

        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        .auth-divider-text {
          font-size: 12px;
          color: #2E3D52;
        }

        /* FOOTER LINK */
        .auth-footer-text {
          text-align: center;
          font-size: 14px;
          color: #5E7394;
        }

        .auth-footer-text a {
          color: #60A5FA;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .auth-footer-text a:hover { color: #93C5FD; }

        /* PAGE FOOTER */
        .auth-page-footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #1E2A38;
        }

        @media (max-width: 480px) {
          .auth-card { padding: 32px 24px; }
          .auth-nav { padding: 14px 20px; }
        }
      `}</style>

      <Navbar />

      <div className="auth-root">
        <div className="auth-grid-bg" />
        <div className="auth-glow" />

        {/* nav removed - using shared Navbar component */}

        {/* MAIN */}
        <main className="auth-main">
          <div className="auth-card">

            <div className="auth-badge">
              <span className="auth-badge-dot" />
              Secure Login
            </div>

            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to access your resume dashboard</p>

            <form className="auth-form" onSubmit={onSubmit}>
              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="auth-error">
                  <span>⚠</span>
                  {error}
                </div>
              )}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? (
                  <><span className="auth-spinner" /> Signing in...</>
                ) : (
                  'Sign In →'
                )}
              </button>
            </form>

            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-text">New to CV Forge?</span>
              <div className="auth-divider-line" />
            </div>

            <p className="auth-footer-text">
              <Link to="/register">Create a free account →</Link>
            </p>

          </div>
        </main>

        <footer className="auth-page-footer">
          © {new Date().getFullYear()} CV Forge AI
        </footer>
      </div>
    </>
  );
}

export default LoginPage;