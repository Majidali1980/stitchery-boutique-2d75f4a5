
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart, Sun, Moon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useIsMobile } from "@/hooks/use-mobile";
import AuthButtons from "@/components/auth/AuthButtons";
import { adminLoginInfo } from "@/data/admin-info";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Custom Stitching", path: "/custom-stitching" },
    { name: "Stitching Designs", path: "/stitching-designs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-gray-900 shadow-md"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/fb49de04-55f5-4809-a777-a3aedc0395a4.png"
              alt="MA Tailor"
              className="h-12"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-700 dark:text-gray-200 hover:text-brand-gold dark:hover:text-brand-gold transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Admin Login */}
          <Link to="/admin-login" className="p-2 relative group">
            <Shield className="h-5 w-5" />
            <div className="absolute -bottom-10 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Admin: {adminLoginInfo.email}
            </div>
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2">
            <Heart className="h-5 w-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-brand-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2">
            <ShoppingBag className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-brand-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          <AuthButtons />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="container py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 dark:text-gray-200 hover:text-brand-gold dark:hover:text-brand-gold transition-colors py-2"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin-login"
              className="text-gray-700 dark:text-gray-200 hover:text-brand-gold dark:hover:text-brand-gold transition-colors py-2"
              onClick={toggleMenu}
            >
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
