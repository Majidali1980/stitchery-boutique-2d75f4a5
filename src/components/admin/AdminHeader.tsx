
import { UserButton } from "@clerk/clerk-react";
import { Bell } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="border-b bg-white py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">MA Tailor Admin</h1>
        
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
