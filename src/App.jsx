import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import DiscordProfiles from "./components/DiscordProfiles.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="animate-float-slow absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-blurple/25 blur-[130px]" />
        <div className="animate-float-slower absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-blurple-2/20 blur-[130px]" />
        <div className="animate-float-slow absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
      </div>
      <div className="bg-grid pointer-events-none fixed inset-0" aria-hidden />

      <div className="relative">
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
