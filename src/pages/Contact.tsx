import React, { useState, useCallback, useMemo } from 'react';
import { Theme } from '../components/ThemeContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactProps {
  theme: Theme;
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Message sent by ${form.name}`);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [form.name]);

  const isFormValid = useMemo(() => {
    return form.name.trim() && form.email.trim() && form.message.trim();
  }, [form.name, form.email, form.message]);

  const formFields = useMemo(() => [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      icon: 'bi-person',
      placeholder: 'Enter your full name',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      icon: 'bi-envelope',
      placeholder: 'Enter your email',
      required: true
    }
  ], []);

  return (
    <div>
      <header className="bg-primary text-white text-center py-5 mb-5 rounded-3 shadow">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold mb-3">
              <i className="bi bi-chat-dots me-3" aria-hidden="true"></i>
              Get In Touch
            </h1>
            <p className="lead mb-0">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="col-md-4">
            <img 
              src="https://www.ujudebug.com/wp-content/uploads/2022/07/contact-us-content.gif"
              alt="Contact us illustration"
              className="img-fluid rounded"
              style={{ maxHeight: '150px' }}
              loading="lazy"
            />
          </div>
        </div>
      </header>

      <div className="row g-5">
        <div className="col-lg-12">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-gradient-primary py-3">
              <h3 className="mb-0">
                <i className="bi bi-envelope me-2" aria-hidden="true"></i>
                Send us a Message
              </h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  {formFields.map(field => (
                    <div key={field.name} className="col-md-6 mb-3">
                      <label htmlFor={field.name} className="form-label fw-semibold text-primary">
                        <i className={`bi ${field.icon} me-2`} aria-hidden="true"></i>
                        {field.label}
                      </label>
                      <input 
                        id={field.name}
                        type={field.type}
                        className="form-control form-control-lg border-2"
                        name={field.name}
                        value={form[field.name as keyof FormData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={isSubmitting}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-semibold text-primary">
                    <i className="bi bi-chat-text me-2" aria-hidden="true"></i>
                    Message
                  </label>
                  <textarea 
                    id="message"
                    className="form-control border-2"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2" aria-hidden="true"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;