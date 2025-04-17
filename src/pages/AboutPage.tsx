
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scissors, Award, Clock } from "lucide-react";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] py-20 md:py-28 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MA Tailor</h1>
            <p className="text-lg mb-8">
              Crafting premium custom and ready-to-wear clothing for women and girls since 2015
            </p>
          </div>
        </div>
        
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full filter blur-3xl"></div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold heading-fancy mb-6">Our Story</h2>
              <div className="w-24 h-1 bg-brand-gold mb-6"></div>
              <p className="text-gray-600 mb-4">
                MA Tailor was founded with a passion for craftsmanship and a love for traditional
                South Asian attire. What started as a small tailoring shop in Karachi has grown
                into a beloved brand known for its quality and attention to detail.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, Tayaba Majid, began her journey with a single sewing machine and a 
                vision to create affordable yet exquisite clothing for women. Today, we're proud 
                to have served thousands of customers across Pakistan and beyond.
              </p>
              <p className="text-gray-600">
                Each garment that leaves our workshop is crafted with care, ensuring that every 
                customer feels confident and beautiful in their outfit.
              </p>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="https://github.com/Majidali1980/lmages/blob/main/girl3.jpeg?raw=true" 
                  alt="Our Story" 
                  className="rounded-lg object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                  <p className="text-brand-gold font-semibold">Since 2015</p>
                  <h3 className="text-xl font-bold">8+ Years of Excellence</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold heading-fancy">Why Choose Us</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              We take pride in delivering quality products and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <Scissors className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Craftsmanship</h3>
              <p className="text-gray-600">
                Our skilled tailors bring decades of experience to every stitch, ensuring perfect 
                fits and impeccable finishing every time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-brand-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
              <p className="text-gray-600">
                We use only high-quality fabrics and materials sourced from trusted suppliers
                to create garments that look and feel luxurious.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-brand-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Timely Delivery</h3>
              <p className="text-gray-600">
                We understand the importance of schedules and commit to delivering your
                orders on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold heading-fancy">Our Process</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              From measurement to delivery, our process ensures quality at every step
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between">
            <div className="relative md:w-1/4 mb-8 md:mb-0">
              <div className="bg-brand-gold h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto md:mx-0">
                1
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Choose Your Style</h3>
                <p className="text-gray-600">
                  Browse our collection and select ready-to-wear outfits or fabrics for custom stitching.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[70px] right-0 border-t-2 border-dashed border-gray-300"></div>
            </div>
            
            <div className="relative md:w-1/4 mb-8 md:mb-0">
              <div className="bg-brand-gold h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto md:mx-0">
                2
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Measurements</h3>
                <p className="text-gray-600">
                  For custom orders, provide your measurements or choose standard sizing for ready-to-wear.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[70px] right-0 border-t-2 border-dashed border-gray-300"></div>
            </div>
            
            <div className="relative md:w-1/4 mb-8 md:mb-0">
              <div className="bg-brand-gold h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto md:mx-0">
                3
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Crafting</h3>
                <p className="text-gray-600">
                  Our expert tailors carefully create your garment with precision and attention to detail.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[70px] right-0 border-t-2 border-dashed border-gray-300"></div>
            </div>
            
            <div className="md:w-1/4">
              <div className="bg-brand-gold h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto md:mx-0">
                4
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Delivery</h3>
                <p className="text-gray-600">
                  Your finished outfit is carefully packaged and delivered to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience MA Tailor?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Browse our collection or get in touch with us to discuss your custom stitching needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
