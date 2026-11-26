import React, { useState } from 'react';
import { POSES, PoseConfig } from '../../data/poses';
import { useCharacterStore } from '../../store/useCharacterStore';

export const PoseTuner: React.FC = () => {
  // Only render in dev mode
  if (!import.meta.env.DEV) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPose, setSelectedPose] = useState<'sit-chair' | 'lie-bed' | 'drink-coffee'>('sit-chair');
  const [poseData, setPoseData] = useState<Record<string, PoseConfig>>(() => JSON.parse(JSON.stringify(POSES)));

  const actionState = useCharacterStore((s) => s.actionState);

  const current = poseData[selectedPose];

  const updateField = (field: 'anchor' | 'approachPoint' | 'exitPoint', index: number, value: number) => {
    setPoseData((prev) => {
      const next = { ...prev };
      next[selectedPose][field][index] = parseFloat(value.toFixed(2));
      POSES[selectedPose][field][index] = parseFloat(value.toFixed(2));
      return next;
    });
  };

  const updateScalar = (field: 'yaw' | 'eyeHeightOffset', value: number) => {
    setPoseData((prev) => {
      const next = { ...prev };
      next[selectedPose][field] = parseFloat(value.toFixed(2));
      POSES[selectedPose][field] = parseFloat(value.toFixed(2));
      return next;
    });
  };

  const handlePrintSnippet = () => {
    const snippet = `export const POSES: Record<'sit-chair' | 'lie-bed' | 'drink-coffee', PoseConfig> = ${JSON.stringify(
      poseData,
      null,
      2
    )};`;
    console.log('--- UPDATED POSES.TS SNIPPET ---');
    console.log(snippet);
    console.log('--------------------------------');
    alert('Pose snippet logged to developer console!');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((p) => !p)}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 60,
          backgroundColor: isOpen ? '#8b5cf6' : '#1e293b',
          color: '#f8fafc',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '11px',
          fontFamily: 'monospace',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        🔧 Pose Tuner {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            right: 24,
            width: '320px',
            maxHeight: '480px',
            overflowY: 'auto',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '12px',
            padding: '16px',
            color: '#f8fafc',
            fontFamily: 'sans-serif',
            fontSize: '12px',
            zIndex: 60,
            boxShadow: '0 16px 36px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 700, color: '#38bdf8' }}>Dev Pose Tuner</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>State: {actionState}</span>
          </div>

          {/* Pose Selector Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
            {(['sit-chair', 'lie-bed', 'drink-coffee'] as const).map((id) => (
              <button
                key={id}
                onClick={() => setSelectedPose(id)}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  fontSize: '10px',
                  fontWeight: selectedPose === id ? 700 : 500,
                  backgroundColor: selectedPose === id ? '#8b5cf6' : '#334155',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                {id.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Anchor sliders */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', fontWeight: 600 }}>Anchor (Final Pos)</div>
            {(['X', 'Y', 'Z'] as const).map((axis, i) => (
              <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ width: '14px', fontFamily: 'monospace' }}>{axis}</span>
                <input
                  type="range"
                  min={axis === 'Y' ? 0 : -6}
                  max={axis === 'Y' ? 2 : 6}
                  step={0.05}
                  value={current.anchor[i]}
                  onChange={(e) => updateField('anchor', i, parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={{ width: '38px', fontFamily: 'monospace', textAlign: 'right' }}>{current.anchor[i]}</span>
              </div>
            ))}
          </div>

          {/* Yaw slider */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', fontWeight: 600 }}>Yaw (Radians)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="range"
                min={-Math.PI}
                max={Math.PI}
                step={0.05}
                value={current.yaw}
                onChange={(e) => updateScalar('yaw', parseFloat(e.target.value))}
                style={{ flex: 1 }}
              />
              <span style={{ width: '38px', fontFamily: 'monospace', textAlign: 'right' }}>{current.yaw}</span>
            </div>
          </div>

          {/* Eye Height Offset */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', fontWeight: 600 }}>1st-Person Eye Height</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="range"
                min={0.3}
                max={2.0}
                step={0.05}
                value={current.eyeHeightOffset}
                onChange={(e) => updateScalar('eyeHeightOffset', parseFloat(e.target.value))}
                style={{ flex: 1 }}
              />
              <span style={{ width: '38px', fontFamily: 'monospace', textAlign: 'right' }}>{current.eyeHeightOffset}</span>
            </div>
          </div>

          {/* Action triggers */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <button
              onClick={() => (window as any).__harshStartAction?.(selectedPose)}
              style={{
                flex: 1,
                padding: '8px 0',
                backgroundColor: '#10b981',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Test Action
            </button>
            <button
              onClick={() => (window as any).__harshExitAction?.()}
              style={{
                flex: 1,
                padding: '8px 0',
                backgroundColor: '#ef4444',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Stand Up
            </button>
          </div>

          {/* Log snippet */}
          <button
            onClick={handlePrintSnippet}
            style={{
              width: '100%',
              padding: '6px 0',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            📋 Log poses.ts Snippet
          </button>
        </div>
      )}
    </>
  );
};
