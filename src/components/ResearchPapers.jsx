import React from 'react';
import { INITIAL_RESEARCH_PAPERS } from '../data/initialData';

export default function ResearchPapers() {
  return (
    <section className="section-wrapper" id="researchPapersSection">
      <div className="section-header">
        <span className="section-tag">Scholarship & White Papers</span>
        <h2 className="section-title">ACADEMIC RESEARCH</h2>
        <p className="section-desc">
          Browse peer-reviewed white papers, graduate dissertations, and theoretical monographs published by University of East Florida faculty and research scholars.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {INITIAL_RESEARCH_PAPERS.map((paper, idx) => (
          <div key={idx} className="program-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="usa-flag-badge" style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--gold-light)', fontSize: '11px' }}>
                {paper.category}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                DOI: {paper.doi}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', marginBottom: '8px', lineHeight: '1.3' }}>
              {paper.title}
            </h3>

            <p style={{ fontSize: '12px', color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '10px' }}>
              ✍️ {paper.author} • <span style={{ color: 'var(--text-muted)' }}>{paper.journal}</span>
            </p>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
              {paper.abstract}
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-gold" 
                onClick={() => alert(`📄 Downloading full PDF research paper: '${paper.title}'`)}
                style={{ flex: 1, padding: '8px', fontSize: '12px' }}
              >
                📥 Download Full PDF
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => alert(`🔗 Citation copied for: ${paper.doi}`)}
                style={{ padding: '8px 12px', fontSize: '12px' }}
              >
                🔗 Cite Paper
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
