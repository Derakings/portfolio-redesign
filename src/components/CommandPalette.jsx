import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks, personalInfo } from "../data/portfolioData";
import { scrollToSection } from "../utils/scroll";
import { SearchIcon } from "./icons";

// Quick-jump menu opened with Ctrl/Cmd + K. Mounted only while open, so its state resets each time.
export default function CommandPalette({ theme, onToggleTheme, onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const actions = [
    ...navLinks.map((link) => ({
      id: `go-${link.to}`,
      label: `Go to ${link.label}`,
      group: "Navigate",
      run: () => scrollToSection(link.to),
    })),
    {
      id: "theme",
      label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      group: "Preferences",
      run: onToggleTheme,
    },
    {
      id: "resume",
      label: "Open resume",
      group: "Links",
      run: () => window.open(personalInfo.resumeUrl, "_blank", "noopener,noreferrer"),
    },
    {
      id: "github",
      label: "Open GitHub profile",
      group: "Links",
      run: () => window.open(personalInfo.github, "_blank", "noopener,noreferrer"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn profile",
      group: "Links",
      run: () => window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer"),
    },
    {
      id: "email",
      label: "Copy email address",
      group: "Links",
      run: () => navigator.clipboard?.writeText(personalInfo.email),
    },
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? actions.filter((a) => `${a.label} ${a.group}`.toLowerCase().includes(q))
    : actions;

  const activeId = results[selected]?.id;

  useEffect(() => {
    if (activeId) {
      document.getElementById(`cmd-${activeId}`)?.scrollIntoView({ block: "nearest" });
    }
  }, [activeId]);

  const runAction = (action) => {
    if (!action) return;
    onClose();
    action.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (results.length ? (s + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (results.length ? (s - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAction(results[selected]);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-900/40 px-4 pt-[15vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Quick menu"
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            aria-controls="cmd-list"
            aria-activedescendant={activeId ? `cmd-${activeId}` : undefined}
            className="h-14 w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <kbd className="rounded-md border border-line bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-muted">
            Esc
          </kbd>
        </div>

        <ul id="cmd-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted">No matching commands</li>
          )}
          {results.map((action, i) => (
            <li
              key={action.id}
              id={`cmd-${action.id}`}
              role="option"
              aria-selected={i === selected}
              onMouseEnter={() => setSelected(i)}
              onClick={() => runAction(action)}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm ${
                i === selected ? "bg-accent/10 text-accent" : "text-ink"
              }`}
            >
              <span className="font-medium">{action.label}</span>
              <span className="text-xs text-muted">{action.group}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
