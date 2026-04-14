"use client";

import Link from "next/link";

import { ArrowRight, FileText } from "lucide-react";

const verdictRows = [
  { label: "Overall Verdict", value: "Promising but needs proof", color: "text-amber" },
  { label: "Product / Technology", color: "bg-amber" },
  { label: "Market Opportunity", color: "bg-emerald-500" },
  { label: "Business Model", color: "bg-amber" },
  { label: "Traction / Validation", color: "bg-red-500" },
  { label: "Team", color: "bg-emerald-500" },
  { label: "Fundraising Readiness", color: "bg-amber" },
];

const sectionLabels = [
  "Executive Summary",
  "Risk Segment",
  "Perfecting Your Pitch",
  "Diligence Gaps",
  "Final Recommendation",
];

const Hero = () => (
  <section className="pt-28 pb-20 md:pt-36 md:pb-28">
    <div className="container grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      {/* Left */}
      <div className="animate-fade-up">
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] text-charcoal mb-3">
          Get to Wow Before You Pitch
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-5 leading-relaxed font-sans">
          Turn Your Pitch Into a Clear, Compelling, Credible Story
        </p>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mb-4 leading-relaxed">
          Upload your pitch deck, answer a focused set of investor-style questions, and receive a comprehensive PDF that shows how your company reads through an investor lens: is it clear, is it compelling, and is it credible?
        </p>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mb-4 leading-relaxed">
          Your report includes traffic-light analysis, key risk areas, diligence gaps, and practical feedback to strengthen the story, sharpen the value proposition, and improve the proof behind your pitch.
        </p>
        <p className="text-sm text-muted-foreground/80 max-w-xl mb-8 italic leading-relaxed">
          Built for founders who want to understand not just what their deck says, but whether an investor will believe it, remember it, and want to keep the conversation going.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-copper transition-colors duration-200 active:scale-[0.97]"
          >
            Upload Deck & Start <ArrowRight size={16} />
          </Link>
          <a
            href="#whats-inside"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-border text-foreground font-medium text-sm hover:bg-mist transition-colors duration-200 active:scale-[0.97]"
          >
            See What's Inside
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          $99.95 · PDF delivery · VC-style review
        </p>
      </div>

      {/* Right — Report Preview */}
      <div className="relative animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="bg-card rounded-xl shadow-xl shadow-charcoal/5 border border-border p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText size={18} className="text-copper" />
            <span className="font-display text-lg text-charcoal">Assessment Preview</span>
          </div>

          <div className="space-y-3 mb-6">
            {verdictRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                {row.value ? (
                  <span className="font-medium text-amber">{row.value}</span>
                ) : (
                  <span className={`w-3 h-3 rounded-full ${row.color}`} />
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 flex flex-wrap gap-2">
            {sectionLabels.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full bg-mist text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-copper font-medium">
            <FileText size={14} />
            Comprehensive PDF Export
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
