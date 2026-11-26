import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getActiveSocialLinks } from '../../data/socialLinks';
import { CONTACT_ENDPOINT, isContactConfigured } from '../../data/contactConfig';
import { useInteractionStore } from '../../store/useInteractionStore';

export const ContactPanel: React.FC = () => {
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);
  const activeSocialLinks = getActiveSocialLinks();

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Esc handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        e.stopPropagation();
        closeInteraction();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [closeInteraction]);

  // 30-second cooldown timer countdown
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    // Name: 2 to 80 chars
    if (!trimmedName) {
      newErrors.name = 'Name is required';
    } else if (trimmedName.length < 2 || trimmedName.length > 80) {
      newErrors.name = 'Name must be between 2 and 80 characters';
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject
    if (!trimmedSubject) {
      newErrors.subject = 'Subject is required';
    } else if (trimmedSubject.length < 2 || trimmedSubject.length > 100) {
      newErrors.subject = 'Subject must be between 2 and 100 characters';
    }

    // Message: 10 to 2000 chars
    if (!trimmedMessage) {
      newErrors.message = 'Message is required';
    } else if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      newErrors.message = 'Message must be between 10 and 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isContactConfigured || isSubmitting || cooldownSeconds > 0) return;

    // Drop submission if honeypot was populated by a bot
    if (formData.honeypot) {
      setSubmitSuccess(true);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
        setErrors({});
        setCooldownSeconds(30);
      } else {
        setErrorMessage('Unable to deliver message right now. Please try again later.');
      }
    } catch {
      setErrorMessage('Network error occurred while sending. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
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
          maxWidth: '1020px',
          maxHeight: '88vh',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.15)',
          borderRadius: '20px',
          padding: '28px',
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
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>📡</span>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                Contact Station & Communication Hub
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                Reach out for software collaborations, technical roles, or creative engineering inquiries.
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

        {/* Two-Column Layout (Left: Social Channels / Right: Form) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            paddingRight: '4px',
          }}
        >
          {/* Left Column: Direct Channels & Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'rgba(21, 29, 48, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  color: '#38bdf8',
                  marginBottom: '12px',
                }}
              >
                Direct Channels & Socials
              </h3>

              {activeSocialLinks.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeSocialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.id === 'email' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        color: '#f8fafc',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px' }}>{link.icon || '🔗'}</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700 }}>{link.label}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{link.handle}</div>
                        </div>
                      </div>
                      <span style={{ color: '#38bdf8', fontSize: '14px' }}>↗</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: '30px',
                    borderRadius: '10px',
                    border: '1px dashed rgba(255, 255, 255, 0.12)',
                    textAlign: 'center',
                    color: '#64748b',
                    fontSize: '13px',
                  }}
                >
                  Contact links coming soon
                </div>
              )}
            </div>

            <div
              style={{
                backgroundColor: 'rgba(21, 29, 48, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  color: '#a855f7',
                  marginBottom: '8px',
                }}
              >
                Availability & Location
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#cbd5e1' }}>
                Open for full-time engineering opportunities, creative technical consultancy, and collaborative open-source web development.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div
            style={{
              backgroundColor: 'rgba(21, 29, 48, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  color: '#38bdf8',
                  marginBottom: '16px',
                }}
              >
                Send a Direct Message
              </h3>

              {/* Endpoint Notice when not configured */}
              {!isContactConfigured && (
                <div
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    color: '#fef3c7',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>⚠️</span>
                  <span>
                    Contact form is not configured yet (add <code>VITE_CONTACT_ENDPOINT</code> in <code>.env</code>).
                  </span>
                </div>
              )}

              {/* Submission Success Alert */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      color: '#86efac',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>✓</span>
                    <span>Message sent successfully! Thank you for reaching out.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submission Error Alert */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#fca5a5',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>✕</span>
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Element */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Email inputs in 2 columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      disabled={!isContactConfigured || isSubmitting}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Jane Doe"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: errors.name ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#38bdf8')}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(255, 255, 255, 0.1)')}
                    />
                    {errors.name && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>{errors.name}</div>}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      disabled={!isContactConfigured || isSubmitting}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="jane@example.com"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#38bdf8')}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.1)')}
                    />
                    {errors.email && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>{errors.email}</div>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    disabled={!isContactConfigured || isSubmitting}
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="Project Inquiry / Opportunity"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: errors.subject ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#38bdf8')}
                    onBlur={(e) => (e.target.style.borderColor = errors.subject ? '#ef4444' : 'rgba(255, 255, 255, 0.1)')}
                  />
                  {errors.subject && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>{errors.subject}</div>}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}
                  >
                    Message (10 - 2000 characters) *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    disabled={!isContactConfigured || isSubmitting}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Hello Harsh, I'd like to discuss..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: errors.message ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '85px',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#38bdf8')}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? '#ef4444' : 'rgba(255, 255, 255, 0.1)')}
                  />
                  {errors.message && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>{errors.message}</div>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!isContactConfigured || isSubmitting || cooldownSeconds > 0}
                  style={{
                    marginTop: '8px',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    background:
                      !isContactConfigured || isSubmitting || cooldownSeconds > 0
                        ? 'rgba(30, 41, 59, 0.6)'
                        : 'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)',
                    border:
                      !isContactConfigured || isSubmitting || cooldownSeconds > 0
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(56, 189, 248, 0.6)',
                    color: !isContactConfigured || isSubmitting || cooldownSeconds > 0 ? '#64748b' : '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor:
                      !isContactConfigured || isSubmitting || cooldownSeconds > 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSubmitting
                    ? 'Transmitting...'
                    : cooldownSeconds > 0
                    ? `Sent (Cooldown ${cooldownSeconds}s)`
                    : 'Send Message ↗'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <span>Press <kbd style={{ color: '#38bdf8' }}>Esc</kbd> to return to room</span>
          <span style={{ color: '#38bdf8' }}>Station Online</span>
        </div>
      </motion.div>
    </div>
  );
};
