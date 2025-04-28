
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, SocialSharePopup } from "@/components/SocialButtons";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <SocialSharePopup />
    </div>
  );
};

export default MainLayout;
