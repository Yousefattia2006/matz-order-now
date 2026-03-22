import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AdminProvider } from "@/hooks/useAdmin";
import { Navbar } from "@/components/Navbar";
import { CartBar } from "@/components/CartBar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminDeliveryZones from "./pages/admin/AdminDeliveryZones";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AdminProvider>
          <Toaster />
          <Sonner position="top-center" richColors />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="offers" element={<AdminOffers />} />
                <Route path="delivery-zones" element={<AdminDeliveryZones />} />
              </Route>

              {/* Storefront routes */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex flex-col overflow-x-hidden">
                    <Navbar />
                    <main className="flex-grow pb-20">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmed" element={<OrderConfirmed />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <CartBar />
                    <WhatsAppFloat />
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
