
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartItemType } from "@/types/stitching";
import { useCart } from "@/context/CartContext";
import { OrderItem } from "@/components/admin/orders/utils/orderHelpers";
import OrderHeader from "@/components/order-confirmation/OrderHeader";
import OrderSummary from "@/components/order-confirmation/OrderSummary";
import OrderItemsList from "@/components/order-confirmation/OrderItemsList";
import OrderStatusInfo from "@/components/order-confirmation/OrderStatusInfo";
import ActionButtons from "@/components/order-confirmation/ActionButtons";

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
        // Convert cart items to order items
        const items: OrderItem[] = location.state.orderItems.map((item: CartItemType) => {
          if (item.type === 'product') {
            return {
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
              type: 'product',
              selectedSize: item.selectedSize || "Standard",
              selectedColor: item.selectedColor || "Default"
            };
          } else { // stitching
            return {
              name: `Custom ${item.service.garmentType.charAt(0).toUpperCase() + item.service.garmentType.slice(1).replace(/-/g, ' ')}`,
              price: item.service.price,
              quantity: item.quantity,
              type: 'stitching',
              designId: item.service.designId,
              measurements: item.service.measurements || {},
              fabric: item.service.fabric || "Not specified",
              designImage: item.service.designImage || null
            };
          }
        });

        // Format shipping address as a single string
        const shippingAddress = `${location.state.customerInfo?.address}, ${location.state.customerInfo?.city}, ${location.state.customerInfo?.state}, ${location.state.customerInfo?.zipCode || ""}, ${location.state.customerInfo?.country || "Pakistan"}`;
        
        const orderData = {
          id: orderNumber,
          customerName: location.state.customerInfo?.firstName + " " + location.state.customerInfo?.lastName || "Customer",
          customerPhone: location.state.customerInfo?.phone || "N/A",
          customerEmail: location.state.customerInfo?.email || "N/A",
          orderDate: orderDate.toISOString(),
          total: location.state.totalAmount || 0,
          status: "pending",
          items: items,
          shippingAddress: shippingAddress
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
  
  return (
    <div className="container py-16 max-w-3xl mx-auto">
      <OrderHeader />
      
      <div className="bg-white rounded-lg border p-6 mb-8 text-left">
        <OrderSummary orderNumber={orderNumber} orderDate={orderDate} />
        
        <h2 className="font-semibold text-lg mb-3">Order Details</h2>
        <OrderItemsList orderItems={orderItems} />
        <OrderStatusInfo />
      </div>
      
      <ActionButtons />
    </div>
  );
};

export default OrderConfirmationPage;
