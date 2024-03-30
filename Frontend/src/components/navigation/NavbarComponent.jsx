import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchOffcanvas from "./SearchOffcanvas";
import MenuOffcanvas from "./MenuOffcanvas";
import BagIcon from "../../assets/icons/BagIcon";
import { useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
      zIndex: 1040,
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
      zIndex: 1050,
      transition: {
        top: { duration: 0.5 },
        scale: { duration: 0.5 },
        borderRadius: { duration: 0.5 },
        left: { duration: 0 },
        translateX: { duration: 0 },
      },
    },
  };
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
            <li className="nav-item me-3">
              <div className="cursor-pointer">
                <BagIcon />
              </div>
            </li>
            <li className="nav-item">
              <MenuOffcanvas />
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavbarComponent;

// import { Link } from "react-router-dom";
// import SearchOffcanvas from "./SearchOffcanvas";
// import MenuOffcanvas from "./MenuOffcanvas";
// import BagIcon from "../../assets/icons/BagIcon";

// const NavbarComponent = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand">
//         <div className="container-fluid">
//           <Link to="/" className="navbar-brand">
//             <img
//               src="https://images.squarespace-cdn.com/content/v1/5c703e77af468378086493eb/1550874513182-ATUEBGG8E11N7PKJFMTH/TCG.png"
//               alt="logo"
//               width={100}
//             />
//           </Link>

//           <div className="d-flex">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item me-3">
//                 <SearchOffcanvas />
//               </li>
//               <li className="nav-item me-3">
//                 <div className="cursor-pointer">
//                   <BagIcon />
//                 </div>
//               </li>
//               <li className="nav-item">
//                 <MenuOffcanvas />
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavbarComponent;
