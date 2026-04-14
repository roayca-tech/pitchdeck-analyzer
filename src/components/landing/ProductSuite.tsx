"use client";

import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { staggerChildren, fadeUpChild } from "./ScrollReveal";
import { FileCheck, Eye, BarChart3, Trophy } from "lucide-react";

const products = [
  {
    icon: FileCheck,
    title: "Founder Assessment",
    label: "Live",
    labelColor: "bg-emerald-500/10 text-emerald-700",
    desc: "A paid founder-facing startup assessment. Upload a pitch deck, answer key investor questions, and receive a comprehensive PDF review with traffic-light analysis, risk segmentation, diligence gaps, and pitch-improvement guidance.",
    best: ["Fundraising prep", "Accelerator applications", "Pitch refinement", "Investor readiness"],
  },
  {
    icon: Eye,
    title: "VC Mode",
    label: "In Build",
    labelColor: "bg-amber/10 text-amber",
    desc: "An investor-style screening workflow for angels, venture funds, and deal review teams. Evaluate across clarity, credibility, traction, defensibility, market quality, and diligence readiness.",
    best: ["First-pass screening", "Internal investment review", "Analyst workflows", "Decision support"],
  },
  {
    icon: BarChart3,
    title: "Allocation System",
    label: "In Build",
    labelColor: "bg-amber/10 text-amber",
    desc: "An allocation and prioritization layer that helps compare and rank startup opportunities using structured scoring, portfolio logic, and category-weighted evaluation criteria.",
    best: ["Portfolio prioritization", "Startup ranking", "Evaluator consistency", "Capital allocation"],
  },
  {
    icon: Trophy,
    title: "Judges Scoring",
    label: "Launching Soon",
    labelColor: "bg-pale-blue text-steel",
    desc: "A live judging interface for competitions, demo days, and pitch events. Gives judges a structured way to score consistently and generate cleaner evaluation outputs.",
    best: ["Startup competitions", "Demo days", "Pitch events", "Judging panels"],
  },
];

const ProductSuite = () => (
  <section id="products" className="py-20 md:py-28 bg-mist/50">
    <div className="container">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">Product Suite</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-3">Products launching inside Venture IQ</h2>
        <p className="text-muted-foreground max-w-2xl mb-14">
          A venture intelligence system built for founders, investors, and startup evaluators.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid sm:grid-cols-2 gap-5"
      >
        {products.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUpChild}
            className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <p.icon size={24} className="text-copper" />
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${p.labelColor}`}>
                {p.label}
              </span>
            </div>
            <h3 className="font-display text-xl text-charcoal mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.best.map((b) => (
                <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-mist text-muted-foreground">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProductSuite;
