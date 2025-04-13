
import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  
  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "welcome10") {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
    }
  };
  
  const discountAmount = couponApplied ? totalPrice * 0.1 : 0;
  const subtotal = totalPrice;
  const shippingCost = subtotal > 3000 ? 0 : 300;
  const finalTotal = subtotal - discountAmount + shippingCost;
  
  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90">
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
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium">
              <div className="col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>
            
            {items.map((item) => (
              <div key={item.product.id} className="border-t first:border-t-0">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center">
                  {/* Product */}
                  <div className="md:col-span-3 flex items-center space-x-4">
                    {/* Mobile Remove Button */}
                    <button 
                      className="md:hidden text-gray-400 hover:text-red-500"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <X size={18} />
                    </button>
                    
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">
                        <Link to={`/products/${item.product.id}`} className="hover:text-brand-gold">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.type === "unstitched" ? "Unstitched" : "Ready to Wear"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:text-center">
                    <span className="md:hidden text-sm text-gray-500">Price: </span>
                    <span className="font-medium">Rs. {item.product.price.toLocaleString()}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="flex items-center md:justify-center">
                    <span className="md:hidden text-sm text-gray-500 mr-2">Quantity: </span>
                    <div className="flex items-center border rounded-md">
                      <button
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total & Remove Button */}
                  <div className="flex items-center justify-between md:justify-end">
                    <span className="md:hidden text-sm text-gray-500">Total: </span>
                    <span className="font-semibold">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    
                    {/* Desktop Remove Button */}
                    <button 
                      className="hidden md:block ml-4 text-gray-400 hover:text-red-500"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            
            <Button 
              asChild
              className="text-sm bg-brand-gold hover:bg-brand-gold/90"
            >
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              
              {couponApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shippingCost > 0 ? `Rs. ${shippingCost}` : "Free"}</span>
              </div>
              
              <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <Button
                  onClick={applyCoupon}
                  className="rounded-l-none bg-brand-gold hover:bg-brand-gold/90"
                >
                  Apply
                </Button>
              </div>
              {couponApplied && (
                <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>
              )}
              {couponCode && !couponApplied && (
                <p className="text-red-500 text-sm mt-1">Invalid coupon code</p>
              )}
              <p className="text-xs text-gray-500 mt-2">Try "WELCOME10" for 10% off</p>
            </div>
            
            <Button 
              asChild
              className="w-full bg-brand-gold hover:bg-brand-gold/90"
              size="lg"
            >
              <Link to="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
