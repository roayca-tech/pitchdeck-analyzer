"use client";

const footerLinks = [
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <span className="font-display text-lg text-charcoal">Venture IQ</span>
        <p className="text-sm text-muted-foreground mt-1">
          Investor-style startup assessment for founders.
        </p>
      </div>

      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        {footerLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
