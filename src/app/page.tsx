import Nav from "../components/Nav";
import HomeSection from "../components/Home";
import AboutSection from "../components/About";
import PortfolioSection from "../components/Portfolio";
import ContactSection from "../components/../components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HomeSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </>
  );
}
