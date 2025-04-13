
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, ShoppingBag, Users, Settings, ChevronDown, ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    orders: true
  });
  
  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };
  
  const NavItem = ({ 
    to, 
    icon, 
    label, 
    hasSubmenu = false,
    submenuOpen = false,
    onClick
  }: {
    to?: string;
    icon: React.ReactNode;
    label: string;
    hasSubmenu?: boolean;
    submenuOpen?: boolean;
    onClick?: () => void;
  }) => {
    const isActive = location.pathname === to;
    
    const content = (
      <div 
        className={cn(
          "flex items-center justify-between p-3 rounded-md cursor-pointer",
          isActive ? "bg-brand-gold text-white" : "hover:bg-gray-100"
        )}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        {hasSubmenu && (
          submenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />
        )}
      </div>
    );
    
    return to ? <Link to={to}>{content}</Link> : content;
  };
  
  return (
    <aside className="w-64 h-screen bg-white border-r shrink-0">
      <div className="p-4 border-b">
        <img 
          src="/lovable-uploads/fb49de04-55f5-4809-a777-a3aedc0395a4.png" 
          alt="MA Tailor Logo" 
          className="h-12 mx-auto"
        />
      </div>
      
      <nav className="p-4 space-y-2">
        <NavItem 
          to="/admin" 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard"
        />
        
        <div>
          <NavItem 
            icon={<ShoppingBag size={18} />} 
            label="Orders"
            hasSubmenu={true}
            submenuOpen={openMenus.orders}
            onClick={() => toggleMenu('orders')}
          />
          
          {openMenus.orders && (
            <div className="ml-6 mt-2 space-y-2">
              <NavItem 
                to="/admin/orders" 
                icon={<span className="w-2 h-2 rounded-full bg-current" />}
                label="All Orders"
              />
              <NavItem 
                to="/admin/orders/pending" 
                icon={<span className="w-2 h-2 rounded-full bg-current" />}
                label="Pending"
              />
              <NavItem 
                to="/admin/orders/completed" 
                icon={<span className="w-2 h-2 rounded-full bg-current" />}
                label="Completed"
              />
            </div>
          )}
        </div>
        
        <NavItem 
          to="/admin/customers" 
          icon={<Users size={18} />} 
          label="Customers"
        />
        
        <NavItem 
          to="/admin/settings" 
          icon={<Settings size={18} />} 
          label="Settings"
        />
      </nav>
    </aside>
  );
};

export default AdminSidebar;
