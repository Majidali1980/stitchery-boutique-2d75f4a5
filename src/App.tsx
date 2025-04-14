
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import WishlistPage from "@/pages/WishlistPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CustomStitchingPage from "@/pages/CustomStitchingPage";
import DesignDetailPage from "@/pages/DesignDetailPage";
import DesignCategoryPage from "@/pages/DesignCategoryPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import SizeChartPage from "@/pages/SizeChartPage";
import PolicyPage from "@/pages/PolicyPage";
import TermsPage from "@/pages/TermsPage";
import NotFound from "@/pages/NotFound";

// Admin pages
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage";
import AdminStitchingOrdersPage from "@/pages/admin/AdminStitchingOrdersPage";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="custom-stitching" element={<CustomStitchingPage />} />
              <Route path="custom-stitching/design/:id" element={<DesignDetailPage />} />
              <Route path="custom-stitching/category/:category" element={<DesignCategoryPage />} />
              <Route path="custom-stitching/:type-designs" element={<DesignCategoryPage />} />
              <Route path="size-chart" element={<SizeChartPage />} />
              <Route path="policy" element={<PolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="stitching-orders" element={<AdminStitchingOrdersPage />} />
            </Route>
          </Routes>
          <Toaster />
          <Sonner />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
