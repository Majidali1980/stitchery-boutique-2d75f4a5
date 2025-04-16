
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, FileText, Image, Ruler, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItemType } from "@/types/stitching";

const OrderConfirmationPage = () => {
  // Generate a random order number
  const orderNumber = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
  const [orderDate] = useState(new Date());
  const location = useLocation();
  const [orderItems, setOrderItems] = useState<CartItemType[]>([]);
  const { clearCart } = useCart();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Clear cart after order is placed
    clearCart();
    
    // Get order items from state if available
    if (location.state && location.state.orderItems) {
      setOrderItems(location.state.orderItems);
      
      // Send order notification to admin panel
      try {
        const orderData = {
          id: orderNumber,
          customerName: location.state.customerInfo?.firstName + " " + location.state.customerInfo?.lastName || "Customer",
          customerPhone: location.state.customerInfo?.phone || "N/A",
          customerEmail: location.state.customerInfo?.email || "N/A",
          orderDate: orderDate.toISOString(),
          total: location.state.totalAmount || 0,
          status: "pending",
          items: location.state.orderItems.map((item: CartItemType) => {
            const baseItem = {
              name: item.type === 'product' ? item.product.name : 
                `Custom ${item.service.garmentType.charAt(0).toUpperCase() + item.service.garmentType.slice(1).replace(/-/g, ' ')}`,
              price: item.type === 'product' ? item.product.price : item.service.price,
              quantity: item.quantity,
              type: item.type
            };
            
            // Add stitching-specific details
            if (item.type === 'stitching') {
              return {
                ...baseItem,
                designId: item.service.designId,
                measurements: item.service.measurements || {},
                fabric: item.service.fabric || "Not specified",
                designImage: item.service.designImage || null
              };
            }
            
            // Add product-specific details
            if (item.type === 'product') {
              return {
                ...baseItem,
                selectedSize: item.selectedSize || "Standard",
                selectedColor: item.selectedColor || "Default"
              };
            }
            
            return baseItem;
          }),
          shippingAddress: `${location.state.customerInfo?.address}, ${location.state.customerInfo?.city}, ${location.state.customerInfo?.state}, ${location.state.customerInfo?.zip || ""}`
        };
        
        // Send order to admin panel with a slight delay to ensure it's properly received
        setTimeout(() => {
          window.postMessage(`NEW_ORDER:${JSON.stringify(orderData)}`, window.location.origin);
          console.log("Order sent to admin panel:", orderData);
        }, 500);
      } catch (error) {
        console.error("Error sending order notification:", error);
      }
    }
  }, [location, orderNumber, orderDate, clearCart]);
  
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
    <div className="container py-16 max-w-3xl mx-auto">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mt-6 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for your order. We've received your request and will process it shortly.
        </p>
        
        <div className="bg-white rounded-lg border p-6 mb-8 text-left">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{orderDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                Processing
              </span>
            </div>
          </div>
          
          <h2 className="font-semibold text-lg mb-3">Order Details</h2>
          
          {orderItems.length > 0 ? (
            <div className="space-y-4 mb-6">
              {orderItems.map((item, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">
                      {item.type === 'product' ? item.product.name : 
                        `Custom ${item.service.garmentType.charAt(0).toUpperCase() + 
                          item.service.garmentType.slice(1).replace(/-/g, ' ')}`}
                    </h3>
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
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mb-6">
              We'll send an email confirmation to your registered email address with all the order details.
            </p>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-brand-gold" />
              <span>Your order has been received and is being processed</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-brand-gold" />
              <span>You will receive an email when your order ships</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-brand-gold" />
              <span>Estimated delivery: 3-5 business days</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="outline" size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button asChild className="bg-brand-gold hover:bg-brand-gold/90" size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
