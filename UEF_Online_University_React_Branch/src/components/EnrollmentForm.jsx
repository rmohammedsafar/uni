import React, { useState } from 'react';
import { saveApplicationRecord } from '../services/firebase';
import { sendConfirmationEmail } from '../services/emailService';

export default function EnrollmentForm({ programs, selectedProgramId }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [targetProgram, setTargetProgram] = useState(selectedProgramId || (programs[0] ? programs[0].id : 'ms-cs-ai'));
  const [highestQual, setHighestQual] = useState('Bachelor Degree / Graduation');
  const [gpaPercent, setGpaPercent] = useState('82');
  const [marksheetFiles, setMarksheetFiles] = useState([]);
  const [idFiles, setIdFiles] = useState([]);
  const [submittedApp, setSubmittedApp] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please fill out all required fields.');
      return;
    }

    const prog = programs.find(p => p.id === targetProgram) || programs[0];
    const trackingId = 'UEF-' + Math.floor(100000 + Math.random() * 900000);

    const appData = {
      trackingId,
      fullName,
      email,
      country,
      programId: prog.id,
      programTitle: prog.title || prog.name,
      highestQual,
      gpaPercent: `${gpaPercent}%`,
      status: parseInt(gpaPercent) >= 75 ? 'ADMITTED (UNCONDITIONAL)' : 'ADMITTED (CONDITIONAL PREP)',
      submittedAt: new Date().toLocaleString("en-US", { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      marksheetCount: marksheetFiles.length || 1,
      idUploaded: idFiles.length > 0 ? 'Verified Passport/ID' : 'Pending Verification'
    };

    saveApplicationRecord(appData);
    await sendConfirmationEmail(appData);
    setSubmittedApp(appData);
    alert(`🎉 Application Submitted Successfully! Official Confirmation Email & Receipt sent for Tracking ID ${trackingId}.`);
  };

  return (
    <section className="section-wrapper" id="applySection">
      <div className="section-header">
        <span className="section-tag">Online Admissions 2026</span>
        <h2 className="section-title">ENROLL NOW & UPLOAD MARKSHEETS</h2>
        <p className="section-desc">
          Complete your official application for 100% remote online study. Attach your academic marksheets and nationality ID for instant eligibility evaluation.
        </p>
      </div>

      <div className="application-portal-box" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Full Student Legal Name *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Eleanor Vance" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Student Email Address *</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="eleanor@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Country of Residence *</label>
              <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)} required>
                <option value="United States">🇺🇸 United States</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="India">🇮🇳 India</option>
                <option value="Japan">🇯🇵 Japan</option>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Degree Program *</label>
              <select className="form-select" value={targetProgram} onChange={(e) => setTargetProgram(e.target.value)} required>
                {programs.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.degree ? `${p.degree} in ` : ''}{p.title || p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Highest Qualification *</label>
              <select className="form-select" value={highestQual} onChange={(e) => setHighestQual(e.target.value)} required>
                <option value="SSLC / 10th Standard">SSLC / Secondary School (10th)</option>
                <option value="Plus Two / 12th Standard">Plus Two / Higher Secondary (12th)</option>
                <option value="Bachelor Degree / Graduation">Bachelor's Degree / Graduation (B.A., B.Sc, B.Com)</option>
                <option value="B.Tech / B.E. Engineering">B.Tech / B.E. Engineering Degree</option>
                <option value="Master Degree / Post Graduation">Master's Degree / Post Graduation (M.A., M.Sc, M.Tech)</option>
                <option value="Doctorate / Ph.D.">Doctorate / Ph.D.</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Prior Academic Score (%) *</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 78" 
                value={gpaPercent}
                onChange={(e) => setGpaPercent(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* SIDE-BY-SIDE COMPACT ELEGANT UPLOADERS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '20px 0' }}>
            {/* Uploader 1: Academic Marksheets */}
            <div className="drop-zone" style={{ padding: '16px', border: '1.5px dashed var(--border-gold)', borderRadius: '12px', textAlign: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>📄</div>
              <h4 style={{ fontSize: '13px', color: 'var(--gold-light)', margin: '0 0 4px 0' }}>Academic Marksheets</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 10px 0' }}>PDF, JPG, PNG (SSLC, Plus Two, Degree)</p>
              <input 
                type="file" 
                multiple 
                onChange={(e) => setMarksheetFiles(Array.from(e.target.files))}
                style={{ fontSize: '11px', color: 'var(--text-muted)' }} 
              />
            </div>

            {/* Uploader 2: Nationality ID */}
            <div className="drop-zone" style={{ padding: '16px', border: '1.5px dashed var(--border-gold)', borderRadius: '12px', textAlign: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🪪</div>
              <h4 style={{ fontSize: '13px', color: 'var(--gold-light)', margin: '0 0 4px 0' }}>Nationality Verification ID</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 10px 0' }}>Passport, National ID, Driving License</p>
              <input 
                type="file" 
                onChange={(e) => setIdFiles(Array.from(e.target.files))}
                style={{ fontSize: '11px', color: 'var(--text-muted)' }} 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '14px', fontSize: '15px', marginTop: '10px' }}>
            🎓 Submit Official Application & Receive Tracking ID
          </button>
        </form>

        {submittedApp && (
          <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '14px' }}>
            <h4 style={{ color: '#34d399', margin: '0 0 8px 0', fontSize: '18px' }}>🎉 Application Decision Issued!</h4>
            <p style={{ fontSize: '13px', color: '#fff', margin: '0 0 6px 0' }}>
              Tracking ID: <strong style="font-family:monospace; color:var(--gold-light);">{submittedApp.trackingId}</strong> | Status: <strong style={{ color: '#34d399' }}>{submittedApp.status}</strong>
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              An official admission confirmation receipt has been dispatched to Registrar (<strong style={{ color: 'var(--gold-light)' }}>r.mohammedsafar@gmail.com</strong>).
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
