
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomDesign } from "@/types/stitching";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import designs data from CustomDesigns component
import { suitDesigns, shirtDesigns, trouserDesigns, kameezShalwarDesigns } from "@/data/stitching-designs";

const StitchingDesignsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const renderDesignGrid = (designs: CustomDesign[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {designs.map((design) => (
        <Card key={design.id} className="overflow-hidden border-2 hover:border-brand-gold transition-all duration-300 h-full">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={design.imageUrl}
              alt={design.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-0 right-0 bg-brand-gold text-white px-2 py-1 text-sm font-bold">
              Code: {design.designCode || design.id}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">{design.name}</h3>
            {design.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{design.description}</p>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0">
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
      ))}
    </div>
  );

  return (
    <div className="container py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">Stitching Designs</h1>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
        Browse our exclusive collection of stitching designs for different garment types
      </p>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 max-w-3xl mx-auto">
          <TabsTrigger value="all">All Designs</TabsTrigger>
          <TabsTrigger value="suits">Suits</TabsTrigger>
          <TabsTrigger value="shirts">Shirts</TabsTrigger>
          <TabsTrigger value="trousers">Trousers</TabsTrigger>
          <TabsTrigger value="kameez">Kameez Shalwar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <h2 className="text-2xl font-semibold mt-8 mb-4">All Designs</h2>
          {renderDesignGrid([...suitDesigns, ...shirtDesigns, ...trouserDesigns, ...kameezShalwarDesigns])}
        </TabsContent>
        
        <TabsContent value="suits">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Suit Designs</h2>
          {renderDesignGrid(suitDesigns)}
        </TabsContent>
        
        <TabsContent value="shirts">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shirt Designs</h2>
          {renderDesignGrid(shirtDesigns)}
        </TabsContent>
        
        <TabsContent value="trousers">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Trouser Designs</h2>
          {renderDesignGrid(trouserDesigns)}
        </TabsContent>
        
        <TabsContent value="kameez">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Kameez Shalwar Designs</h2>
          {renderDesignGrid(kameezShalwarDesigns)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StitchingDesignsPage;
