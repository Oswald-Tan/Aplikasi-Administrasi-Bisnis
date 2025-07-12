import DetailedFeatures from "../sections/DetailedFeatures";
import Features from "../sections/Features";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Hero from "../sections/Hero";
import Stats from "../sections/Stats";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <DetailedFeatures />
      <Footer />
    </div>
  );
};

export default LandingPage;
