import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Top-level application error boundary that catches unexpected React / WebGL rendering
 * crashes and displays a recoverable fallback view.
 */
export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AppErrorBoundary caught an unhandled rendering error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#030712',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            color: '#f8fafc',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              maxWidth: '500px',
              width: '100%',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>⚠️</div>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#f87171',
                marginBottom: '10px',
              }}
            >
              Application Render Encountered an Issue
            </h1>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#94a3b8',
                marginBottom: '20px',
              }}
            >
              The 3D environment or UI system encountered an unexpected state. Reloading usually
              resolves transient context losses.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <pre
                style={{
                  textAlign: 'left',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '11px',
                  color: '#fca5a5',
                  overflowX: 'auto',
                  maxHeight: '120px',
                  marginBottom: '20px',
                }}
              >
                {this.state.error.message}
              </pre>
            )}

            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
              }}
            >
              Reload Digital World
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
