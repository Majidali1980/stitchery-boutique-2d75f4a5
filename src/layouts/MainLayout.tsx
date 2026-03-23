
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton, SocialSharePopup } from "@/components/SocialButtons";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
      <WhatsAppButton />
      <SocialSharePopup />
    </>
  );
};

export default MainLayout;
