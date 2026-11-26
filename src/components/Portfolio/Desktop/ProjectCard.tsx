import React from 'react';
import { Project } from '../../../data/projects';

interface ProjectCardProps {
  project: Project;
  onSelect: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project.id)}
      style={{
        backgroundColor: 'rgba(21, 29, 48, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(139, 92, 246, 0.22)',
        borderRadius: '14px',
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '190px',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
        e.currentTarget.style.boxShadow =
          '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.22)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top row: Title & Status badge */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          <h3
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#f8fafc',
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#94a3b8',
            marginBottom: '16px',
          }}
        >
          {project.tagline}
        </p>
      </div>

      {/* Bottom row: Tech chip preview and View details link */}
      <div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '14px',
          }}
        >
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#cbd5e1',
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#a78bfa',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          <span>View Details</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};
