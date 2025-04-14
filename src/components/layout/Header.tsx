
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, ShoppingCart, Menu, X, Search, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Marquee from "./Marquee";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <header className="border-b dark:border-gray-700">
      <div className="bg-brand-gold text-white py-2">
        <Marquee 
          text="Free shipping on orders over Rs.15000 | Custom stitching available" 
          speed="normal"
        />
      </div>
      
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/fb49de04-55f5-4809-a777-a3aedc0395a4.png" 
              alt="MA Tailor Logo" 
              className="h-14"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-brand-gold transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-brand-gold transition-colors">
              Products
            </Link>
            <Link to="/custom-stitching" className="text-sm font-medium hover:text-brand-gold transition-colors">
              Custom Stitching
            </Link>
            <Link to="/size-chart" className="text-sm font-medium hover:text-brand-gold transition-colors">
              Size Chart
            </Link>
            <Link to="/unstitched-suits" className="text-sm font-medium hover:text-brand-gold transition-colors">
              Unstitched Suits
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-brand-gold transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-brand-gold transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Input 
                placeholder="Search products..." 
                className="pr-8 w-[200px]"
              />
              <Search className="absolute right-2 top-2 h-5 w-5 text-muted-foreground" />
            </div>
            
            <button onClick={toggleTheme} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <Link to="/wishlist" className="relative">
              <Heart className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-brand-gold hover:bg-brand-gold/90 text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 bg-background border-t dark:border-gray-700">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium hover:text-brand-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-lg font-medium hover:text-brand-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/custom-stitching" 
              className="text-lg font-medium hover:text-brand-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Stitching
            </Link>
            <Link 
              to="/size-chart" 
              className="text-lg font-medium hover:text-brand-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Size Chart
            </Link>
            <Link 
              to="/unstitched-suits" 
              className="text-lg font-medium hover:text-brand-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Unstitched Suits
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium hover:text-brand-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium hover:text-brand-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="relative">
              <Input 
                placeholder="Search products..." 
                className="pr-8"
              />
              <Search className="absolute right-2 top-2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
