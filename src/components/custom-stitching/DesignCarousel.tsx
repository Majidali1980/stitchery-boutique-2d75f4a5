import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomDesign } from "@/types/stitching";
import { ChevronRight } from "lucide-react";

interface DesignCarouselProps {
  title: string;
  designs: CustomDesign[];
  type: "suit" | "shirt";
}

const DesignCarousel: React.FC<DesignCarouselProps> = ({ title, designs, type }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleSelect = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
    // We'll get the index from the Embla API in a real implementation
    // For now we'll keep the current activeIndex functionality
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link to={`/custom-stitching/${type}-designs`} className="flex items-center text-brand-gold hover:underline">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="bg-brand-gold text-white py-3 px-4 mb-8 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            🧵 Choose from our premium design collection for custom stitching • Each design has a unique code for easy reference • Free shipping on orders over Rs.15000 • 
          </div>
          <div className="animate-marquee inline-block absolute">
            🧵 Choose from our premium design collection for custom stitching • Each design has a unique code for easy reference • Free shipping on orders over Rs.15000 • 
          </div>
        </div>

        <Carousel
          ref={carouselRef}
          className="w-full"
          onSelect={handleSelect}
        >
          <CarouselContent>
            {designs.map((design, index) => (
              <CarouselItem key={design.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="overflow-hidden border-2 hover:border-brand-gold transition-all duration-300 h-full">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={design.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-brand-gold text-white px-2 py-1 text-sm font-bold">
                      Code: {design.id}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{design.name}</h3>
                    {design.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{design.description}</p>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Button 
                      asChild 
                      className="bg-brand-gold hover:bg-brand-gold/90 text-white w-full"
                    >
                      <Link to={`/custom-stitching/design/${design.id}`}>
                        View Design
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 bg-white dark:bg-gray-800 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white" />
          <CarouselNext className="right-1 bg-white dark:bg-gray-800 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white" />
        </Carousel>

        <div className="flex justify-center gap-1 mt-4">
          {designs.slice(0, Math.min(designs.length, 5)).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeIndex === index ? "bg-brand-gold" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignCarousel;
