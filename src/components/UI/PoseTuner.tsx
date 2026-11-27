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
          backgroundColor: isOpen
            ? 'rgba(255, 255, 255, 0.90)'
            : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          color: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          borderRadius: '9999px',
          padding: '8px 16px',
          fontSize: '11px',
          fontFamily: 'monospace',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
        }}
      >
        🔧 Pose Tuner {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 68,
            right: 24,
            width: '320px',
            maxHeight: '480px',
            overflowY: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            borderRadius: '20px',
            padding: '16px',
            color: '#0f172a',
            fontFamily: 'sans-serif',
            fontSize: '12px',
            zIndex: 60,
            boxShadow: '0 16px 40px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 800, color: '#0f172a' }}>Dev Pose Tuner</span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>State: {actionState}</span>
          </div>

          {/* Pose Selector Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '3px', borderRadius: '10px' }}>
            {(['sit-chair', 'lie-bed', 'drink-coffee'] as const).map((id) => (
              <button
                key={id}
                onClick={() => setSelectedPose(id)}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  fontSize: '10px',
                  fontWeight: selectedPose === id ? 700 : 500,
                  backgroundColor: selectedPose === id ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                  boxShadow: selectedPose === id ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
                  color: selectedPose === id ? '#0f172a' : '#64748b',
                  border: 'none',
                  borderRadius: '7px',
                  cursor: 'pointer',
                }}
              >
                {id.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Anchor sliders */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#475569', fontSize: '11px', marginBottom: '4px', fontWeight: 700 }}>Anchor (Final Pos)</div>
            {(['X', 'Y', 'Z'] as const).map((axis, i) => (
              <div key={axis} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ width: '14px', fontFamily: 'monospace', fontWeight: 600 }}>{axis}</span>
                <input
                  type="range"
                  min={axis === 'Y' ? 0 : -6}
                  max={axis === 'Y' ? 2 : 6}
                  step={0.05}
                  value={current.anchor[i]}
                  onChange={(e) => updateField('anchor', i, parseFloat(e.target.value))}
                  style={{ flex: 1, accentColor: '#0f172a' }}
                />
                <span style={{ width: '38px', fontFamily: 'monospace', textAlign: 'right', fontWeight: 600 }}>{current.anchor[i]}</span>
              </div>
            ))}
          </div>

          {/* Yaw slider */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ color: '#475569', fontSize: '11px', marginBottom: '4px', fontWeight: 700 }}>Yaw (Radians)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="range"
                min={-Math.PI}
                max={Math.PI}
                step={0.05}
                value={current.yaw}
                onChange={(e) => updateScalar('yaw', parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: '#0f172a' }}
              />
              <span style={{ width: '38px', fontFamily: 'monospace', textAlign: 'right', fontWeight: 600 }}>{current.yaw}</span>
            </div>
          </div>

          {/* Eye Height Offset */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: '#475569', fontSize: '11px', marginBottom: '4px', fontWeight: 700 }}>1st-Person Eye Height</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="range"
                min={0.3}
                max={2.0}
                step={0.05}
                value={current.eyeHeightOffset}
                onChange={(e) => updateScalar('eyeHeightOffset', parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: '#0f172a' }}
              />
              <span style={{ width: '38px', fontFamily: 'monospace', textAlign: 'right', fontWeight: 600 }}>{current.eyeHeightOffset}</span>
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
