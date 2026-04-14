"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUpChild, ScrollReveal } from "./ScrollReveal";

const milestones = [
  {
    title: "Product Spec + Rubric Finalized",
    desc: "Finalized product specification, assessment rubric, scoring criteria, traffic-light logic, risk categories, and report structure for VC Mode.",
    window: "March 7–13, 2026",
    duration: "5 working days",
  },
  {
    title: "Working Prototype (VC Mode)",
    desc: "Functional VC Mode prototype including founder intake flow, pitch deck upload, structured assessment logic, and preliminary report output.",
    window: "March 16–25, 2026",
    duration: "8 working days",
  },
  {
    title: "Allocation System Integrated",
    desc: "Allocation system integrated into the platform and connected to structured assessment workflows.",
    window: "April 1–9, 2026",
    duration: "7 working days",
  },
  {
    title: "Judges Scoring System Live",
    desc: "Live judges scoring system, including startup competition judge mode, scoring interface, and evaluation output.",
    window: "April 10–17, 2026",
    duration: "6 working days",
  },
];

const Roadmap = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-4xl">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">Roadmap</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-3">Launch roadmap</h2>
        <p className="text-muted-foreground max-w-2xl mb-14">
          The Venture IQ platform is being released in structured phases across founder assessment, venture review, allocation, and judging workflows.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative"
      >
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="space-y-8">
          {milestones.map((m, i) => (
            <motion.div key={m.title} variants={fadeUpChild} className="md:pl-12 relative">
              <div className="hidden md:flex absolute left-0 top-1 w-8 h-8 rounded-full bg-primary/10 items-center justify-center text-xs font-semibold text-primary font-sans">
                {i + 1}
              </div>
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-display text-lg text-charcoal mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="px-2.5 py-0.5 rounded-full bg-mist">{m.window}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-mist">{m.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Roadmap;
