
const PromoBanner = () => {
  return (
    <section className="py-24 bg-cover bg-center relative" style={{ backgroundImage: "url('/lovable-uploads/9b6d8060-2e33-4968-a4c7-5b8f68fc468e.png')" }}>
      <div className="absolute inset-0 bg-purple-900/70"></div>
      
      <div className="container relative z-10 text-white">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Custom Stitching <span className="gold-text">Services</span>
          </h2>
          <p className="text-lg mb-8">
            Transform your fabric into beautiful garments with our expert tailoring services. 
            Pick and drop available for your convenience.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <span className="text-2xl font-bold text-brand-gold">10+</span>
              <p className="text-sm mt-1">Years Experience</p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <span className="text-2xl font-bold text-brand-gold">1000+</span>
              <p className="text-sm mt-1">Happy Customers</p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <span className="text-2xl font-bold text-brand-gold">15+</span>
              <p className="text-sm mt-1">Stitching Options</p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <span className="text-2xl font-bold text-brand-gold">24/7</span>
              <p className="text-sm mt-1">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
