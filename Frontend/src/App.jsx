import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useSelector } from "react-redux";
import NavbarComponent from "./components/navigation/NavbarComponent";
import HomeComponent from "./components/navigation/HomeComponent";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Register from "./components/authentication/Register";
import UserComponent from "./components/navigation/UserComponent";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductComponent from "./components/products/ProductComponent";
import HotbuyComponent from "./components/products/HotbuyComponent";
import WishlistComponent from "./components/navigation/WishlistComponent";
import ChatIcon from "./assets/icons/ChatIcon";
import SellComponent from "./components/carousel/SellComponent";
import ExpansionsComponent from "./components/products/ExpansionsComponent";
import ExpansionsTypeComponent from "./components/products/ExpansionsTypeComponent";
import Footer from "./components/navigation/Footer";

function App() {
  // const token = useSelector((state) => state.auth.token);
  // console.log(token);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profilo" element={<UserComponent />} />
            <Route path="/categories/:categoryId" element={<ProductComponent />} />
            <Route path="/expansions" element={<ExpansionsComponent />} />
            <Route path="/expansions/type/:typeId" element={<ExpansionsTypeComponent />} />
            <Route path="/hotbuy" element={<HotbuyComponent />} />
            <Route path="/wishlist" element={<WishlistComponent />} />
            <Route path="/sell" element={<SellComponent />} />
          </Routes>
        </div>
        <ChatIcon />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
