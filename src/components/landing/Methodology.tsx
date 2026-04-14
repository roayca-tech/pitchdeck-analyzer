"use client";

import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { staggerChildren, fadeUpChild } from "./ScrollReveal";

const pillars = [
  { title: "Clear", desc: "Is it obvious what the company does, for whom, and why it matters?" },
  { title: "Compelling", desc: "Does the startup solve an urgent problem with a meaningful advantage?" },
  { title: "Credible", desc: "Are the claims supported by traction, evidence, proof points, and believable execution logic?" },
];

const dimensions = [
  "Market opportunity", "Product & technology", "Business model", "Traction",
  "Defensibility", "Team", "Financial readiness", "Legal & diligence readiness", "Fundraising readiness",
];

const Methodology = () => (
  <section id="methodology" className="py-20 md:py-28 bg-mist/50">
    <div className="container">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">Methodology</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-3">How we assess your startup</h2>
        <p className="text-muted-foreground max-w-2xl mb-14">
          Our framework combines pitch quality, business quality, and investor readiness.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid md:grid-cols-3 gap-5 mb-14"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUpChild}
            className="bg-card rounded-xl border border-border p-8 text-center shadow-sm"
          >
            <h3 className="font-display text-2xl text-charcoal mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <ScrollReveal>
        <p className="text-sm text-muted-foreground max-w-3xl mb-4">
          We also review the company across the dimensions investors care about most:
        </p>
        <div className="flex flex-wrap gap-2">
          {dimensions.map((d) => (
            <span key={d} className="text-xs px-3 py-1 rounded-full bg-card border border-border text-muted-foreground">
              {d}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Methodology;
