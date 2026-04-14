import type { Metadata } from 'next';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
