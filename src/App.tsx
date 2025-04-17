
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import HomePage from "@/pages/HomePage"
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";
import WishlistPage from "@/pages/WishlistPage";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CustomStitchingPage from "@/pages/CustomStitchingPage";
import StitchingDesignsPage from "@/pages/StitchingDesignsPage";
import DesignDetailPage from "@/pages/DesignDetailPage";
import SizeChartPage from "@/pages/SizeChartPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminStitchingOrdersPage from "@/pages/admin/AdminStitchingOrdersPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import AdminCustomersPage from "@/pages/admin/AdminCustomersPage";
import RateList from "@/components/RateList";

// Try to load Stripe key safely
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

function App() {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Hide footer on certain routes
    const noFooterRoutes = ['/checkout', '/admin', '/admin-login'];
    const hideFooter = noFooterRoutes.some(route => location.pathname.startsWith(route));
    setIsFooterVisible(!hideFooter);
  }, [location.pathname]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <div className="bg-gray-100 py-2 px-4 text-center">
              <RateList />
            </div>
            <main className="flex-grow">
              <Elements stripe={stripePromise}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/custom-stitching" element={<CustomStitchingPage />} />
                  <Route path="/stitching-designs" element={<StitchingDesignsPage />} />
                  <Route path="/custom-stitching/design/:id" element={<DesignDetailPage />} />
                  <Route path="/size-chart" element={<SizeChartPage />} />
                  
                  {/* Auth Routes */}
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin-login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="orders/pending" element={<AdminOrdersPage statusFilter="pending" />} />
                    <Route path="orders/completed" element={<AdminOrdersPage statusFilter="delivered" />} />
                    <Route path="stitching-orders" element={<AdminStitchingOrdersPage />} />
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="customers" element={<AdminCustomersPage />} />
                    <Route path="settings" element={<div>Admin Settings</div>} />
                  </Route>

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Elements>
            </main>
            {isFooterVisible && <SiteFooter />}
            <Toaster />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
