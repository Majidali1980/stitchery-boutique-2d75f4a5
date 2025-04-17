
interface OrderSummaryProps {
  orderNumber: string;
  orderDate: Date;
}

const OrderSummary = ({ orderNumber, orderDate }: OrderSummaryProps) => {
  return (
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
  );
};

export default OrderSummary;
