import React from 'react';
import { INITIAL_NEWS } from '../data/initialData';

export default function UniversityBulletin() {
  return (
    <section className="section-wrapper" id="globalNewsSection">
      <div className="section-header">
        <h2 className="section-title">UNIVERSITY BULLETIN</h2>
        <p className="section-desc">
          Official news, academic breakthroughs, Senate announcements, and global partnership press releases from the University of East Florida.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {INITIAL_NEWS.map(item => (
          <div key={item.id} className="news-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="usa-flag-badge" style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--gold-light)', fontSize: '11px' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.date}</span>
              </div>

              <h3 style={{ fontSize: '18px', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', marginBottom: '10px', lineHeight: '1.3' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                {item.snippet}
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-gold)' }}>
                <span style={{ fontSize: '12px', color: 'var(--gold-primary)', fontWeight: 'bold' }}>Source: {item.publisher}</span>
                <button 
                  className="btn btn-outline" 
                  onClick={() => alert(`📰 Reading full article: '${item.title}'`)}
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                >
                  Read Full Press Release →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
