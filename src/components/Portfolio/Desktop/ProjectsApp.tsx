import React from 'react';
import { PROJECTS } from '../../../data/projects';
import { useDesktopStore } from '../../../store/useDesktopStore';
import { ProjectCard } from './ProjectCard';
import { ProjectDetail } from './ProjectDetail';

export const ProjectsApp: React.FC = () => {
  const selectedProjectId = useDesktopStore((s) => s.selectedProjectId);
  const selectProject = useDesktopStore((s) => s.selectProject);

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId);

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => selectProject(null)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* App Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#f8fafc',
              letterSpacing: '-0.01em',
              marginBottom: '4px',
            }}
          >
            Featured Projects
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Select a project to explore architecture, features, and engineering details.
          </p>
        </div>

        <span
          style={{
            fontSize: '12px',
            color: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            fontWeight: 600,
          }}
        >
          {PROJECTS.length} Projects Total
        </span>
      </div>

      {/* 2-column or 3-column Grid of Project Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(id) => selectProject(id)}
          />
        ))}
      </div>
    </div>
  );
};
