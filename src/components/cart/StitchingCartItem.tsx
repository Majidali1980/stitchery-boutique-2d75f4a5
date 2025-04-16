
import React from 'react';
import { Minus, Plus, Trash2, FileText, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StitchingCartItem as StitchingCartItemType } from "@/types/stitching";

interface StitchingCartItemProps {
  item: StitchingCartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const StitchingCartItem: React.FC<StitchingCartItemProps> = ({ 
  item, 
  onQuantityChange, 
  onRemove 
}) => {
  const formatMeasurementName = (name: string) => {
    return name.replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <div className="flex gap-4 border-b pb-4">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-brand-gold/20 flex items-center justify-center">
          <span className="text-brand-gold text-2xl">✂️</span>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">
            {`${item.service.garmentType.charAt(0).toUpperCase() + 
               item.service.garmentType.slice(1).replace(/-/g, ' ')} - 
               ${item.service.serviceType.replace(/-/g, ' ')
                 .replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`}
          </h3>
          <span className="font-semibold">
            Rs. {(item.service.price * item.quantity).toLocaleString()}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mt-1">
          <span>Custom Stitching Service</span>
          {item.service.designId && (
            <span className="ml-2 text-brand-gold">Design #{item.service.designId}</span>
          )}
        </div>
        
        <Accordion type="single" collapsible className="w-full mt-2">
          <AccordionItem value="details">
            <AccordionTrigger className="text-sm py-1">View Details</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                {item.service.fabric && (
                  <div className="flex items-start">
                    <span className="font-medium w-24">Fabric:</span>
                    <span>{item.service.fabric}</span>
                  </div>
                )}
                
                {item.service.designId && (
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-brand-gold" />
                    <span>Design #{item.service.designId}</span>
                  </div>
                )}
                
                {Object.keys(item.service.measurements).length > 0 && (
                  <div>
                    <div className="flex items-center mb-1">
                      <Ruler className="h-4 w-4 mr-1 text-brand-gold" />
                      <span className="font-medium">Measurements:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-1 gap-x-4 bg-gray-50 p-2 rounded">
                      {Object.entries(item.service.measurements).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">{formatMeasurementName(key)}:</span>
                          <span>{value} in</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.service.notes && (
                  <div>
                    <span className="font-medium">Notes:</span>
                    <p className="text-gray-600 mt-1">{item.service.notes}</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded">
            <button 
              onClick={() => onQuantityChange(item.service.id, item.quantity - 1)}
              className="px-2 py-1"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <Input 
              type="number"
              value={item.quantity}
              onChange={(e) => onQuantityChange(
                item.service.id, 
                parseInt(e.target.value) || 1
              )}
              className="w-12 text-center p-0 border-none focus-visible:ring-0"
              min="1"
            />
            <button 
              onClick={() => onQuantityChange(item.service.id, item.quantity + 1)}
              className="px-2 py-1"
            >
              <Plus size={16} />
            </button>
          </div>
          <button 
            onClick={() => onRemove(item.service.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StitchingCartItem;
