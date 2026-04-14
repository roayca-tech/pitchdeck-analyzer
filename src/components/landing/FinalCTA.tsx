"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-2xl text-center">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl text-charcoal mb-4">
          Know how your startup reads before the next pitch
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Upload your deck, answer the questions, and receive a serious assessment built to help you pitch more clearly, address risk, and improve investor readiness.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/assessment"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-copper transition-colors duration-200 active:scale-[0.97]"
          >
            Upload Deck & Start <ArrowRight size={16} />
          </a>
          <a
            href="#whats-inside"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-border text-foreground font-medium text-sm hover:bg-mist transition-colors duration-200 active:scale-[0.97]"
          >
            See What's Inside
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default FinalCTA;
