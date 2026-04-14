"use client";

import { ScrollReveal } from "./ScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What do I receive after payment?", a: "You receive a comprehensive PDF assessment covering your startup's strengths, risks, pitch quality, diligence gaps, and investor-readiness." },
  { q: "Is this a fundraising guarantee?", a: "No. This is an assessment and feedback product designed to improve clarity, readiness, and decision support." },
  { q: "Who is this for?", a: "Founders preparing to raise capital, apply to accelerators, enter competitions, or sharpen their investor narrative." },
  { q: "What materials do I need?", a: "At minimum, your pitch deck and responses to the guided assessment questions." },
  { q: "What does the report evaluate?", a: "The report reviews pitch quality, business fundamentals, traction signals, risks, diligence gaps, and fundraising readiness." },
  { q: "Is the report shareable?", a: "Yes. The output is a clean, professional PDF designed to be useful for internal review and founder preparation." },
  { q: "Will it tell me if I'm investable?", a: "Yes. The report includes a direct overall verdict and explains what would need to improve for stronger investor conviction." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-mist/50">
      <div className="container max-w-2xl">
        <ScrollReveal>
          <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3 text-center">FAQ</p>
          <h2 className="text-3xl md:text-4xl text-charcoal mb-12 text-center">Frequently asked questions</h2>
        </ScrollReveal>

        <div className="space-y-2">
          {faqs.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 0.04}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left bg-card rounded-xl border border-border p-5 hover:shadow-sm transition-shadow duration-200 active:scale-[0.995]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-charcoal">{f.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  />
                </div>
                {open === i && (
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
                )}
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
