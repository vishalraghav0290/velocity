import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductScroll from "@/components/ProductScroll";
import LifestyleSection from "@/components/LifestyleSection";
import FeaturedGrid from "@/components/FeaturedGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductScroll />
        <LifestyleSection />
        <FeaturedGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
