
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

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
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items ({items.length})</h2>
            
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={item.type === 'product' ? item.product.id : `stitching-${index}`} className="flex gap-4">
                  {/* Product image or stitching icon */}
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    {item.type === 'product' ? (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-gold/20 flex items-center justify-center">
                        <span className="text-brand-gold text-2xl">✂️</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        {item.type === 'product' 
                          ? item.product.name
                          : `${item.service.garmentType.charAt(0).toUpperCase() + item.service.garmentType.slice(1)} - ${item.service.serviceType.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`}
                      </h3>
                      <span className="font-semibold">
                        Rs. {item.type === 'product' 
                          ? (item.product.price * item.quantity).toLocaleString()
                          : (item.service.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    
                    {item.type === 'product' && 'selectedSize' in item && (
                      <div className="text-sm text-gray-600 mt-1">
                        {item.selectedSize && <span className="mr-3">Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>
                    )}

                    {item.type === 'stitching' && (
                      <div className="text-sm text-gray-600 mt-1">
                        <span>Custom Stitching</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <button 
                          onClick={() => handleQuantityChange(
                            item.type === 'product' ? item.product.id : item.service.id, 
                            item.quantity - 1
                          )}
                          className="px-2 py-1"
                        >
                          <Minus size={16} />
                        </button>
                        <Input 
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(
                            item.type === 'product' ? item.product.id : item.service.id, 
                            parseInt(e.target.value) || 1
                          )}
                          className="w-12 text-center p-0 border-none focus-visible:ring-0"
                          min="1"
                        />
                        <button 
                          onClick={() => handleQuantityChange(
                            item.type === 'product' ? item.product.id : item.service.id, 
                            item.quantity + 1
                          )}
                          className="px-2 py-1"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.type === 'product' ? item.product.id : item.service.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
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
          <div className="bg-white rounded-lg border p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
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
