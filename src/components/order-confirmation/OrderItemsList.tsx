
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
  
  const productItems = orderItems.filter(item => item.type === 'product');
  const stitchingItems = orderItems.filter(item => item.type === 'stitching');
  
  return (
    <div className="mb-6">
      {productItems.length > 0 && (
        <div className="mb-4">
          {productItems.length > 0 && stitchingItems.length > 0 && (
            <h3 className="text-md font-medium mb-2">Product Items</h3>
          )}
          <div className="space-y-4">
            {productItems.map((item, index) => (
              <ProductItem key={`product-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
      
      {stitchingItems.length > 0 && (
        <div className="mt-4">
          {productItems.length > 0 && stitchingItems.length > 0 && (
            <h3 className="text-md font-medium mb-2">Custom Stitching Items</h3>
          )}
          <div className="space-y-4">
            {stitchingItems.map((item, index) => (
              <ProductItem key={`stitching-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItemsList;
