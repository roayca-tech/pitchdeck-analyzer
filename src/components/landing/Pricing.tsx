"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const included = [
  "1 startup assessment",
  "1 structured PDF report",
  "Traffic-light analysis",
  "Risk segment",
  "Pitch feedback",
  "Diligence gap review",
  "Final recommendation",
];

const Pricing = () => (
  <section id="pricing" className="py-20 md:py-28 bg-mist/50">
    <div className="container max-w-lg">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3 text-center">Pricing</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-12 text-center">Simple pricing</h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-lg shadow-charcoal/5">
          <h3 className="font-display text-xl text-charcoal mb-1">Comprehensive Startup Assessment</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Built for founders who want sharper feedback before pitching investors, accelerators, judges, or strategic partners.
          </p>

          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-display text-4xl text-charcoal">$99</span>
            <span className="font-display text-2xl text-charcoal">.95</span>
          </div>

          <ul className="space-y-2.5 mb-8">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                <Check size={15} className="text-copper shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/assessment"
            className="w-full inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors duration-200 shadow-sm"
          >
            Start Analysis <ArrowRight size={16} />
          </Link>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Payment is required before report generation.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Pricing;
