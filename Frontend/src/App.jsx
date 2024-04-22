import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
// import { useSelector } from "react-redux";
import { useEffect } from "react";
import NavbarComponent from "./components/navigation/NavbarComponent";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Register from "./components/authentication/Register";
import UserComponent from "./components/navigation/UserComponent";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductComponent from "./components/products/ProductComponent";
import HotbuyComponent from "./components/products/HotbuyComponent";
import WishlistComponent from "./components/navigation/WishlistComponent";
import SellComponent from "./components/carousel/SellComponent";
import ExpansionsComponent from "./components/products/ExpansionsComponent";
import ExpansionsTypeComponent from "./components/products/ExpansionsTypeComponent";
import Footer from "./components/navigation/Footer";
import CheckoutPage from "./components/cart/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderConfirmPage from "./components/cart/OrderConfirmPage";
import Chatbot from "./components/chatbot/Chatbot";
import Faq from "./components/footer/Faq";
import TermsAndConditions from "./components/footer/TermsAndCondition";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";
import ShippingPolicy from "./components/footer/ShippingPolicy";
import ScrollToTop from "./components/navigation/ScrollToTop";
import Homepage from "./components/navigation/Homepage";
import ForgotPassword from "./components/navigation/ForgotPassword";
import ResetPassword from "./components/navigation/ResetPassword";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ManagementComponent from "./components/navigation/ManagementComponent";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.4 });
nprogress.start();
nprogress.done();

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <Router>
      <AppContainer />
    </Router>
  );
}

function AppContainer() {
  const location = useLocation();
  useEffect(() => {
    nprogress.start();
    return () => {
      setTimeout(() => {
        nprogress.done();
      }, 500);
    };
  }, [location.pathname]);

  const stripePromise = loadStripe(
    "pk_test_51P3gtz07ALKP5UpSUmo7v2EWIWqOwxtKYmJzQIWCErsbuG1Dadqr02RDcB83wGpHwGF3EgVeaahopuW5sPtDIBtS00UrCvOkpM"
  );
  return (
    <div>
      <ScrollToTop />
      <div className="app-container">
        <NavbarComponent />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "70px",
            },
          }}
        />
        <div id="padding-container">
          <Routes location={location}>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userprofile" element={<UserComponent />} />
            <Route path="/management" element={<ManagementComponent />} />
            <Route path="/categories/:categoryId" element={<ProductComponent />} />
            <Route path="/expansions" element={<ExpansionsComponent />} />
            <Route path="/expansions/type/:typeId" element={<ExpansionsTypeComponent />} />
            <Route path="/hotbuy" element={<HotbuyComponent />} />
            <Route path="/wishlist" element={<WishlistComponent />} />
            <Route path="/sell" element={<SellComponent />} />
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutPage />
                </Elements>
              }
            />
            <Route path="/order-confirm" element={<OrderConfirmPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          </Routes>
        </div>
        <Chatbot />
      </div>
      <Footer />
    </div>
  );
}

export default App;
