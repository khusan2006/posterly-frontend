import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posters from "./pages/Posters";
import Poster from "./pages/Poster";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import ThankYouPage from "./pages/ThankYou";
import AdminCreatePoster from "./pages/AdminCreatePoster";
import AdminOrders from "./pages/AdminOrders";
import CustomPoster from "./pages/CustomPoster";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />} path="/">
            <Route index element={<Home />} />
            <Route element={<Admin />} path="admin">
              <Route element={<AdminCreatePoster />} index path="posters" />
              <Route element={<AdminOrders />} path="orders" />
            </Route>
            <Route element={<Posters />} path="products" />
            <Route element={<Poster />} path="product/:productId" />
            <Route element={<CustomPoster />} path="product/custom" />
            <Route element={<Checkout />} path="checkout" />
            <Route element={<Order />} path="order" />
            <Route element={<ThankYouPage />} path="thank-you" />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
