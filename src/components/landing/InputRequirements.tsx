"use client";

import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle, HelpCircle, Plus } from "lucide-react";

const required = [
  "Pitch deck PDF", "Founder name", "Company name", "Website", "Contact email", "Startup stage", "One-sentence company description",
];

const questions = [
  "What problem are you solving?", "Who is the customer?", "Why now?", "What is your solution?",
  "What makes it different?", "What traction do you have?", "How do you make money?",
  "Who are your competitors?", "What are you raising?", "What are the biggest open risks today?",
];

const optional = [
  "Financial summary", "Product screenshots", "Customer logos", "Demo link", "Data room link", "Additional founder notes",
];

const InputRequirements = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-4xl">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">Requirements</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-3">What you'll need to submit</h2>
        <p className="text-muted-foreground mb-12">
          To generate a strong assessment, we ask for your core materials and a short set of structured answers.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        <ScrollReveal delay={0}>
          <h3 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600" /> Required
          </h3>
          <ul className="space-y-2">
            {required.map((r) => (
              <li key={r} className="text-sm text-muted-foreground">{r}</li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h3 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
            <HelpCircle size={16} className="text-copper" /> Guided Questions
          </h3>
          <ul className="space-y-2">
            {questions.map((q) => (
              <li key={q} className="text-sm text-muted-foreground">{q}</li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <h3 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
            <Plus size={16} className="text-steel" /> Optional
          </h3>
          <ul className="space-y-2">
            {optional.map((o) => (
              <li key={o} className="text-sm text-muted-foreground">{o}</li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default InputRequirements;
