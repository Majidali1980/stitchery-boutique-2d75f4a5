
import { CartItemType } from "@/types/stitching";
import ProductItem from "./ProductItem";

interface OrderItemsListProps {
  orderItems: CartItemType[];
}

const OrderItemsList = ({ orderItems }: OrderItemsListProps) => {
  if (orderItems.length === 0) {
    return (
      <p className="text-gray-600 mb-6">
        We'll send an email confirmation to your registered email address with all the order details.
      </p>
    );
  }
  
  return (
    <div className="space-y-4 mb-6">
      {orderItems.map((item, index) => (
        <ProductItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default OrderItemsList;
