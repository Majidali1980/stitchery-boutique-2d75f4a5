
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Regular Customer",
    comment: "I've been getting my clothes stitched at MA Tailor for years. Their attention to detail and quality of work is unmatched. Every piece fits perfectly and lasts for years!",
    rating: 5,
    image: "/lovable-uploads/531d4425-afeb-434a-aa26-4cff3cc566be.png"
  },
  {
    id: 2,
    name: "Sana Javed",
    role: "Fashion Enthusiast",
    comment: "The custom stitching service is amazing. They were able to recreate a design I saw online perfectly. The fabric quality is excellent and delivery was on time.",
    rating: 5,
    image: "/lovable-uploads/374a46ac-8e48-4ca7-8196-229e51804eed.png"
  },
  {
    id: 3,
    name: "Zara Malik",
    role: "First-time Customer",
    comment: "I was hesitant about ordering online, but MA Tailor exceeded my expectations. The measurements were perfect and the embroidery work was gorgeous.",
    rating: 4,
    image: "/lovable-uploads/d88e53ea-f8d9-4ca8-8c5c-75267b8ec30b.png"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const activeTestimonial = testimonials[activeIndex];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold heading-fancy">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-lg p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-gold mx-auto">
                  <img 
                    src={activeTestimonial.image} 
                    alt={activeTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex mb-3 justify-center md:justify-start">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                  {Array.from({ length: 5 - activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="text-gray-300" size={18} />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 italic">"{activeTestimonial.comment}"</p>
                
                <div>
                  <h4 className="font-semibold text-lg">{activeTestimonial.name}</h4>
                  <p className="text-sm text-gray-500">{activeTestimonial.role}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    index === activeIndex ? "bg-brand-gold" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                ></span>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full hidden md:flex"
              onClick={prevTestimonial}
            >
              <ChevronLeft size={20} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full hidden md:flex"
              onClick={nextTestimonial}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
