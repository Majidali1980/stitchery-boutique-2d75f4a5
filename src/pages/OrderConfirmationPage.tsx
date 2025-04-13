
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";

const OrderConfirmationPage = () => {
  // Generate a random order number
  const orderNumber = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
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
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                Processing
              </span>
            </div>
          </div>
          
          <h2 className="font-semibold text-lg mb-3">Order Details</h2>
          <p className="text-gray-600 mb-6">
            We'll send an email confirmation to your registered email address with all the order details.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-brand-gold" />
              <span>Your order is being processed</span>
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
