import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATES, Certificate, CertificateCategory } from '../../data/certificates';
import { useInteractionStore } from '../../store/useInteractionStore';
import { ImageViewer } from './ImageViewer';

export const AchievementsPanel: React.FC = () => {
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);
  const [activeCategory, setActiveCategory] = useState<CertificateCategory | 'all'>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories: (CertificateCategory | 'all')[] = [
    'all',
    'hackathon',
    'certificate',
    'competition',
    'workshop',
    'technical',
    'college',
  ];

  const filteredCertificates = activeCategory === 'all'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === activeCategory);

  // Esc handling: if preview open, Esc closes preview; otherwise closes gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (selectedCert !== null) {
          setSelectedCert(null);
        } else {
          closeInteraction();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [selectedCert, closeInteraction]);

  const currentIndex = selectedCert
    ? filteredCertificates.findIndex((c) => c.id === selectedCert.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedCert(filteredCertificates[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredCertificates.length - 1) {
      setSelectedCert(filteredCertificates[currentIndex + 1]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 8, 16, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        userSelect: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '94vw',
          maxWidth: '1080px',
          maxHeight: '88vh',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.15)',
          borderRadius: '20px',
          padding: '26px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '14px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>🏆</span>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                Achievement & Certificate Wall
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                Competitive awards, technical accreditations, and symposium recognitions.
              </p>
            </div>
          </div>

          <button
            onClick={closeInteraction}
            style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  backgroundColor: isActive
                    ? 'rgba(56, 189, 248, 0.25)'
                    : 'rgba(30, 41, 59, 0.5)',
                  border: isActive
                    ? '1px solid rgba(56, 189, 248, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                style={{
                  backgroundColor: 'rgba(21, 29, 48, 0.75)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '14px',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '200px',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#38bdf8',
                        backgroundColor: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {cert.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{cert.date}</span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px', lineHeight: 1.3 }}>
                    {cert.title}
                  </h3>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#a78bfa', marginBottom: '10px' }}>
                    {cert.organization}
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#94a3b8' }}>
                    {cert.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#38bdf8',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginTop: '16px',
                  }}
                >
                  <span>Inspect Certificate</span>
                  <span>↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <span>Press <kbd style={{ color: '#38bdf8' }}>Esc</kbd> to exit gallery</span>
          <span>{filteredCertificates.length} Certificates Displayed</span>
        </div>
      </motion.div>

      {/* Large Image / Sample Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <ImageViewer
            title={selectedCert.title}
            subtitle={`${selectedCert.organization} • ${selectedCert.date}`}
            description={selectedCert.description}
            imageUrl={selectedCert.image}
            category={selectedCert.category}
            onClose={() => setSelectedCert(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < filteredCertificates.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
