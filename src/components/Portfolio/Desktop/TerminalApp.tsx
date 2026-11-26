import React, { useState, useRef, useEffect } from 'react';
import { PROFILE } from '../../../data/profile';
import { PROJECTS } from '../../../data/projects';
import { SKILL_CATEGORIES } from '../../../data/skills';

interface TerminalLine {
  text: string;
  type?: 'input' | 'output' | 'system' | 'error';
}

export const TerminalApp: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: 'HarshOS Terminal v4.2.0 (x86_64-pc-harsh-web)', type: 'system' },
    { text: "Type 'help' to view available system commands.", type: 'system' },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [...lines, { text: `harsh@harsh-os:~$ ${trimmed}`, type: 'input' }];
    const lower = trimmed.toLowerCase();

    switch (lower) {
      case 'help':
        newLines.push({
          text: 'Available commands: help, about, projects, skills, status, clear',
          type: 'output',
        });
        break;

      case 'about':
        newLines.push(
          { text: `Name: ${PROFILE.name}`, type: 'output' },
          { text: `Headline: ${PROFILE.headline}`, type: 'output' },
          { text: `Bio: ${PROFILE.intro}`, type: 'output' },
          { text: `Education: ${PROFILE.educationBackground}`, type: 'output' },
          { text: `Journey: ${PROFILE.developerJourney}`, type: 'output' }
        );
        break;

      case 'projects':
        newLines.push({ text: '--- Featured Projects ---', type: 'system' });
        PROJECTS.forEach((p) => {
          newLines.push({
            text: `• ${p.title} (${p.status}) - ${p.tagline}`,
            type: 'output',
          });
        });
        break;

      case 'skills':
        newLines.push({ text: '--- Technical Competencies ---', type: 'system' });
        SKILL_CATEGORIES.forEach((cat) => {
          newLines.push({ text: `[${cat.title}]`, type: 'system' });
          cat.items.forEach((item) => {
            newLines.push({ text: `  - ${item}`, type: 'output' });
          });
        });
        break;

      case 'status':
        newLines.push(
          { text: 'System Status: All subsystems active', type: 'system' },
          { text: 'Graphics Pipeline: Three.js WebGL2 ACES Filmic Tone Mapping', type: 'output' },
          { text: 'Audio Manager: Web Audio gesture unlocked', type: 'output' },
          { text: 'Active Environment: Real-time 3D Gaming Room', type: 'output' }
        );
        break;

      case 'clear':
        setLines([]);
        setInputVal('');
        return;

      default:
        newLines.push({
          text: `Command not found: ${trimmed}. Type 'help' for available commands.`,
          type: 'error',
        });
        break;
    }

    setLines(newLines);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        backgroundColor: '#050811',
        borderRadius: '8px',
        padding: '16px',
        fontFamily: 'monospace',
        fontSize: '13px',
        height: '100%',
        minHeight: '400px',
        maxHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.8)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {lines.map((l, idx) => (
          <div
            key={idx}
            style={{
              lineHeight: 1.5,
              color:
                l.type === 'input'
                  ? '#38bdf8'
                  : l.type === 'system'
                  ? '#a78bfa'
                  : l.type === 'error'
                  ? '#f87171'
                  : '#cbd5e1',
            }}
          >
            {l.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
        <span style={{ color: '#38bdf8' }}>harsh@harsh-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(inputVal);
            }
          }}
          autoFocus
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f8fafc',
            fontFamily: 'monospace',
            fontSize: '13px',
          }}
        />
      </div>
    </div>
  );
};
