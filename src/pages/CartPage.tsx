
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import ProductCartItem from "@/components/cart/ProductCartItem";
import StitchingCartItem from "@/components/cart/StitchingCartItem";
import { StitchingCartItem as StitchingCartItemType, ProductCartItem as ProductCartItemType } from "@/types/stitching";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  
  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };
  
  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        <div className="p-8 border rounded max-w-xl mx-auto">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Button asChild className="bg-brand-gold hover:bg-brand-gold/90">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items ({items.length})</h2>
            
            <div className="space-y-6">
              {items.map((item) => (
                item.type === 'product' ? (
                  <ProductCartItem 
                    key={item.product.id}
                    item={item as ProductCartItemType}
                    onQuantityChange={handleQuantityChange}
                    onRemove={removeFromCart}
                  />
                ) : (
                  <StitchingCartItem 
                    key={item.service.id}
                    item={item as StitchingCartItemType}
                    onQuantityChange={handleQuantityChange}
                    onRemove={removeFromCart}
                  />
                )
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
            
            <Button className="bg-brand-gold hover:bg-brand-gold/90" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span>{totalPrice > 3000 ? "Free" : "Rs. 300"}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs. {(totalPrice + (totalPrice > 3000 ? 0 : 300)).toLocaleString()}</span>
              </div>
            </div>
            
            <Button className="w-full mt-6 bg-brand-gold hover:bg-brand-gold/90" asChild>
              <Link to="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
