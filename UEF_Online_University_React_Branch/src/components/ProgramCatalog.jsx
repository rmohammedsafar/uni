import React, { useState } from 'react';

export default function ProgramCatalog({ programs, onSelectProgramToApply }) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrochureProg, setSelectedBrochureProg] = useState(null);

  const filteredPrograms = programs.filter(p => {
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const titleStr = (p.title || p.name || '').toLowerCase();
    const degreeStr = (p.degree || '').toLowerCase();
    const descStr = (p.description || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || titleStr.includes(q) || degreeStr.includes(q) || descStr.includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <section className="section-wrapper" id="programs">
      <div className="section-header">
        <span className="section-tag">Academic Excellence</span>
        <h2 className="section-title">100% ONLINE DEGREE CATALOG</h2>
        <p className="section-desc">
          Explore our curated non-practical theoretical & digital programs. All courses are delivered via our secure Learning Management System (LMS) with 24/7 access to lecture notes, virtual research archives, and faculty guidance.
        </p>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="search-filter-container">
        <div style={{ flex: 1, position: 'relative' }}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search degree programs (e.g. Computer Science, MBA, Cybersecurity)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-pill-group">
          <button 
            className={`filter-pill ${categoryFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            All Programs
          </button>
          <button 
            className={`filter-pill ${categoryFilter === 'technology' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('technology')}
          >
            Computer & Data Tech
          </button>
          <button 
            className={`filter-pill ${categoryFilter === 'business' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('business')}
          >
            Business & FinTech
          </button>
          <button 
            className={`filter-pill ${categoryFilter === 'healthcare' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('healthcare')}
          >
            Health Informatics
          </button>
        </div>
      </div>

      {/* DEGREE CARDS GRID */}
      <div className="program-grid">
        {filteredPrograms.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border-gold)' }}>
            <p style={{ fontSize: '16px', color: 'var(--gold-light)' }}>No degree programs found matching "{searchQuery}".</p>
          </div>
        ) : (
          filteredPrograms.map(prog => (
            <div key={prog.id} className="program-card">
              <div className="card-header">
                <span className="online-tag">100% ONLINE</span>
                <div className="program-degree">{prog.degree || 'Degree Program'}</div>
                <h3 className="program-name">{prog.title || prog.name}</h3>
              </div>

              <div className="card-body">
                <p className="program-desc">{prog.description}</p>

                <div className="card-body-specs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px', background: 'rgba(0,0,0,0.4)', borderRadius: '10px', margin: '16px 0' }}>
                  <div>
                    <div className="spec-label">Duration</div>
                    <div className="spec-value">{prog.duration}</div>
                  </div>
                  <div>
                    <div className="spec-label">Credits</div>
                    <div className="spec-value">{prog.credits} Credits</div>
                  </div>
                  <div>
                    <div className="spec-label">Tuition</div>
                    <div className="spec-value tuition-val" style={{ color: '#34d399', fontWeight: 'bold' }}>{prog.tuition}</div>
                  </div>
                  <div>
                    <div className="spec-label">Min Admission</div>
                    <div className="spec-value">{prog.minGpa ? `${prog.minGpa} GPA (${prog.minPercent}%)` : '2.5 GPA (65%)'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <button 
                    className="btn btn-maroon" 
                    onClick={() => setSelectedBrochureProg(prog)}
                    style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  >
                    📄 PDF Brochure
                  </button>
                  <a 
                    href="#applySection" 
                    className="btn btn-gold" 
                    onClick={() => onSelectProgramToApply(prog.id)}
                    style={{ flex: 1, padding: '10px', fontSize: '13px', textAlign: 'center' }}
                  >
                    ✍️ Apply & Upload
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SYLLABUS BROCHURE DOWNLOAD MODAL */}
      {selectedBrochureProg && (
        <div className="modal-backdrop open" style={{ display: 'flex' }}>
          <div className="modal-box" style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3 className="modal-title">📄 Download Syllabus Brochure</h3>
              <button className="modal-close" onClick={() => setSelectedBrochureProg(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
              <h4 style={{ color: 'var(--gold-light)', fontSize: '18px', marginBottom: '8px' }}>
                {selectedBrochureProg.name || selectedBrochureProg.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Enter your email address to instantly download the complete 2026 Academic Syllabus PDF & Tuition breakdown document.
              </p>
              <input type="email" className="form-control" placeholder="Enter your email address..." required style={{ marginBottom: '16px', padding: '12px' }} />
              <button 
                className="btn btn-gold" 
                style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                onClick={() => {
                  alert(`✅ Syllabus Brochure for '${selectedBrochureProg.title}' has been sent to your email address!`);
                  setSelectedBrochureProg(null);
                }}
              >
                📥 Download PDF Syllabus Brochure Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
