import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import IntroVideo from "./components/IntroVideo";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Ctrl/Cmd + K toggles the quick menu
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-page font-sans text-ink">
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <main>
        <Hero />
        <About />
        <IntroVideo />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            key="palette"
            theme={theme}
            onToggleTheme={toggleTheme}
            onClose={() => setPaletteOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
