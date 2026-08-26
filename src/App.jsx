import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import DiscordProfiles from "./components/DiscordProfiles.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-12 lg:gap-12">
          <Hero />
          <div className="grid content-start gap-4 lg:col-span-8">
            <About />
            <Skills />
            <DiscordProfiles />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
