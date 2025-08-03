import Header from "@/components/home/header";
import HeroSection from "@/components/home/hero-section";
import CardsSection from "@/components/home/cards-section";
import AboutUs from "@/app/about-us/page";
import Footer from "@/components/footer/page";
import Squares from "@/components/global/background"; 


export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Canvas */}
      <div className="fixed inset-0 z-[-1]">
        <Squares
          direction="diagonal" 
          speed={0.5} 
          borderColor="#666" 
          squareSize={40} 
          hoverFillColor="#333" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <CardsSection />
        <AboutUs />
        <Footer/>
      </div>
    </div>
  );
}