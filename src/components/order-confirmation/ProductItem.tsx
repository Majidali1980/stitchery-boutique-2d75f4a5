
import { CartItemType } from "@/types/stitching";
import { FileText, Image, Ruler, Box } from "lucide-react";

interface ProductItemProps {
  item: CartItemType;
  index: number;
}

const ProductItem = ({ item, index }: ProductItemProps) => {
  // Format measurements for display
  const formatMeasurements = (measurements: Record<string, number>) => {
    return Object.entries(measurements).map(([key, value]) => (
      <div key={key} className="grid grid-cols-2 text-sm border-b py-1">
        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
        <span>{value} inches</span>
      </div>
    ));
  };

  return (
    <div key={index} className="border rounded-md p-4 hover:border-brand-gold transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {item.type === 'product' ? (
            <Box size={18} className="text-brand-gold" />
          ) : (
            <Ruler size={18} className="text-brand-gold" />
          )}
          <h3 className="font-medium">
            {item.type === 'product' ? item.product.name : 
              `Custom ${item.service.garmentType.charAt(0).toUpperCase() + 
                item.service.garmentType.slice(1).replace(/-/g, ' ')}`}
          </h3>
        </div>
        <span className="font-semibold">
          Rs. {item.type === 'product' ? 
            (item.product.price * item.quantity).toLocaleString() : 
            (item.service.price * item.quantity).toLocaleString()}
        </span>
      </div>
      
      <p className="text-sm text-gray-500 mb-2">Quantity: {item.quantity}</p>
      
      {item.type === 'stitching' && (
        <div className="space-y-2 mt-2">
          {item.service.designId && (
            <div className="flex items-center text-sm">
              <FileText size={16} className="mr-2 text-brand-gold" />
              <span className="text-gray-700 font-medium">Design: #{item.service.designId}</span>
            </div>
          )}
          
          {item.service.serviceType && (
            <div className="flex items-center text-sm">
              <Ruler size={16} className="mr-2 text-brand-gold" />
              <span className="text-gray-700">Service Type: {item.service.serviceType.charAt(0).toUpperCase() + item.service.serviceType.slice(1)}</span>
            </div>
          )}
          
          {item.service.fabric && (
            <div className="text-sm">
              <span className="text-gray-700">Fabric: {item.service.fabric}</span>
            </div>
          )}
          
          {Object.keys(item.service.measurements || {}).length > 0 && (
            <div>
              <p className="text-sm font-medium mb-1">Measurements:</p>
              <div className="bg-gray-50 p-2 rounded-md">
                {formatMeasurements(item.service.measurements)}
              </div>
            </div>
          )}
          
          {item.service.designImage && (
            <div>
              <p className="text-sm font-medium mb-1">Design Reference:</p>
              <div className="flex items-center">
                <Image size={16} className="mr-2 text-brand-gold" />
                <span className="text-sm text-gray-600">Design image attached</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {item.type === 'product' && item.selectedSize && (
        <div className="text-sm text-gray-600 mt-1">
          Size: {item.selectedSize}
          {item.selectedColor && <span className="ml-2">Color: {item.selectedColor}</span>}
        </div>
      )}
    </div>
  );
};

export default ProductItem;
