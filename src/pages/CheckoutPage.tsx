
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/use-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart, totalPrice } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
    paymentMethod: "cod" // cod, card, bank
  });
  
  const subtotal = totalPrice;
  const shippingCost = subtotal > 3000 ? 0 : 300; // Free shipping over Rs. 3000, otherwise Rs. 300
  const finalTotal = subtotal + shippingCost;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Save order items before clearing cart
    const orderItems = [...items];
    const customerInfo = { ...formData };
    
    // Generate stable order number
    const orderNumber = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Simulate order creation
    setTimeout(() => {
      navigate("/order-confirmation", { 
        state: { 
          orderItems,
          customerInfo,
          totalAmount: finalTotal,
          orderNumber
        }
      });
    }, 1000);
  };
  
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              
              <div className="mb-4">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">Postal/Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, paymentMethod: value }))
                }
              >
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Bank Transfer</Label>
                </div>
              </RadioGroup>
              
              {formData.paymentMethod === "card" && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Credit/Debit card payment will be processed on the next step.
                  </p>
                </div>
              )}
              
              {formData.paymentMethod === "bank" && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm font-medium mb-1">Bank Transfer Details:</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Account Title: MA Tailor<br />
                    Account Number: 12345678901<br />
                    Bank: Sample Bank<br />
                    IBAN: PK00SAMP0000012345678901
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Please make the payment within 24 hours and send the receipt to
                    our WhatsApp number.
                  </p>
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="bg-brand-gold hover:bg-brand-gold/90 w-full sm:w-auto"
              size="lg"
            >
              Place Order
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div key={item.type === 'product' ? item.product.id : `stitching-${index}`} className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    {item.type === 'product' ? (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-gold/20 flex items-center justify-center">
                        <span className="text-brand-gold text-xl">✂️</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">
                      {item.type === 'product' 
                        ? item.product.name 
                        : `Custom ${item.service.garmentType.charAt(0).toUpperCase() + item.service.garmentType.slice(1)} Stitching`}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">
                      Rs. {(item.type === 'product' 
                        ? item.product.price * item.quantity 
                        : item.service.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span>{shippingCost > 0 ? `Rs. ${shippingCost}` : "Free"}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs. {finalTotal.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                {subtotal < 3000 ? 
                  "Add Rs. " + (3000 - subtotal) + " more to qualify for free shipping" : 
                  "You've qualified for free shipping!"
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
