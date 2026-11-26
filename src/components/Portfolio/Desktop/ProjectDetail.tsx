import React from 'react';
import { Project } from '../../../data/projects';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top bar with back button & project title */}
      <div>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#a78bfa',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '16px',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.25)';
            e.currentTarget.style.color = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
            e.currentTarget.style.color = '#a78bfa';
          }}
        >
          <span>←</span>
          <span>Back to Projects</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              {project.title}
            </h1>
            <p style={{ fontSize: '15px', color: '#94a3b8' }}>{project.tagline}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              {project.status}
            </span>

            {/* GitHub Button - ONLY rendered if githubUrl is non-empty */}
            {project.githubUrl !== '' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#f8fafc',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                GitHub ↗
              </a>
            )}

            {/* Live Demo Button - ONLY rendered if liveUrl is non-empty */}
            {project.liveUrl !== '' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.6)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 1. Overview */}
      <section style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#38bdf8', fontWeight: 700, marginBottom: '8px' }}>
          Overview
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0' }}>{project.overview}</p>
      </section>

      {/* 2. Problem Statement & Proposed Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f87171', fontWeight: 700, marginBottom: '8px' }}>
            Problem Statement
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#cbd5e1' }}>{project.problemStatement}</p>
        </div>

        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#4ade80', fontWeight: 700, marginBottom: '8px' }}>
            Proposed Solution
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#cbd5e1' }}>{project.solution}</p>
        </div>
      </div>

      {/* 3. Key Features & Technologies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a78bfa', fontWeight: 700, marginBottom: '12px' }}>
            Key Features
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a78bfa', fontWeight: 700, marginBottom: '12px' }}>
            Technologies
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#38bdf8',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Technical Architecture */}
      <section style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#38bdf8', fontWeight: 700, marginBottom: '8px' }}>
          Technical Architecture
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#cbd5e1' }}>{project.architecture}</p>
      </section>

      {/* 5. Screenshot Gallery */}
      <section style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a78bfa', fontWeight: 700, marginBottom: '12px' }}>
          Screenshot Gallery
        </h3>
        {project.screenshots.length === 0 ? (
          <div
            style={{
              padding: '36px',
              borderRadius: '10px',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              textAlign: 'center',
              color: '#64748b',
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '20px' }}>🖼️</span>
            <span>No screenshots yet</span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {project.screenshots.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. Challenges & Outcomes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f59e0b', fontWeight: 700, marginBottom: '12px' }}>
            Challenges
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.challenges.map((c, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
                <span style={{ color: '#f59e0b' }}>▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#10b981', fontWeight: 700, marginBottom: '12px' }}>
            Outcomes & Impact
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.outcomes.map((o, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
                <span style={{ color: '#10b981' }}>✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
