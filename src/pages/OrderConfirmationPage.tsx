
import { useEffect, useState, useRef } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CartItemType } from "@/types/stitching";
import { useCart } from "@/context/CartContext";
import { OrderItem } from "@/components/admin/orders/utils/orderHelpers";
import OrderHeader from "@/components/order-confirmation/OrderHeader";
import OrderSummary from "@/components/order-confirmation/OrderSummary";
import OrderItemsList from "@/components/order-confirmation/OrderItemsList";
import OrderStatusInfo from "@/components/order-confirmation/OrderStatusInfo";
import ActionButtons from "@/components/order-confirmation/ActionButtons";
import PDFDownloadButton from "@/components/order-confirmation/PDFDownloadButton";
import { toast } from "@/components/ui/use-toast";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const [orderItems, setOrderItems] = useState<CartItemType[]>([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate] = useState(new Date());
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const { clearCart } = useCart();
  const pdfRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check if we have order state information
    if (!location.state || !location.state.orderItems) {
      console.error("No order information found in location state");
      return;
    }
    
    // Set order items from state
    setOrderItems(location.state.orderItems);
    
    // Save customer info
    if (location.state.customerInfo) {
      setCustomerInfo(location.state.customerInfo);
    }
    
    // Set total amount
    if (location.state.totalAmount) {
      setTotalAmount(location.state.totalAmount);
    }
    
    // Generate stable order number from timestamp if not already present
    if (location.state.orderNumber) {
      setOrderNumber(location.state.orderNumber);
    } else {
      const generatedOrderNumber = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNumber);
    }
    
    // Clear cart after confirming we have the order data
    clearCart();
    
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
        id: orderNumber || `MA-${Math.floor(100000 + Math.random() * 900000)}`,
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
        
        // Show toast confirmation
        toast({
          title: "Order Received",
          description: `Your order #${orderData.id} has been received and is being processed.`,
        });
      }, 500);
    } catch (error) {
      console.error("Error sending order notification:", error);
    }
  }, [location, orderDate, clearCart]);
  
  // Redirect if no order information is available
  if (!location.state || !location.state.orderItems) {
    return <Navigate to="/products" replace />;
  }
  
  return (
    <div className="container py-16 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <PDFDownloadButton targetRef={pdfRef} fileName={`Order-${orderNumber}.pdf`} />
        </div>
        
        <div ref={pdfRef} className="bg-white p-6 rounded-lg border">
          <OrderHeader />
          
          <div className="bg-white rounded-lg p-6 mb-8 text-left">
            <OrderSummary orderNumber={orderNumber} orderDate={orderDate} />
            
            {customerInfo && (
              <div className="mb-6 mt-4">
                <h2 className="font-semibold text-lg mb-3">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{customerInfo.firstName} {customerInfo.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{customerInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{customerInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {customerInfo.address}, {customerInfo.city}, {customerInfo.state}, {customerInfo.zipCode}, {customerInfo.country || "Pakistan"}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <h2 className="font-semibold text-lg mb-3">Order Details</h2>
            <OrderItemsList orderItems={orderItems} />
            
            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">Total Amount: <span className="text-brand-gold">Rs. {totalAmount.toLocaleString()}</span></p>
            </div>
            
            <OrderStatusInfo />
          </div>
        </div>
        
        <div className="mt-8">
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
