"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUpChild, ScrollReveal } from "./ScrollReveal";
import { Eye, Wand2, Search, FileDown } from "lucide-react";

const reasons = [
  { icon: Eye, title: "See your startup through an investor lens", desc: "Understand how your company reads on clarity, credibility, traction, and risk." },
  { icon: Wand2, title: "Improve the pitch before the meeting", desc: "Fix weak positioning, missing proof points, and vague slides before they cost you momentum." },
  { icon: Search, title: "Identify diligence gaps early", desc: "Know what serious investors will ask for before you enter a longer fundraising process." },
  { icon: FileDown, title: "Get a shareable PDF", desc: "Receive a polished document you can review internally or use to prepare with advisors and co-founders." },
];

const WhyFounders = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <ScrollReveal>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">Why Venture IQ</p>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-14">Why founders use Venture IQ</h2>
      </ScrollReveal>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid sm:grid-cols-2 gap-5"
      >
        {reasons.map((r) => (
          <motion.div
            key={r.title}
            variants={fadeUpChild}
            className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <r.icon size={20} className="text-copper mb-3" />
            <h3 className="font-display text-lg text-charcoal mb-1.5">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyFounders;
