import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchOffcanvas from "./SearchOffcanvas";
import MenuOffcanvas from "./MenuOffcanvas";
import BagIcon from "../../assets/icons/BagIcon";
import { useLocation } from "react-router-dom";
import CartOffcanvas from "../cart/CartOffcanvas";

const NavbarComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [showCart, setShowCart] = useState(false);
  const handleToggleCart = () => setShowCart((prevShowCart) => !prevShowCart);
  const isCheckoutPage = location.pathname === "/checkout";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && location.pathname.includes("/categories")) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navbarVariants = {
    initial: {
      position: "fixed",
      top: 0,
      scale: 1,
      borderRadius: 0,
      left: 0,
      right: 0,
      zIndex: 1038,
      translateX: "0%",
      transition: {
        top: { duration: 0.2 },
        scale: { duration: 0.2 },
        borderRadius: { duration: 0.5 },
        left: { duration: 0 },
        translateX: { duration: 0 },
      },
    },
    scrolled: {
      position: "fixed",
      top: "-2px",
      left: "50%",
      translateX: "-50%",
      scale: 0.8,
      borderRadius: "20px",
      zIndex: 1039,
      transition: {
        top: { duration: 0.5 },
        scale: { duration: 0.5 },
        borderRadius: { duration: 0.5 },
        left: { duration: 0 },
        translateX: { duration: 0 },
      },
    },
  };

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((acc, currentItem) => acc + currentItem.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <motion.nav
      className="navbar navbar-expand"
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5c703e77af468378086493eb/1550874513182-ATUEBGG8E11N7PKJFMTH/TCG.png"
            alt="logo"
            width={100}
          />
        </Link>
        <div className="d-flex">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <SearchOffcanvas />
            </li>
            {!isCheckoutPage && (
              <li className="nav-item me-3">
                <div className="cart-icon-container cursor-pointer" onClick={handleToggleCart}>
                  <div className={`cart-counter ${cartCount > 0 ? "" : "invisible"}`}>
                    {cartCount > 0 && <span>{cartCount}</span>}
                  </div>
                  <BagIcon />
                </div>
              </li>
            )}

            <li className="nav-item">
              <MenuOffcanvas />
            </li>
          </ul>
        </div>
      </div>
      <CartOffcanvas showCart={showCart} onClose={handleToggleCart} />
    </motion.nav>
  );
};

export default NavbarComponent;
