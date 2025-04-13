
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] py-20 md:py-28 overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block gold-text">Elegance</span> 
              <span>Crafted Just For You</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              Exquisite custom stitching and ready-to-wear options for every occasion.
              Transform your fabric into a masterpiece that's uniquely yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-purple">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            <div className="rounded-full overflow-hidden border-4 border-white/20 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
              <img 
                src="/lovable-uploads/374a46ac-8e48-4ca7-8196-229e51804eed.png" 
                alt="Fashion Model"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-brand-gold rounded-full flex items-center justify-center transform rotate-12">
              <span className="text-white font-bold">Custom Stitching</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
