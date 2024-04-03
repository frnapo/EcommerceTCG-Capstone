import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
// import { useSelector } from "react-redux";
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

function App() {
  // const token = useSelector((state) => state.auth.token);
  // console.log(token);
  // const user = useSelector((state) => state.auth.user);
  // console.log(user);

  return (
    <Router>
      <div>
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
            {/* espansioni */}
            <Route path="/hotbuy" element={<HotbuyComponent />} />
            <Route path="/wishlist" element={<WishlistComponent />} />
          </Routes>
        </div>
        <ChatIcon />
      </div>
    </Router>
  );
}

export default App;
