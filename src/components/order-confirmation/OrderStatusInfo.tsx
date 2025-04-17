
import { ShoppingBag } from "lucide-react";

const OrderStatusInfo = () => {
  return (
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
  );
};

export default OrderStatusInfo;
