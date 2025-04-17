
import { Receipt } from "lucide-react";

interface OrderSummaryProps {
  orderNumber: string;
  orderDate: Date;
}

const OrderSummary = ({ orderNumber, orderDate }: OrderSummaryProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Receipt className="h-5 w-5 text-brand-gold" />
        <h3 className="font-semibold">Order Summary</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
        <div>
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="font-medium text-lg">{orderNumber || "Processing..."}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-medium">
            {orderDate.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
            Processing
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
