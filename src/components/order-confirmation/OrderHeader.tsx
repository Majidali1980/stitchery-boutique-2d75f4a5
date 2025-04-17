
import { CheckCircle } from "lucide-react";

const OrderHeader = () => {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold mt-6 mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 text-lg mb-8">
        Thank you for your order. We've received your request and will process it shortly.
      </p>
    </div>
  );
};

export default OrderHeader;
