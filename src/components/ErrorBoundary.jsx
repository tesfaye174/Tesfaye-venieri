import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    background: 'var(--bg-main)',
                    color: 'var(--text-primary)',
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)'
                }}>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3rem',
                        color: 'var(--color-primary)',
                        marginBottom: '1rem'
                    }}>
                        Oops
                    </h1>
                    <p style={{
                        color: 'var(--text-secondary)',
                        maxWidth: '400px',
                        lineHeight: 1.6,
                        marginBottom: '2rem'
                    }}>
                        Qualcosa è andato storto. Riprova più tardi.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.8rem 2rem',
                            background: 'var(--color-primary)',
                            color: 'var(--text-on-dark)',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            cursor: 'pointer'
                        }}
                    >
                        Ricarica
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
