import React, { useState } from 'react';
import { saveCMSConfigToStorage, getApplicationRecords } from '../services/firebase';

export default function AdminPortal({ programs, onUpdatePrograms, onLogout }) {
  const [activeTab, setActiveTab] = useState('admissions');
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [showInlineAddPortal, setShowInlineAddPortal] = useState(false);

  // New Program Form State
  const [newProgTitle, setNewProgTitle] = useState('');
  const [newProgDegree, setNewProgDegree] = useState('Master of Science');
  const [newProgCategory, setNewProgCategory] = useState('technology');
  const [newProgTuition, setNewProgTuition] = useState('14400');
  const [newProgDuration, setNewProgDuration] = useState('1.5 Years (100% Online)');
  const [newProgDesc, setNewProgDesc] = useState('Comprehensive 100% remote theoretical curriculum covering core principles, analytical modeling, and digital case studies.');

  const applications = getApplicationRecords();

  const handleAddProgramSubmit = (e) => {
    e.preventDefault();
    if (!newProgTitle.trim()) {
      alert('Please enter a degree program title.');
      return;
    }

    const tuitionVal = parseInt(newProgTuition) || 14400;
    const newProg = {
      id: 'uef-prog-' + Math.floor(100 + Math.random() * 900),
      name: newProgTitle.trim(),
      title: newProgTitle.trim(),
      degree: newProgDegree,
      category: newProgCategory,
      tuition: `$${tuitionVal.toLocaleString()} USD`,
      numericFee: tuitionVal,
      duration: newProgDuration,
      description: newProgDesc,
      format: "100% Remote / Asynchronous",
      credits: "36 US Credit Hours (12 Core Modules)"
    };

    const updated = [...programs, newProg];
    onUpdatePrograms(updated);
    saveCMSConfigToStorage(updated);

    // Reset Form
    setNewProgTitle('');
    setShowInlineAddPortal(false);
    alert(`🎉 Success! Degree program '${newProgTitle}' has been added and published live!`);
  };

  const handleDeleteProgram = (progId) => {
    if (!window.confirm(`Are you sure you want to delete program ID '${progId}' from the catalog?`)) return;
    const updated = programs.filter(p => p.id !== progId);
    onUpdatePrograms(updated);
    saveCMSConfigToStorage(updated);
  };

  return (
    <section className="section-wrapper" id="adminDashboardSection" style={{ display: 'block' }}>
      <div className="section-header">
        <span className="section-tag" style={{ color: '#34d399' }}>🔑 Administrative Portal</span>
        <h2 className="section-title">Official Student Application & Document Manager</h2>
        <p className="section-desc">
          Logged in as Registrar Officer (<strong style={{ color: 'var(--gold-light)' }}>r.mohammedsafar@gmail.com</strong>). View student profiles, inspect attached marksheets, update admission decisions, and export student roster data.
        </p>
      </div>

      <div className="admin-dashboard-container">
        {/* HEADER ROW */}
        <div className="admin-header-row" style={{ marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '24px', color: '#fff', fontFamily: 'var(--font-serif)', margin: 0 }}>
              📊 Admissions Overview & Student Records
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn btn-gold" onClick={() => alert("📥 Exporting Applicants Roster to CSV file...")} style={{ padding: '8px 14px', fontSize: '13px' }}>
              📥 Export CSV
            </button>
            <button className="btn btn-maroon" onClick={() => alert("🗄️ Exporting Applicants Roster to SQL script...")} style={{ padding: '8px 14px', fontSize: '13px' }}>
              🗄️ Export SQL
            </button>
            <button className="btn btn-outline" onClick={onLogout} style={{ borderColor: '#ef4444', color: '#f87171', padding: '8px 14px', fontSize: '13px' }}>
              🔒 Logout Admin
            </button>
          </div>
        </div>

        {/* STREAMLINED TAB PILLS */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '16px' }}>
          <button 
            className={`filter-pill ${activeTab === 'admissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('admissions')}
          >
            📋 Admissions & Leads
          </button>
          <button 
            className={`filter-pill ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 Courses & Tuition CMS
          </button>
        </div>

        {/* TAB 1: ADMISSIONS */}
        {activeTab === 'admissions' && (
          <div>
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card">
                <div className="kpi-icon">📋</div>
                <div>
                  <div className="kpi-val">{applications.length}</div>
                  <div className="kpi-lbl">Total Applications</div>
                </div>
              </div>
              <div className="admin-kpi-card">
                <div className="kpi-icon">📁</div>
                <div>
                  <div className="kpi-val">{applications.length}</div>
                  <div className="kpi-lbl">Uploaded Marksheets</div>
                </div>
              </div>
              <div className="admin-kpi-card">
                <div className="kpi-icon">🎓</div>
                <div>
                  <div className="kpi-val">{applications.filter(a => a.status.includes('ADMITTED')).length}</div>
                  <div className="kpi-lbl">Admitted Students</div>
                </div>
              </div>
            </div>

            <div className="admin-table-container" style={{ marginTop: '24px' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Student Name</th>
                    <th>Email & Country</th>
                    <th>Program</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                        No student applications recorded yet.
                      </td>
                    </tr>
                  ) : (
                    applications.map(app => (
                      <tr key={app.trackingId}>
                        <td style={{ fontFamily: 'monospace', color: 'var(--gold-light)' }}>{app.trackingId}</td>
                        <td style={{ fontWeight: 'bold' }}>{app.fullName}</td>
                        <td>{app.email} ({app.country})</td>
                        <td>{app.programTitle}</td>
                        <td><span className="online-tag" style={{ position: 'static' }}>{app.status}</span></td>
                        <td>
                          <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>Inspect Documents</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: COURSES CMS */}
        {activeTab === 'courses' && (
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-gold)', borderRadius: '14px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)', margin: 0, fontSize: '22px' }}>
                  📚 Degree Program Catalog & Pricing Manager
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Add, edit, or remove degree programs. Tuition fees, course duration, and credit hours update live across the entire website!
                </p>
              </div>
              <button 
                className="btn btn-gold" 
                onClick={() => setShowInlineAddPortal(!showInlineAddPortal)}
              >
                {showInlineAddPortal ? '✕ Close Creation Portal' : '➕ Add New Degree Program'}
              </button>
            </div>

            {/* EMBEDDED DEGREE PROGRAM CREATION PORTAL FORM */}
            {showInlineAddPortal && (
              <div style={{ background: 'rgba(20, 11, 14, 0.95)', border: '1.5px solid var(--gold-primary)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '12px' }}>
                  <h4 style={{ fontSize: '18px', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    ✨ Create & Publish New Degree Program
                  </h4>
                  <button className="btn btn-outline" onClick={() => setShowInlineAddPortal(false)} style={{ padding: '4px 10px', fontSize: '12px' }}>✕ Close Form</button>
                </div>

                <form onSubmit={handleAddProgramSubmit}>
                  <div className="form-group">
                    <label className="form-label">Degree Title / Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Master of Science in Robotics & Autonomous Systems" 
                      value={newProgTitle}
                      onChange={(e) => setNewProgTitle(e.target.value)}
                      required 
                      style={{ padding: '10px 14px', fontSize: '14px' }}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Degree Level *</label>
                      <select className="form-select" value={newProgDegree} onChange={(e) => setNewProgDegree(e.target.value)} style={{ padding: '10px 14px' }}>
                        <option value="Master of Science">Master of Science (M.S.)</option>
                        <option value="Bachelor of Science">Bachelor of Science (B.S.)</option>
                        <option value="Master of Business Administration">Master of Business Administration (MBA)</option>
                        <option value="Doctor of Philosophy">Doctor of Philosophy (Ph.D.)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category *</label>
                      <select className="form-select" value={newProgCategory} onChange={(e) => setNewProgCategory(e.target.value)} style={{ padding: '10px 14px' }}>
                        <option value="technology">Computer & Data Tech</option>
                        <option value="business">Business & FinTech</option>
                        <option value="healthcare">Health Informatics</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Total Tuition ($ USD) *</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={newProgTuition}
                        onChange={(e) => setNewProgTuition(e.target.value)}
                        required 
                        style={{ padding: '10px 14px', color: '#34d399', fontWeight: 'bold' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Duration *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={newProgDuration}
                        onChange={(e) => setNewProgDuration(e.target.value)}
                        required 
                        style={{ padding: '10px 14px' }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Program Overview & Description</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      value={newProgDesc}
                      onChange={(e) => setNewProgDesc(e.target.value)}
                      style={{ padding: '10px 14px', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setShowInlineAddPortal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-gold" style={{ padding: '10px 24px', fontSize: '14px' }}>
                      🚀 Publish Degree Program Live
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr style={{ background: 'rgba(212,175,55,0.2)' }}>
                    <th>Program ID</th>
                    <th>Degree Title</th>
                    <th>Category</th>
                    <th>Tuition ($ USD)</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map(prog => (
                    <tr key={prog.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--gold-light)' }}>{prog.id}</td>
                      <td style={{ fontWeight: 700 }}>{prog.title || prog.name}</td>
                      <td><span className="online-tag" style={{ position: 'static' }}>{prog.category}</span></td>
                      <td style={{ color: '#34d399', fontWeight: 700 }}>{prog.tuition}</td>
                      <td style={{ fontSize: '12px' }}>{prog.duration}</td>
                      <td>
                        <button 
                          className="btn btn-outline" 
                          onClick={() => handleDeleteProgram(prog.id)} 
                          style={{ padding: '4px 10px', fontSize: '11px', borderColor: '#ef4444', color: '#f87171' }}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
