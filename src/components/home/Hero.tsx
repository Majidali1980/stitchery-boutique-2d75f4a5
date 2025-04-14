
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden dark:bg-gradient-to-r dark:from-gray-950 dark:to-gray-900">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block gold-text">Premium</span> 
              <span>Tailoring Excellence</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              Experience the perfect fit with our bespoke tailoring services. 
              From traditional to contemporary, we craft garments that reflect your unique style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white">
                <Link to="/custom-stitching">Custom Stitching</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Link to="/products">Shop Collection</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            <div className="rounded-full overflow-hidden border-4 border-brand-gold/20 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
              <img 
                src="https://github.com/Majidali1980/lmages/blob/main/girl11.jpg?raw=true" 
                alt="Fashion Model"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-brand-gold rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
              <span className="text-white font-bold text-center">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-40 h-40 bg-brand-gold rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-brand-gold rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
