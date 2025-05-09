
import { Facebook, Instagram, Share2, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/03070125274"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
    >
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
};

export const SocialSharePopup = () => {
  const currentUrl = window.location.href;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${currentUrl}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-20 right-6 rounded-full shadow-lg z-50"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-center gap-4 py-4">
          <Button onClick={shareOnFacebook} className="bg-blue-600 hover:bg-blue-700">
            <Facebook className="mr-2 h-4 w-4" />
            Share on Facebook
          </Button>
          <Button onClick={shareOnWhatsApp} className="bg-green-500 hover:bg-green-600">
            <svg
              className="mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share on WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const SocialFollowPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hidden">Follow Us</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-4 py-4">
          <a 
            href="https://www.facebook.com/profile.php?id=100067160730050"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
          >
            <Facebook className="h-5 w-5" />
            Like us on Facebook
          </a>
          <a 
            href="https://www.instagram.com/matailor1994/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-md"
          >
            <Instagram className="h-5 w-5" />
            Follow us on Instagram
          </a>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              Developed by
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.facebook.com/share/16TyxwjKRy/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <Facebook className="h-6 w-6 mb-1" />
                <span>MA DIGITAL HUB</span>
              </a>
              <a 
                href="https://www.fiverr.com/users/alimajid0302198"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600"
              >
                <Globe className="h-6 w-6 mb-1" />
                <span>Fiverr</span>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
