import { navLinks, personalInfo } from "../data/portfolioData";
import { scrollToSection } from "../utils/scroll";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-card">
      <div className="section-container py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/brand-logo.png" alt="" className="h-10 w-10 rounded-xl shadow-md shadow-amber-600/20" />
            <div>
              <p className="text-sm font-bold text-ink">{personalInfo.name}</p>
              <p className="text-xs text-muted">{personalInfo.title}</p>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.to}
                type="button"
                onClick={() => scrollToSection(link.to)}
                className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {[
              { label: "GitHub", href: personalInfo.github, Icon: GitHubIcon },
              { label: "LinkedIn", href: personalInfo.linkedin, Icon: LinkedInIcon },
              { label: "Email", href: `mailto:${personalInfo.email}`, Icon: MailIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-page text-muted
                           transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-center text-xs text-muted">
          &copy; {year} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
