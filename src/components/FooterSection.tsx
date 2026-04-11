const FooterSection = () => (
  <footer className="py-8 px-6 border-t border-border">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">
        <span className="text-terminal-green">&copy;</span> 2025 SabariVasan. Built with passion.
      </p>
      <div className="flex gap-4">
        {[
          { label: "GitHub", href: "https://github.com/SabariVasan" },
          { label: "LinkedIn", href: "https://linkedin.com/in/sabarivasan" },
          { label: "Email", href: "mailto:sabarivasan1239@gmail.com" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-terminal-green transition-colors cursor-none"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default FooterSection;
