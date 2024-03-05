import { HashRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Posters = lazy(() => import('./pages/Posters'))
const Poster = lazy(() => import('./pages/Poster'))
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const Admin = lazy(() => import('./pages/Admin'))
const CustomPoster = lazy(() => import('./pages/CustomPoster'))
const Checkout = lazy(() => import('./pages/Checkout'))
const AdminCreatePoster = lazy(() => import('./pages/AdminCreatePoster'))
import Order from "./pages/Order";
import ThankYouPage from "./pages/ThankYou";
import CookieConsent from "./components/CookieConsent";
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import TermsOfUse from "./components/policies/TermsOfUse";
import { initGA, logPageView } from "./google-analytics";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });
  useEffect(() => {
    initGA();
    logPageView();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />} path="/">
            <Route index element={<Home />} />
            <Route element={<Admin />} path="admin">
              <Route element={<AdminCreatePoster />} index path="posters" />
              <Route element={<AdminOrders />} path="orders" />
            </Route>
            <Route element={<Posters />} path="products" />
            <Route element={<Poster />} path="/product/:productId" />
            <Route element={<CustomPoster />} path="product/custom" />
            <Route element={<Checkout />} path="checkout" />
            <Route element={<Order />} path="order" />
            <Route element={<ThankYouPage />} path="thank-you" />
            <Route element={<PrivacyPolicy />} path="privacy-policy" />
            <Route element={<TermsOfUse />} path="terms" />
          </Route>
        </Routes>
      </HashRouter>
      <CookieConsent />
    </QueryClientProvider>
  );
};

export default App;
