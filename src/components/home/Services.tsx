
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { stitchingServices } from "@/data/services";
import { Scissors, Tape, Star } from "lucide-react";

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold heading-fancy">Our Services</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
          <p className="text-gray-600 mt-4 max-w-lg mx-auto">
            Professional stitching services to transform your fabric into stunning outfits
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
            <div className="mb-4 p-3 rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center">
              <Scissors className="text-brand-purple" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Stitching</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Get your fabric stitched according to your measurements and preferred design.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link to="/services">Learn More</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
            <div className="mb-4 p-3 rounded-full bg-pink-100 w-12 h-12 flex items-center justify-center">
              <Star className="text-brand-pink" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Embellishments</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Add dori, piping, lace, and other embellishments to elevate your outfit.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link to="/services">View Options</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
            <div className="mb-4 p-3 rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
              <Tape className="text-brand-teal" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Alteration Services</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Get your existing clothes altered or resized for a perfect fit.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link to="/services">Book Now</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-brand-gold">Stitching Rates</h3>
            <p className="text-gray-600">Our competitive pricing for various stitching services</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price (RS)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stitchingServices.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {service.name}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs">
                      {service.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-brand-gold">
                      {service.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
