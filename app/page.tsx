import { VideoBackground } from "@/components/VideoBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { StoryCarousel } from "@/components/StoryCarousel";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <VideoBackground />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <StoryCarousel />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
