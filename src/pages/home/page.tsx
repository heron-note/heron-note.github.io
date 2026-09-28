import Header from "./components/Header";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import SeriesSection from "./components/SeriesSection";
import WorkSection from "./components/WorkSection";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-oat text-ink overflow-x-hidden">
      <Header />
      <main id="main-content">
        <Hero />
        <Introduction />
        <SeriesSection />
        <WorkSection />
        <Marquee />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}