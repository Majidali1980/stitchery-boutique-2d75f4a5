
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

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link to={`/custom-stitching/${type}-designs`} className="flex items-center text-brand-gold hover:underline">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <Carousel
          ref={carouselRef}
          className="w-full"
          onSelect={(index) => setActiveIndex(index)}
        >
          <CarouselContent>
            {designs.map((design) => (
              <CarouselItem key={design.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="overflow-hidden border-2 hover:border-brand-gold transition-all duration-300 h-full">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={design.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{design.name}</h3>
                    {design.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{design.description}</p>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    {design.price && (
                      <span className="font-semibold">Rs. {design.price.toLocaleString()}</span>
                    )}
                    <Button 
                      asChild 
                      className="bg-brand-gold hover:bg-brand-gold/90 text-white"
                    >
                      <Link to={`/custom-stitching/design/${design.id}`}>
                        Select Design
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
