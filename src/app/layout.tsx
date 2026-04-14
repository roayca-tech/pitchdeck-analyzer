import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitchDeck Analyzer | AI-Powered Insights',
  description: 'Upload your pitch deck and get deep, actionable AI-powered analysis instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gradient" />
        {children}
      </body>
    </html>
  );
}
