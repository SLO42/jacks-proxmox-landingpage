import { MotionConfig } from "framer-motion";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import Services from "./components/Services";
import Stack from "./components/Stack";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    // reducedMotion="user" makes every Framer animation honor the OS setting.
    <MotionConfig reducedMotion="user">
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ember focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Background />
      <Nav />

      <main id="overview">
        <Hero />
        <Capabilities />
        <Services />
        <Stack />
        <CTA />
      </main>

      <Footer />
    </MotionConfig>
  );
}
