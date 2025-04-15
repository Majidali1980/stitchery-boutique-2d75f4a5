
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart, Sun, Moon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { adminLoginInfo } from "@/data/admin-info";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { items: cartItems } = useCart();

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

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2">
            <Heart className="h-5 w-5" />
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

          {/* Auth Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <User className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Account</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[220px] p-4 md:w-[240px] lg:w-[280px] space-y-3">
                    <div className="space-y-1">
                      <Link to="/sign-in">
                        <Button variant="outline" className="w-full justify-start">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/sign-up">
                        <Button className="w-full justify-start bg-brand-gold hover:bg-brand-gold/90">
                          Register
                        </Button>
                      </Link>
                    </div>
                    <div className="border-t pt-3">
                      <Link to="/admin-login">
                        <Button variant="ghost" className="w-full justify-start text-sm">
                          Admin Login
                        </Button>
                      </Link>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <p>Admin Email: {adminLoginInfo.email}</p>
                        <p>Password: {adminLoginInfo.password}</p>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
      {isMenuOpen && (
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
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/sign-in"
                className="text-gray-700 dark:text-gray-200 hover:text-brand-gold dark:hover:text-brand-gold transition-colors py-2 flex items-center"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up"
                className="text-gray-700 dark:text-gray-200 hover:text-brand-gold dark:hover:text-brand-gold transition-colors py-2 flex items-center"
                onClick={toggleMenu}
              >
                Register
              </Link>
              <Link 
                to="/admin-login"
                className="text-gray-700 dark:text-gray-200 hover:text-brand-gold dark:hover:text-brand-gold transition-colors py-2 flex items-center"
                onClick={toggleMenu}
              >
                Admin Login
              </Link>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p>Admin Email: {adminLoginInfo.email}</p>
                <p>Password: {adminLoginInfo.password}</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
