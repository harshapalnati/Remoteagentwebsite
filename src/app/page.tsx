import Hero from "../components/hero/Hero";
import EngineersLogoStrip from "../components/marketing/EngineersLogoStrip";
import AgentsGallery from "../components/AgentsGallery";
import HowItWorksPinned from "../components/HowItWorksPinned";
import WhyRemoteAgent from "../components/SectionWhyRemoteAgentInline";
import Footer from "../components/marketing/Footer";

import meta from "../components/images/meta.png";
import mit from "../components/images/mit_logo_std_rgb_white.png";
import amazon from "../components/images/amazon-logo-white-removebg-preview.png";
import microsoft from "../components/images/microsoft-logo-black-and-white.png";
import salesforce from "../components/images/salesforce.png";

// removed other sections to render only Why RemoteAgent Interactive

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <EngineersLogoStrip
        logos={[
          { name: "Meta", src: meta },
          { name: "MIT", src: mit },
          { name: "Amazon", src: amazon },
          { name: "Microsoft", src: microsoft },
          { name: "Salesforce", src: salesforce },
        ]}
      />
      <AgentsGallery />
      <HowItWorksPinned />
      <WhyRemoteAgent />
      <Footer />
    </div>
  );
}
