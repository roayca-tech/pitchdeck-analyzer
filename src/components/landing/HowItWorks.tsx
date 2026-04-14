"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUpChild, ScrollReveal } from "./ScrollReveal";
import { Upload, MessageSquare, CreditCard, FileText } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload your pitch deck", desc: "Submit your deck in PDF format along with any optional supporting materials." },
  { icon: MessageSquare, title: "Answer key investor questions", desc: "Complete a guided intake covering traction, team, market, business model, competition, financials, and fundraising readiness." },
  { icon: CreditCard, title: "Pay $99.95", desc: "Secure your assessment and finalize submission." },
  { icon: FileText, title: "Receive your comprehensive PDF", desc: "Get a structured report with traffic-light scoring, risk analysis, pitch feedback, and concrete next-step recommendations." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 md:py-28">
    <div className="container">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">Process</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-3">How it works</h2>
        <p className="text-muted-foreground max-w-2xl mb-14">
          A simple founder workflow designed to turn your pitch into a clear, investor-style assessment.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {steps.map((s, i) => (
          <motion.div key={s.title} variants={fadeUpChild} className="relative">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary text-sm font-semibold font-sans">
                {i + 1}
              </span>
              <s.icon size={18} className="text-copper" />
            </div>
            <h3 className="font-display text-lg text-charcoal mb-1.5">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
