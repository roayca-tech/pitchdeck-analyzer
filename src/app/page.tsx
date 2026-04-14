'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const router = useRouter();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Only accept PDF for now to simplify extraction, or add PPT if required
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.ppt') && !selectedFile.name.endsWith('.pptx')) {
      setError('Please upload a valid PDF or PowerPoint presentation.');
      return;
    }
    setError('');
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !email) {
      setError('Please fill out all required fields and upload a pitch deck.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('company', company);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        // Safe navigation in Next.js SPA
        router.push(data.url);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="header">
        <h1>Pitch Deck Analyzer</h1>
        <p>Get instant, actionable AI-driven feedback on your startup pitch deck. Upload yours below and unlock comprehensive analysis.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input 
              id="name"
              type="text" 
              className="form-control" 
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input 
              id="email"
              type="email" 
              className="form-control" 
              placeholder="john@startup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input 
              id="company"
              type="text" 
              className="form-control" 
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Upload Pitch Deck (PDF or PPT) *</label>
            <div 
              className={`file-drop-area ${isDragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                style={{ display: 'none' }}
              />
              <UploadCloud size={48} className="file-drop-icon" />
              {file ? (
                <div style={{ color: 'var(--success-color)', fontWeight: 500 }}>
                  Selected: {file.name}
                </div>
              ) : (
                <div>
                  <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Click or drag file to this area to upload</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>PDF or PowerPoint (Max 10MB)</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn" disabled={loading || !file || !name || !email}>
              {loading ? (
                <>
                  <Loader2 size={20} className="spin" />
                  Processing...
                </>
              ) : (
                'Unlock AI Analysis - $49'
              )}
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
            Secure payment powered by Stripe.
          </p>
        </form>
      </div>
    </main>
  );
}
