
import { Link } from "react-router-dom";
import { Phone, MapPin, Facebook, Instagram, MessageCircle, Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-brand-black text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <img 
              src="/lovable-uploads/fb49de04-55f5-4809-a777-a3aedc0395a4.png" 
              alt="MA Tailor Logo" 
              className="h-16 mb-4"
            />
            <p className="text-sm text-gray-300 my-4">
              Expert in all types of stitching for ladies' and girls' suits. Custom stitching and ready-to-wear options available.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100067160730050" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-brand-gold"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/matailor1994" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-brand-gold"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-brand-gold text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-brand-gold text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/custom-stitching" className="text-gray-300 hover:text-brand-gold text-sm">
                  Custom Stitching
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-gold text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-gold text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Policy */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policy</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-brand-gold text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-gray-300 hover:text-brand-gold text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-gray-300 hover:text-brand-gold text-sm">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-gray-300 hover:text-brand-gold text-sm">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-brand-gold" />
                <span className="text-sm text-gray-300">
                  Mahmoodabad No 04 Karachi
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle size={18} className="text-brand-gold" />
                <a href="https://wa.me/03070125274" className="text-sm text-gray-300 hover:text-brand-gold">
                  03070125274 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle size={18} className="text-brand-gold" />
                <a href="https://wa.me/03343233883" className="text-sm text-gray-300 hover:text-brand-gold">
                  03343233883 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MA Tailor. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
            <p className="text-xs text-gray-400">
              Designed & Developed with ❤️ by 
              <a 
                href="https://www.facebook.com/share/16TyxwjKRy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-gold hover:text-brand-gold/80 ml-1"
              >
                MA DIGITAL HUB
              </a>
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <a 
                href="https://www.facebook.com/share/16TyxwjKRy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-brand-gold"
              >
                <Facebook size={14} />
              </a>
              <a 
                href="https://www.fiverr.com/users/alimajid0302198" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-brand-gold flex items-center"
              >
                <Globe size={14} />
                <span className="ml-1">Fiverr</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
