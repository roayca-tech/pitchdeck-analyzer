"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Methodology", href: "#methodology" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fog/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl text-charcoal">
          Venture IQ
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href="/assessment"
          className="hidden md:inline-flex items-center justify-center h-9 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-copper transition-colors duration-200 active:scale-[0.97]"
        >
          Start My Assessment
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground active:scale-95"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-fog border-b border-border px-6 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/assessment"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center h-9 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium"
          >
            Start My Assessment
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
