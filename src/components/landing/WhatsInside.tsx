"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUpChild, ScrollReveal } from "./ScrollReveal";
import { FileText, Target, Activity, AlertTriangle, MessageCircle, Search, TrendingUp, Lightbulb } from "lucide-react";

const cards = [
  { icon: FileText, title: "Executive Summary", desc: "A concise investor-style overview of what your company does, who it serves, why it matters, and the initial impression it creates." },
  { icon: Target, title: "Overall Verdict", desc: "A direct recommendation: High Potential, Promising but needs proof, Too early for venture investment, or High risk / not investable yet." },
  { icon: Activity, title: "Traffic-Light Analysis", desc: "Visual scoring across Product, Market, Business Model, Traction, Team, Competition, Financial Readiness, Legal Readiness, and Fundraising Readiness." },
  { icon: AlertTriangle, title: "Risk Segment", desc: "Dedicated breakdown of risk across product, market, adoption, go-to-market, competition, financial, legal, team, and fundraising dimensions." },
  { icon: MessageCircle, title: "Perfecting Your Pitch", desc: "Practical advice on what to simplify, strengthen, quantify, cut, and what investors are likely to question." },
  { icon: Search, title: "Diligence Gap Review", desc: "Structured review of what is answered, partially answered, or still missing from an investor's perspective." },
  { icon: TrendingUp, title: "Strengths & Weaknesses", desc: "A clear summary of what increases conviction and what currently blocks it." },
  { icon: Lightbulb, title: "What Would Make This More Investable", desc: "Specific milestones, proof points, and materials that would improve investor readiness faster." },
];

const WhatsInside = () => (
  <section id="whats-inside" className="py-20 md:py-28 bg-mist/50">
    <div className="container">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">Deliverable</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-3">What you receive</h2>
        <p className="text-muted-foreground max-w-2xl mb-14">
          Not a generic summary. A serious, structured startup assessment you can actually use.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={fadeUpChild}
            className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <c.icon size={20} className="text-copper mb-3" />
            <h3 className="font-display text-base text-charcoal mb-1.5">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhatsInside;
