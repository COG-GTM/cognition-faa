import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import StatCards from "./components/StatCards";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import PlatformCapabilities from "./components/PlatformCapabilities";
import SDLCMapping from "./components/SDLCMapping";
import CapabilitiesGrid from "./components/CapabilitiesGrid";
import UseCases from "./components/UseCases";
import SecurityCompliance from "./components/SecurityCompliance";
import VerificationSystem from "./components/VerificationSystem";
import Methodology from "./components/Methodology";
import SelfImproving from "./components/SelfImproving";
import ObjectiveAssessment from "./components/ObjectiveAssessment";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <StatCards />
        <ArchitectureDiagram />
        <PlatformCapabilities />
        <SDLCMapping />
        <CapabilitiesGrid />
        <UseCases />
        <SecurityCompliance />
        <VerificationSystem />
        <Methodology />
        <SelfImproving />
        <ObjectiveAssessment />
      </main>
      <Footer />
    </>
  );
}
