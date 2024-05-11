import { HashRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Posters = lazy(() => import("./pages/Posters"));
const Poster = lazy(() => import("./pages/Poster"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const Admin = lazy(() => import("./pages/Admin"));
const CustomPoster = lazy(() => import("./pages/CustomPoster"));
const Checkout = lazy(() => import("./pages/Checkout"));
const AdminCreatePoster = lazy(() => import("./pages/AdminCreatePoster"));
const Order = lazy(() => import("./pages/Order"));
const ThankYouPage = lazy(() => import("./pages/ThankYou"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const PrivacyPolicy = lazy(() => import("./components/policies/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./components/policies/CookiePolicy"));
import TermsOfUse from "./components/policies/TermsOfUse";
import { initGA, logPageView } from "./google-analytics";
import LoadingPage from "./components/LoadingPage";
import AdminCreateBearBrick from "./pages/AdminCreateBearBrick";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
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
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route element={<AppLayout />} path="/">
              <Route index element={<Home />} />
              <Route element={<Admin />} path="admin">
                <Route element={<AdminCreatePoster />} index path="posters" />
                <Route element={<AdminCreateBearBrick />} path="bearbrick" />
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
              <Route element={<CookiePolicy />} path="cookie-policy" />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
      <CookieConsent />
    </QueryClientProvider>
  );
};

export default App;
