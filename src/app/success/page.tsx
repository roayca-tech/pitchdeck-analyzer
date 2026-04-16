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
  const [reportUrl, setReportUrl] = useState<string | null>(null);

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
      }).then(res => res.json()).then(data => {
        if (data.mailUrl) {
          setReportUrl(data.mailUrl);
        }
        setSimulating(false);
        setDone(true);
      }).catch(err => {
        console.error(err);
        setSimulating(false);
      });
    }
  }, [mock, path, fileId, name, email, company, simulating, done]);

  return (
    <div className="max-w-md mx-auto p-8 bg-card text-card-foreground shadow-sm rounded-xl border border-border">
      {simulating ? (
        <div>
          <Loader2 size={64} className="animate-spin text-primary mx-auto mb-8 drop-shadow-md" />
          <h2 className="text-xl font-medium text-foreground mb-2">Processing your payment...</h2>
          <p className="text-muted-foreground">Please do not close this window.</p>
        </div>
      ) : (
        <div>
          <CheckCircle size={64} className="text-primary mx-auto mb-6" />
          <h1 className="text-2xl font-display mb-4">Payment Successful!</h1>
          <p className="text-secondary-foreground mb-6">
            Your pitch deck is now being analyzed by our AI.
            <br />
            <b>We will email your detailed PDF report shortly.</b>
          </p>
          <p className="text-secondary">
            Check your inbox (or Ethereal Mail console if running locally) for the result.
          </p>
          {reportUrl && (
            <div className="mt-8 p-4 bg-muted rounded-lg border border-border text-center">
              <p className="font-medium text-foreground mb-2">Demo Link Ready:</p>
              <a href={reportUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                {reportUrl}
              </a>
            </div>
          )}
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
