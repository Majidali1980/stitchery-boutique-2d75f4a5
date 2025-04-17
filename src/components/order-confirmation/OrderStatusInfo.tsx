
import { Clock, PackageCheck, Truck } from "lucide-react";

const OrderStatusInfo = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-md mt-6">
      <h3 className="font-medium mb-3 text-gray-800">Order Status</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Clock size={18} className="text-green-600" />
          </div>
          <span>Your order has been received and is being processed</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <PackageCheck size={18} className="text-gray-600" />
          </div>
          <span>You will receive an email when your order ships</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <Truck size={18} className="text-gray-600" />
          </div>
          <span>Estimated delivery: 3-5 business days</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusInfo;
