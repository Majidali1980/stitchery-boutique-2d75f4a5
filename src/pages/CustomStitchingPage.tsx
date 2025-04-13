
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from 'react-router-dom';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { Ruler, Shirt, Scissors, Upload } from 'lucide-react';
import { ServiceType } from '@/types';
import { stitchingServices, shirtServices, bottomServices } from '@/data/services';

// Define the measurement schema based on the garment type
const shirtMeasurementsSchema = z.object({
  shoulder: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  chest: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  sleeve: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  length: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  daman: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  collar: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
});

const bottomMeasurementsSchema = z.object({
  waist: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  hip: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  outseamLength: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  inseamLength: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
  bottomWidth: z.string().refine(val => !isNaN(Number(val)), "Must be a number"),
});

const CustomStitchingPage = () => {
  const { addStitchingToCart } = useCart();
  const [selectedGarmentType, setSelectedGarmentType] = useState<"shirt" | "shalwar" | "pajama" | "complete-suit">("complete-suit");
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>("simple-stitching");
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Determine which schema to use based on garment type
  let schema;
  if (selectedGarmentType === "shirt") {
    schema = z.object({
      serviceType: z.string(),
      measurements: shirtMeasurementsSchema,
      fabric: z.string().optional(),
      notes: z.string().optional(),
    });
  } else if (selectedGarmentType === "shalwar" || selectedGarmentType === "pajama") {
    schema = z.object({
      serviceType: z.string(),
      measurements: bottomMeasurementsSchema,
      fabric: z.string().optional(),
      notes: z.string().optional(),
    });
  } else {
    // Complete suit requires both measurement sets
    schema = z.object({
      serviceType: z.string(),
      shirtMeasurements: shirtMeasurementsSchema,
      bottomMeasurements: bottomMeasurementsSchema,
      fabric: z.string().optional(),
      notes: z.string().optional(),
    });
  }

  // Initialize form with the schema
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: selectedGarmentType === "complete-suit" ? {
      serviceType: selectedServiceType,
      shirtMeasurements: {
        shoulder: "",
        chest: "",
        sleeve: "",
        length: "",
        daman: "",
        collar: ""
      },
      bottomMeasurements: {
        waist: "",
        hip: "",
        outseamLength: "",
        inseamLength: "",
        bottomWidth: ""
      },
      fabric: "",
      notes: ""
    } : {
      serviceType: selectedServiceType,
      measurements: selectedGarmentType === "shirt" ? {
        shoulder: "",
        chest: "",
        sleeve: "",
        length: "",
        daman: "",
        collar: ""
      } : {
        waist: "",
        hip: "",
        outseamLength: "",
        inseamLength: "",
        bottomWidth: ""
      },
      fabric: "",
      notes: ""
    }
  });

  const handleGarmentTypeChange = (type: "shirt" | "shalwar" | "pajama" | "complete-suit") => {
    setSelectedGarmentType(type);
    form.reset();
  };

  const handleServiceTypeChange = (type: ServiceType) => {
    setSelectedServiceType(type);
    form.setValue("serviceType", type);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setDesignImage(reader.result);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getServicePrice = () => {
    let selectedService;
    if (selectedGarmentType === "shirt") {
      selectedService = shirtServices.find(s => s.id === selectedServiceType);
    } else if (selectedGarmentType === "shalwar" || selectedGarmentType === "pajama") {
      selectedService = bottomServices.find(s => s.id === selectedServiceType) || bottomServices[0];
    } else {
      // Complete suit
      selectedService = stitchingServices.find(s => s.id === selectedServiceType);
    }
    return selectedService ? selectedService.price : 0;
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    // Process form data
    const stitchingOrder = {
      garmentType: selectedGarmentType,
      serviceType: selectedServiceType,
      measurements: selectedGarmentType === "complete-suit" ? {
        ...data.shirtMeasurements,
        ...data.bottomMeasurements
      } : data.measurements,
      fabric: data.fabric,
      designImage: designImage,
      notes: data.notes,
      price: getServicePrice()
    };

    // Add to cart
    addStitchingToCart(stitchingOrder);

    toast({
      title: "Stitching order added!",
      description: "Your custom stitching order has been added to the cart.",
    });

    // Reset form
    form.reset();
    setDesignImage(null);
  };

  const getServicesForGarmentType = () => {
    switch (selectedGarmentType) {
      case "shirt":
        return shirtServices;
      case "shalwar":
      case "pajama":
        return bottomServices;
      case "complete-suit":
      default:
        return stitchingServices;
    }
  };

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold heading-fancy">Custom Stitching</h1>
        <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Get your garments custom stitched by our expert tailors. Provide your measurements
          or use our standard size chart as reference.
        </p>
        <div className="mt-4">
          <Button variant="outline" asChild className="mr-2">
            <Link to="/size-chart">
              <Ruler className="mr-2 h-4 w-4" />
              View Size Chart
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Garment Type Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Garment Type</CardTitle>
              <CardDescription>
                Choose what you would like to get stitched
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedGarmentType} 
                onValueChange={(value) => handleGarmentTypeChange(value as any)}
                className="space-y-4"
              >
                <div className={`flex items-center space-x-2 rounded-md border p-4 ${selectedGarmentType === 'complete-suit' ? 'border-brand-gold bg-brand-black/5' : ''}`}>
                  <RadioGroupItem value="complete-suit" id="complete-suit" />
                  <label htmlFor="complete-suit" className="flex flex-1 cursor-pointer items-center justify-between">
                    <div>
                      <p className="font-medium">Complete Suit</p>
                      <p className="text-sm text-gray-500">Shirt/Kameez + Shalwar/Pajama</p>
                    </div>
                  </label>
                </div>
                <div className={`flex items-center space-x-2 rounded-md border p-4 ${selectedGarmentType === 'shirt' ? 'border-brand-gold bg-brand-black/5' : ''}`}>
                  <RadioGroupItem value="shirt" id="shirt" />
                  <label htmlFor="shirt" className="flex flex-1 cursor-pointer items-center justify-between">
                    <div>
                      <p className="font-medium">Shirt/Kameez Only</p>
                      <p className="text-sm text-gray-500">Top garment</p>
                    </div>
                  </label>
                </div>
                <div className={`flex items-center space-x-2 rounded-md border p-4 ${selectedGarmentType === 'shalwar' ? 'border-brand-gold bg-brand-black/5' : ''}`}>
                  <RadioGroupItem value="shalwar" id="shalwar" />
                  <label htmlFor="shalwar" className="flex flex-1 cursor-pointer items-center justify-between">
                    <div>
                      <p className="font-medium">Shalwar Only</p>
                      <p className="text-sm text-gray-500">Traditional loose trousers</p>
                    </div>
                  </label>
                </div>
                <div className={`flex items-center space-x-2 rounded-md border p-4 ${selectedGarmentType === 'pajama' ? 'border-brand-gold bg-brand-black/5' : ''}`}>
                  <RadioGroupItem value="pajama" id="pajama" />
                  <label htmlFor="pajama" className="flex flex-1 cursor-pointer items-center justify-between">
                    <div>
                      <p className="font-medium">Pajama Only</p>
                      <p className="text-sm text-gray-500">Straight cut trousers</p>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Stitching Services</CardTitle>
              <CardDescription>
                Select the type of stitching service you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedServiceType} 
                onValueChange={(value) => handleServiceTypeChange(value as ServiceType)}
                className="space-y-4"
              >
                {getServicesForGarmentType().map((service) => (
                  <div 
                    key={service.id}
                    className={`flex items-center space-x-2 rounded-md border p-4 ${selectedServiceType === service.id ? 'border-brand-gold bg-brand-black/5' : ''}`}
                  >
                    <RadioGroupItem value={service.id} id={service.id} />
                    <label htmlFor={service.id} className="flex flex-1 cursor-pointer items-center justify-between">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                      <div className="text-brand-gold font-semibold">
                        Rs. {service.price.toLocaleString()}
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Measurement Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Measurements</CardTitle>
                <CardDescription>
                  Enter your custom measurements or select from standard sizes
                </CardDescription>
              </div>
              <Scissors className="h-6 w-6 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Complete Suit Form */}
                  {selectedGarmentType === "complete-suit" && (
                    <Tabs defaultValue="shirt" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="shirt">Shirt Measurements</TabsTrigger>
                        <TabsTrigger value="bottom">Shalwar Measurements</TabsTrigger>
                      </TabsList>

                      <TabsContent value="shirt" className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="shirtMeasurements.shoulder"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Shoulder (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="18" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shirtMeasurements.chest"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Chest (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="40" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shirtMeasurements.sleeve"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sleeve Length (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="24" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shirtMeasurements.length"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Shirt Length (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="29" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shirtMeasurements.daman"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Daman Width (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="24" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shirtMeasurements.collar"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Collar (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="15.5" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="bottom" className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="bottomMeasurements.waist"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Waist (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="32" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bottomMeasurements.hip"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hip (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="38" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bottomMeasurements.outseamLength"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Outseam Length (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="41" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bottomMeasurements.inseamLength"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Inseam Length (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="29" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bottomMeasurements.bottomWidth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bottom Width (inches)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="17" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}

                  {/* Shirt Only Form */}
                  {selectedGarmentType === "shirt" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="measurements.shoulder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shoulder (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="18" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.chest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chest (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="40" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.sleeve"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sleeve Length (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="24" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.length"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shirt Length (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="29" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.daman"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daman Width (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="24" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.collar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Collar (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="15.5" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Bottom (Shalwar/Pajama) Form */}
                  {(selectedGarmentType === "shalwar" || selectedGarmentType === "pajama") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="measurements.waist"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waist (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="32" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.hip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hip (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="38" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.outseamLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Outseam Length (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="41" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.inseamLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Inseam Length (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="29" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="measurements.bottomWidth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bottom Width (inches)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="17" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <Separator />

                  {/* Additional Details */}
                  <div>
                    <h3 className="font-medium mb-4">Additional Details</h3>

                    <div className="mb-4">
                      <FormField
                        control={form.control}
                        name="fabric"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fabric Details (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Customer providing own fabric" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Design Image Upload */}
                    <div className="mb-6">
                      <FormLabel className="block mb-2">Design Reference Image (Optional)</FormLabel>
                      <div className="flex items-center">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">
                              {designImage ? "Click to change image" : "Upload a reference design"}
                            </p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        {designImage && (
                          <div className="ml-4 relative w-32 h-32">
                            <img 
                              src={designImage} 
                              alt="Design reference" 
                              className="w-full h-full object-cover rounded-md" 
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={() => setDesignImage(null)}
                            >
                              ✕
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Instructions (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Any specific requirements or details about your order" 
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-xl font-semibold">
                      Total: <span className="text-brand-gold">Rs. {getServicePrice().toLocaleString()}</span>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-brand-gold hover:bg-brand-gold/90"
                      size="lg"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomStitchingPage;
