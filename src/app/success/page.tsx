'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const mock = searchParams?.get('mock');
  const fileId = searchParams?.get('fileId');
  const path = searchParams?.get('path');
  const name = searchParams?.get('name');
  const email = searchParams?.get('email');
  const company = searchParams?.get('company');

  const [simulating, setSimulating] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (mock === 'true' && path && fileId && !simulating && !done) {
      setSimulating(true);
      const payload = {
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_mock_123',
            metadata: { fileId, tempFilePath: path, name, email, company }
          }
        }
      };

      fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(() => {
        setSimulating(false);
        setDone(true);
      }).catch(err => {
        console.error(err);
        setSimulating(false);
      });
    }
  }, [mock, path, fileId, name, email, company, simulating, done]);

  return (
    <div className="card" style={{ display: 'inline-block' }}>
      {simulating ? (
        <div>
          <Loader2 size={64} className="spin" style={{ color: 'var(--accent-color)', margin: '0 auto 2rem' }} />
          <h2>Processing your payment...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Please do not close this window.</p>
        </div>
      ) : (
        <div>
          <CheckCircle size={64} style={{ color: 'var(--success-color)', margin: '0 auto 2rem' }} />
          <h1 style={{ marginBottom: '1rem' }}>Payment Successful!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Your pitch deck is now being analyzed by our AI.
            <br />
            <b>We will email your detailed PDF report shortly.</b>
          </p>
          <p>
            Check your inbox (or Ethereal Mail console if running locally) for the result.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="container" style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
