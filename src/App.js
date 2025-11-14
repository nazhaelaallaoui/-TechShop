import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./panier";
import { ToastProvider } from "./compenent/ToastProvider";

import Dachbord from "./compenent/Dachbord";
import Produit from "./Produit";
import ProductDetail from "./compenent/ProductDetail";
import Panier from "./compenent/Panier";
import Profil from "./compenent/Profil";
import About from "./compenent/About";
import Contact from "./compenent/Contact";
import Wishlist from "./compenent/Wishlist";
import Login from "./compenent/Login";
import DarkModeToggle from "./compenent/DarkModeToggle";
import OrderHistory from "./compenent/OrderHistory";
import Settings from "./compenent/Settings";
import NotFound from "./compenent/NotFound";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <DarkModeToggle />
            <div className="container">
              <Routes>
                {/* Route principale Login */}
                <Route path="/" element={<Login />} />
                <Route path="dachbord" element={<Dachbord />}>
                  {/* Routes imbriquées */}
                  <Route index element={<Produit />} /> {/* page par défaut */}
                  <Route path="produit/:id" element={<ProductDetail />} />
                  <Route path="panier" element={<Panier />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="profil" element={<Profil />} />
                  <Route path="order-history" element={<OrderHistory />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                </Route>

                {/* fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
