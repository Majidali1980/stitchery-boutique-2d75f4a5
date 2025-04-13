
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Ruler, Shirt, PanelLeftClose } from 'lucide-react';

const SizeChartPage = () => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  const toggleUnit = () => {
    setUnit(prev => prev === 'in' ? 'cm' : 'in');
  };

  const convertToSelected = (value: number, baseUnit: 'in' | 'cm') => {
    if (baseUnit === unit) return value;
    return baseUnit === 'in' ? value * 2.54 : value / 2.54;
  };

  const formatMeasurement = (value: number) => {
    return value.toFixed(1) + " " + unit;
  };

  return (
    <div className="container py-10 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold heading-fancy">Size Guide</h1>
        <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        <p className="mt-4 text-gray-600">
          Use this comprehensive guide to determine the right measurements for your custom garments
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleUnit} 
          className="flex items-center gap-2 px-3 py-1 rounded border border-brand-gold text-brand-gold text-sm"
        >
          <Ruler size={16} />
          Switch to {unit === 'in' ? 'cm' : 'inches'}
        </button>
      </div>

      <Tabs defaultValue="how-to-measure">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="how-to-measure">How to Measure</TabsTrigger>
          <TabsTrigger value="shirt">Shirt Sizes</TabsTrigger>
          <TabsTrigger value="bottoms">Shalwar/Pajama</TabsTrigger>
        </TabsList>

        <TabsContent value="how-to-measure">
          <Card>
            <CardHeader>
              <CardTitle>How to Take Your Measurements</CardTitle>
              <CardDescription>
                For the most accurate results, have someone else take your measurements while you stand in a relaxed position.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Shirt className="mr-2" size={20} />
                    For Shirts & Kameez
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">1</div>
                      <div>
                        <strong>Shoulder Width:</strong> Measure from the edge of one shoulder to the other, across the back.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">2</div>
                      <div>
                        <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">3</div>
                      <div>
                        <strong>Sleeve Length:</strong> With arm slightly bent, measure from shoulder point to where you want sleeve to end.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">4</div>
                      <div>
                        <strong>Shirt Length:</strong> Measure from the highest point of the shoulder to the desired length.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">5</div>
                      <div>
                        <strong>Daman:</strong> Measure the width of the shirt at the bottom hem.
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <PanelLeftClose className="mr-2" size={20} />
                    For Shalwar & Pajama
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">1</div>
                      <div>
                        <strong>Waist:</strong> Measure around your natural waistline.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">2</div>
                      <div>
                        <strong>Hip:</strong> Measure around the fullest part of your hips.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">3</div>
                      <div>
                        <strong>Outseam Length:</strong> Measure from the waist to where you want the bottom to end.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">4</div>
                      <div>
                        <strong>Inseam Length:</strong> Measure from the crotch to the bottom of the leg.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-semibold">5</div>
                      <div>
                        <strong>Bottom Width:</strong> Measure the circumference at the bottom of the leg.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shirt">
          <Card>
            <CardHeader>
              <CardTitle>Standard Shirt Measurements</CardTitle>
              <CardDescription>
                You can use these standard measurements as a reference or provide your custom measurements for a perfect fit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Shoulder</TableHead>
                    <TableHead>Chest</TableHead>
                    <TableHead>Sleeve Length</TableHead>
                    <TableHead>Shirt Length</TableHead>
                    <TableHead>Daman Width</TableHead>
                    <TableHead>Collar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">XS</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(16.5, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(36, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(23, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(27, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(22, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(14.5, 'in'))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">S</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(17, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(38, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(23.5, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(28, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(23, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(15, 'in'))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">M</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(18, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(40, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(24, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(29, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(24, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(15.5, 'in'))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">L</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(19, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(42, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(24.5, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(30, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(25, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(16, 'in'))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">XL</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(20, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(44, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(25, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(31, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(26, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(16.5, 'in'))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">XXL</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(21, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(46, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(25.5, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(32, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(27, 'in'))}</TableCell>
                    <TableCell>{formatMeasurement(convertToSelected(17, 'in'))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Separator className="my-6" />
              <div className="mt-4">
                <h3 className="font-medium mb-2">Chalk (Chest Width):</h3>
                <p className="text-gray-600 text-sm mb-4">
                  The chalk measurement refers to the width of the chest area of the shirt. This measurement is taken across the chest, from one side seam to the other, typically just below the armhole.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Chalk Width (Front)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">XS</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(18, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">S</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(19, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">M</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(20, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(21, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XL</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(22, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XXL</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(23, 'in'))}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottoms">
          <Card>
            <CardHeader>
              <CardTitle>Standard Shalwar & Pajama Measurements</CardTitle>
              <CardDescription>
                Reference measurements for traditional bottoms. For custom fit, provide your specific measurements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Shalwar Measurements</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Waist</TableHead>
                      <TableHead>Hip</TableHead>
                      <TableHead>Outseam Length</TableHead>
                      <TableHead>Inseam Length</TableHead>
                      <TableHead>Bottom Width</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">S</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(30, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(36, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(40, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(28, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(16, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">M</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(32, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(38, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(41, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(29, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(17, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(34, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(40, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(42, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(30, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(18, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XL</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(36, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(42, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(43, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(31, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(19, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XXL</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(38, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(44, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(44, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(32, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(20, 'in'))}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Pajama Measurements</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Waist</TableHead>
                      <TableHead>Hip</TableHead>
                      <TableHead>Outseam Length</TableHead>
                      <TableHead>Inseam Length</TableHead>
                      <TableHead>Bottom Width</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">S</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(30, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(36, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(38, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(27, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(14, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">M</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(32, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(38, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(39, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(28, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(15, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(34, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(40, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(40, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(29, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(16, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XL</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(36, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(42, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(41, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(30, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(17, 'in'))}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XXL</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(38, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(44, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(42, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(31, 'in'))}</TableCell>
                      <TableCell>{formatMeasurement(convertToSelected(18, 'in'))}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SizeChartPage;
