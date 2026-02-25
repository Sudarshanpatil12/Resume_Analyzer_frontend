import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ResumeUploader from '../components/upload/ResumeUploader';
import { fetchResumes } from '../api/resumeApi';
import { createAnalysis } from '../api/analysisApi';

function UploadPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadResumes = () => {
    fetchResumes().then((res) => {
      const list = res.data.data.resumes;
      setResumes(list);
      if (list[0]) setSelectedResumeId(list[0]._id);
    });
  };

  useEffect(() => { loadResumes(); }, []);

  const onAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedResumeId) { setError('Upload and select a resume first.'); return; }
    try {
      setLoading(true);
      setError('');
      const res = await createAnalysis({ resumeId: selectedResumeId, jobDescription });
      navigate(`/analysis/${res.data.data.analysis._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .up-root {
          font-family:'DM Sans',sans-serif;
          background:#080C12;
          color:#E8EDF5;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          position:relative;
          overflow-x:hidden;
        }

        .up-root::before {
          content:'';
          position:fixed;
          inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none;
          z-index:0;
          opacity:0.4;
        }

        .up-grid-bg {
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

        .up-glow {
          position:fixed;
          top:5%;left:50%;
          transform:translateX(-50%);
          width:600px;height:280px;
          background:radial-gradient(ellipse,rgba(59,130,246,0.08) 0%,transparent 70%);
          pointer-events:none;
          z-index:0;
        }

        /* NAV */
        .up-nav {
          position:sticky;
          top:0;z-index:100;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:16px 48px;
          background:rgba(8,12,18,0.85);
          backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }

        .up-logo {
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

        .up-logo-dot {
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

        .up-nav-links { display:flex;gap:8px;align-items:center; }

        .up-btn-ghost {
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
          transition:all 0.2s ease;
        }

        .up-btn-ghost:hover {
          background:rgba(255,255,255,0.09);
          border-color:rgba(255,255,255,0.18);
        }

        /* CONTENT */
        .up-content {
          position:relative;
          z-index:1;
          max-width:860px;
          margin:0 auto;
          padding:48px 24px 80px;
          display:flex;
          flex-direction:column;
          gap:24px;
          animation:fadeUp 0.5s ease both;
          width:100%;
        }

        @keyframes fadeUp {
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }

        /* PAGE HEADER */
        .up-page-header {
          background:rgba(13,17,23,0.85);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:18px;
          padding:32px 40px;
          position:relative;
          overflow:hidden;
        }

        .up-page-header::before {
          content:'';
          position:absolute;
          top:0;left:10%;right:10%;
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(59,130,246,0.55),transparent);
        }

        .up-page-header-glow {
          position:absolute;
          top:-50px;right:-50px;
          width:260px;height:180px;
          background:radial-gradient(ellipse,rgba(59,130,246,0.07),transparent 70%);
          pointer-events:none;
        }

        .up-eyebrow {
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

        .up-eyebrow::before {
          content:'';
          width:18px;height:2px;
          background:#3B82F6;
          border-radius:2px;
        }

        .up-page-title {
          font-family:'Syne',sans-serif;
          font-size:clamp(22px,3vw,30px);
          font-weight:800;
          letter-spacing:-0.8px;
          margin-bottom:6px;
        }

        .up-page-sub {
          font-size:14px;
          color:#5E7394;
          font-weight:300;
          line-height:1.6;
        }

        /* STEP BADGE */
        .up-step-badge {
          display:inline-flex;
          align-items:center;
          gap:8px;
          font-size:11px;
          font-weight:600;
          letter-spacing:1.5px;
          text-transform:uppercase;
          color:#5E7394;
          margin-bottom:14px;
        }

        .up-step-badge-num {
          width:22px;height:22px;
          border-radius:6px;
          background:rgba(59,130,246,0.12);
          border:1px solid rgba(59,130,246,0.25);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:11px;
          font-weight:700;
          color:#60A5FA;
        }

        /* CARDS */
        .up-card {
          background:rgba(13,17,23,0.85);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px;
          padding:32px 36px;
          position:relative;
          overflow:hidden;
          transition:border-color 0.3s;
        }

        .up-card:hover { border-color:rgba(59,130,246,0.15); }

        .up-card-title {
          font-family:'Syne',sans-serif;
          font-size:17px;
          font-weight:700;
          color:#E8EDF5;
          margin-bottom:6px;
        }

        .up-card-sub {
          font-size:13px;
          color:#5E7394;
          font-weight:300;
          margin-bottom:24px;
          line-height:1.6;
        }

        /* UPLOADER WRAP */
        .up-uploader-wrap {
          /* ResumeUploader component will render here */
        }

        .up-uploader-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px;
        }

        .up-dropzone {
          border: 1.5px dashed rgba(59,130,246,0.45);
          border-radius: 12px;
          padding: 32px 20px;
          text-align: center;
          background: linear-gradient(180deg, rgba(59,130,246,0.08), rgba(59,130,246,0.03));
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .up-dropzone h4 {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          margin-bottom: 6px;
          color: #E8EDF5;
        }

        .up-dropzone p {
          color: #8B9BB4;
          font-size: 13px;
          margin: 0;
        }

        .up-dropzone.active,
        .up-dropzone:hover {
          border-color: rgba(96,165,250,0.9);
          background: linear-gradient(180deg, rgba(59,130,246,0.14), rgba(59,130,246,0.05));
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }

        .up-muted {
          margin-top: 10px;
          color: #8B9BB4;
          font-size: 13px;
        }

        /* FORM */
        .up-form { display:flex;flex-direction:column;gap:18px; }

        .up-field { display:flex;flex-direction:column;gap:6px; }

        .up-label {
          font-size:12px;
          font-weight:500;
          color:#8B9BB4;
          letter-spacing:0.3px;
        }

        .up-select {
          width:100%;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:10px;
          padding:13px 16px;
          font-family:'DM Sans',sans-serif;
          font-size:14px;
          color:#E8EDF5;
          outline:none;
          cursor:pointer;
          appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%235E7394' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat:no-repeat;
          background-position:right 16px center;
          padding-right:40px;
          transition:border-color 0.2s,background-color 0.2s,box-shadow 0.2s;
        }

        .up-select:focus {
          border-color:rgba(59,130,246,0.5);
          background-color:rgba(59,130,246,0.04);
          box-shadow:0 0 0 3px rgba(59,130,246,0.08);
        }

        .up-select option {
          background:#0D1117;
          color:#E8EDF5;
        }

        .up-textarea {
          width:100%;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:10px;
          padding:14px 16px;
          font-family:'DM Sans',sans-serif;
          font-size:13px;
          color:#E8EDF5;
          outline:none;
          resize:vertical;
          min-height:180px;
          line-height:1.6;
          transition:border-color 0.2s,background-color 0.2s,box-shadow 0.2s;
        }

        .up-textarea::placeholder { color:#2E3D52; }

        .up-textarea:focus {
          border-color:rgba(59,130,246,0.5);
          background-color:rgba(59,130,246,0.04);
          box-shadow:0 0 0 3px rgba(59,130,246,0.08);
        }

        .up-textarea-hint {
          font-size:11px;
          color:#2E3D52;
          margin-top:4px;
        }

        /* SUBMIT BTN */
        .up-submit-btn {
          width:100%;
          background:#3B82F6;
          color:#fff;
          border:none;
          border-radius:10px;
          padding:15px;
          font-family:'Syne',sans-serif;
          font-size:15px;
          font-weight:700;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          transition:all 0.2s ease;
          letter-spacing:0.2px;
          margin-top:4px;
        }

        .up-submit-btn:hover:not(:disabled) {
          background:#2563EB;
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(59,130,246,0.32);
        }

        .up-submit-btn:disabled {
          opacity:0.65;
          cursor:not-allowed;
          transform:none;
        }

        .up-spinner {
          width:16px;height:16px;
          border:2px solid rgba(255,255,255,0.3);
          border-top-color:#fff;
          border-radius:50%;
          animation:spin 0.7s linear infinite;
        }

        @keyframes spin { to{transform:rotate(360deg);} }

        /* LOADING OVERLAY */
        .up-loading-overlay {
          position:absolute;
          inset:0;
          background:rgba(8,12,18,0.7);
          backdrop-filter:blur(4px);
          border-radius:16px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:14px;
          z-index:10;
        }

        .up-loading-spinner-lg {
          width:44px;height:44px;
          border:3px solid rgba(59,130,246,0.15);
          border-top-color:#3B82F6;
          border-radius:50%;
          animation:spin 0.8s linear infinite;
        }

        .up-loading-text {
          font-family:'Syne',sans-serif;
          font-size:14px;
          font-weight:600;
          color:#8B9BB4;
        }

        .up-loading-sub {
          font-size:12px;
          color:#2E3D52;
          margin-top:-8px;
        }

        /* ERROR */
        .up-error {
          display:flex;
          align-items:center;
          gap:8px;
          background:rgba(239,68,68,0.08);
          border:1px solid rgba(239,68,68,0.2);
          border-radius:10px;
          padding:12px 14px;
          font-size:13px;
          color:#FCA5A5;
        }

        /* PROGRESS STEPS */
        .up-progress {
          display:flex;
          align-items:center;
          gap:0;
          margin-bottom:4px;
        }

        .up-progress-step {
          display:flex;
          align-items:center;
          gap:8px;
          font-size:12px;
          color:#2E3D52;
          font-weight:500;
        }

        .up-progress-step.active { color:#60A5FA; }
        .up-progress-step.done { color:#22C55E; }

        .up-progress-dot {
          width:24px;height:24px;
          border-radius:50%;
          border:1px solid rgba(255,255,255,0.1);
          background:rgba(255,255,255,0.03);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:10px;
          font-weight:700;
          flex-shrink:0;
        }

        .up-progress-step.active .up-progress-dot {
          background:rgba(59,130,246,0.15);
          border-color:rgba(59,130,246,0.4);
          color:#60A5FA;
        }

        .up-progress-step.done .up-progress-dot {
          background:rgba(34,197,94,0.15);
          border-color:rgba(34,197,94,0.4);
          color:#22C55E;
        }

        .up-progress-line {
          flex:1;
          height:1px;
          background:rgba(255,255,255,0.06);
          margin:0 10px;
          max-width:48px;
        }

        /* FOOTER */
        .up-footer {
          position:relative;
          z-index:1;
          text-align:center;
          padding:20px;
          font-size:12px;
          color:#1E2A38;
          border-top:1px solid rgba(255,255,255,0.04);
          margin-top:auto;
        }

        @media(max-width:640px){
          .up-nav{padding:14px 20px;}
          .up-content{padding:32px 16px 60px;}
          .up-card{padding:24px 20px;}
          .up-page-header{padding:24px 20px;}
        }
      `}</style>

      <Navbar />

      <div className="up-root">
        <div className="up-grid-bg" />
        <div className="up-glow" />
        {/* nav removed - using shared Navbar component */}

        <div className="up-content">

          {/* PAGE HEADER */}
          <div className="up-page-header">
            <div className="up-page-header-glow" />
            <p className="up-eyebrow">Resume Analysis</p>
            <h1 className="up-page-title">Upload & Analyze Your Resume</h1>
            <p className="up-page-sub">Upload your resume, paste a job description, and get an instant ATS report with keyword gaps and AI suggestions.</p>
          </div>

          {/* PROGRESS INDICATOR */}
          <div style={{ display:'flex', alignItems:'center', paddingLeft:'4px' }}>
            <div className="up-progress-step done">
              <div className="up-progress-dot">✓</div>
              <span>Login</span>
            </div>
            <div className="up-progress-line" />
            <div className="up-progress-step active">
              <div className="up-progress-dot">1</div>
              <span>Upload Resume</span>
            </div>
            <div className="up-progress-line" />
            <div className="up-progress-step active">
              <div className="up-progress-dot">2</div>
              <span>Add Job Description</span>
            </div>
            <div className="up-progress-line" />
            <div className="up-progress-step">
              <div className="up-progress-dot">3</div>
              <span>Get ATS Report</span>
            </div>
          </div>

          {/* STEP 1 — UPLOADER */}
          <div className="up-card">
            <div className="up-step-badge">
              <div className="up-step-badge-num">1</div>
              Upload Resume
            </div>
            <h2 className="up-card-title">Upload Your Resume File</h2>
            <p className="up-card-sub">Supported formats: PDF, DOC, DOCX — Max size 5MB</p>
            <div className="up-uploader-wrap">
              <ResumeUploader onUploaded={loadResumes} />
            </div>
          </div>

          {/* STEP 2 — ANALYSIS FORM */}
          <div className="up-card" style={{ position:'relative' }}>

            {loading && (
              <div className="up-loading-overlay">
                <div className="up-loading-spinner-lg" />
                <span className="up-loading-text">Analyzing your resume...</span>
                <span className="up-loading-sub">Gemini AI is processing — this takes 10–20 seconds</span>
              </div>
            )}

            <div className="up-step-badge">
              <div className="up-step-badge-num">2</div>
              Configure & Analyze
            </div>
            <h2 className="up-card-title">Run Professional Resume Analysis</h2>
            <p className="up-card-sub">Select your uploaded resume and paste a job description for precise keyword matching and role-fit scoring.</p>

            <form className="up-form" onSubmit={onAnalyze}>

              <div className="up-field">
                <label className="up-label" htmlFor="resumeSelect">Choose Resume</label>
                <select
                  id="resumeSelect"
                  className="up-select"
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  required
                >
                  <option value="">— Select a resume —</option>
                  {resumes.map((resume) => (
                    <option key={resume._id} value={resume._id}>
                      {resume.fileName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="up-field">
                <label className="up-label" htmlFor="jd">Job Description <span style={{ color:'#2E3D52', fontWeight:400 }}>(Optional — improves accuracy)</span></label>
                <textarea
                  id="jd"
                  className="up-textarea"
                  rows={10}
                  placeholder="Paste the complete job description here — role responsibilities, required skills, qualifications..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <span className="up-textarea-hint">Tip: Longer JD = better keyword matching accuracy</span>
              </div>

              {error && (
                <div className="up-error">
                  <span>⚠</span>
                  {error}
                </div>
              )}

              <button type="submit" className="up-submit-btn" disabled={loading}>
                {loading ? (
                  <><span className="up-spinner" /> Analyzing Resume...</>
                ) : (
                  '⚡ Generate ATS Report'
                )}
              </button>

            </form>
          </div>

        </div>

        <footer className="up-footer">
          © {new Date().getFullYear()} CV Forge AI — Powered by Google Gemini AI
        </footer>
      </div>
    </>
  );
}

export default UploadPage;
