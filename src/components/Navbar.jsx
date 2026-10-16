import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personalInfo, navLinks } from "../data/portfolioData";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection } from "../utils/scroll";
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "./icons";

const sectionIds = ["hero", ...navLinks.map((link) => link.to)];

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-line bg-card
                 text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          className="flex"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navbar({ theme, onToggleTheme, onOpenPalette }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border pl-3 pr-2 transition-all duration-300 sm:pl-4 ${
          scrolled || mobileOpen
            ? "border-line bg-card/80 shadow-lg shadow-amber-900/5 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => go("hero")}
          className="group flex cursor-pointer items-center gap-2.5"
          aria-label="Back to top"
        >
          <img
            src="/brand-logo.png"
            alt=""
            className="h-9 w-9 rounded-xl shadow-md shadow-amber-600/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
          />
          <span className="hidden text-sm font-bold tracking-tight text-ink sm:block">
            {personalInfo.name}
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.to;
            return (
              <li key={link.to}>
                <button
                  type="button"
                  onClick={() => go(link.to)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-accent/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open quick menu"
            className="hidden h-10 cursor-pointer items-center gap-2 rounded-xl border border-line bg-card px-3 text-sm
                       text-muted transition-colors hover:border-accent/50 hover:text-accent sm:flex"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="hidden lg:inline">Quick menu</span>
            <kbd className="rounded-md border border-line bg-subtle px-1.5 py-0.5 font-mono text-[10px] font-medium">
              Ctrl K
            </kbd>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-4 !py-2.5 md:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-line bg-card
                       text-muted md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-card/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.to}
                type="button"
                onClick={() => go(link.to)}
                className={`block w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                  active === link.to
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-subtle hover:text-ink"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenPalette();
                }}
                className="btn-ghost"
              >
                <SearchIcon className="h-4 w-4" />
                Quick menu
              </button>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
