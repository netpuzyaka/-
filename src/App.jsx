import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import DiscordProfiles from "./components/DiscordProfiles.jsx";
import Footer from "./components/Footer.jsx";
import CursorDot from "./components/CursorDot.jsx";
import IntroOverlay from "./components/IntroOverlay.jsx";
import PageLoader from "./components/PageLoader.jsx";
import { useGlitch } from "./hooks/useGlitch.js";

export default function App() {
  useGlitch();

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="grid-floor" />
        <div className="glow-orb o1" />
        <div className="glow-orb o2" />
        <div className="glow-orb o3" />
      </div>

      <PageLoader />
      <IntroOverlay />
      <CursorDot />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <DiscordProfiles />
        </main>
        <Footer />
      </div>
    </div>
  );
}
