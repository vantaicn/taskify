import Hero from "@/components/home/Hero";
import Features from "@/components/home/Feature";
import Footer from "@/components/layout/AppFooter";

const Index = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;