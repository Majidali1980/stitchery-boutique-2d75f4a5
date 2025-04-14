
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";

const MainLayout = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
