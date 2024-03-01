import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
const CookieConsent = () => {
  const [accepted, setAccepted] = useState(false);
  const [isvisible, setIsvisible] = useState(false);
  useEffect(() => {
    setIsvisible(true)
  },[])
  const acceptCookies = () => {
    Cookies.set("cookiesAccepted", "true");
    setAccepted(true);
  };

  const rejectCookies = () => {
    Cookies.set("cookiesAccepted", "false");
    setAccepted(false);
  };
  if (accepted || Cookies.get('cookiesAccepted')) {
    return null; // If cookies are accepted, don't show the consent warning
  }

  return (
    <div className={cn("fixed bottom-0 translate-y-[100%] left-0 transition-all delay-1000 right-0 bg-gray-500/80 text-white p-4 flex flex-col sm:flex-row justify-between items-center z-[1000]", `${isvisible && 'translate-y-0'}`)}>
      <p className="flex-1 mb-2 sm:mb-0 sm:mr-4">We use cookies to ensure you have the best browsing experience on our website. By using our site, you acknowledge that you have read and understood our Cookie Policy & Privacy Policy</p>
      <div>
        <button className="bg-green-500 text-white px-4 py-2 mr-2 rounded mb-2 sm:mb-0" onClick={acceptCookies}>Accept All</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={rejectCookies}>Reject All</button>
      </div>
    </div>
  );
};

export default CookieConsent;
