import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
// Components
import { Header, Footer } from "./components";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import AdminOnlyroute from "./components/adminOnlyRoute/AdminOnlyroute";
import Checkout from "./pages/checkout/Checkout";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./components/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          
          <Route
            path="/admin/*"
            element={
              <AdminOnlyroute>
                <Admin />
              </AdminOnlyroute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
