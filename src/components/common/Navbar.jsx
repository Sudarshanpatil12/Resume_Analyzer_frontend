import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <style>{`
        .cv-navbar {
          position: sticky;
          top: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(8,12,18,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Sans', sans-serif;
        }

        .cv-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cv-brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3B82F6;
          box-shadow: 0 0 12px #3B82F6;
        }

        .cv-nav-links {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .cv-link {
          text-decoration: none;
          font-size: 14px;
          color: #8B9BB4;
          font-weight: 500;
          transition: 0.2s ease;
        }

        .cv-link:hover,
        .cv-link.active {
          color: #60A5FA;
        }

        .cv-profile-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          text-decoration: none;
          transition: 0.2s ease;
        }

        .cv-profile-chip:hover {
          background: rgba(59,130,246,0.15);
        }

        .cv-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #3B82F6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .cv-profile-name {
          font-size: 13px;
          color: #C4D0E3;
          font-weight: 500;
          max-width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        @media (max-width: 768px) {
          .cv-navbar {
            padding: 14px 20px;
          }

          .cv-nav-links {
            gap: 14px;
          }

          .cv-profile-name {
            display: none;
          }
        }
      `}</style>

      <header className="cv-navbar">
        <Link to="/" className="cv-brand">
          <span className="cv-brand-dot"></span>
          CV Forge AI
        </Link>

        <nav className="cv-nav-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className="cv-link">Dashboard</NavLink>
              <NavLink to="/upload" className="cv-link">Analyze</NavLink>
              <NavLink to="/job-match" className="cv-link">Job Match</NavLink>

              <Link to="/profile" className="cv-profile-chip">
                <div className="cv-avatar">
                  {(user?.fullName || user?.email || 'U')
                    .slice(0, 1)
                    .toUpperCase()}
                </div>
                <span className="cv-profile-name">
                  {user?.fullName || user?.email || 'User'}
                </span>
              </Link>
            </>
          ) : (
            <>
              <NavLink to="/" className="cv-link">Home</NavLink>
              <NavLink to="/login" className="cv-link">Login</NavLink>
              <NavLink to="/register" className="cv-link">Sign Up</NavLink>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
