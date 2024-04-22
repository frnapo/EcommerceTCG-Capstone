import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { CaretRightFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../authentication/Logout";
import { motion } from "framer-motion";
import LogComponent from "../../assets/icons/LogComponent";
import MenuIcon from "../../assets/icons/MenuIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { useNavigate } from "react-router-dom";

const MenuOffcanvas = () => {
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    if (!user) {
      navigate("/login");
      handleClose();
    } else {
      handleClose();
    }
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
    },
    closed: {
      opacity: 0,
      height: 0,
    },
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleShow}>
        <MenuIcon />
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end" className="custom-offcanvas">
        <Offcanvas.Header className="d-flex justify-content-between">
          <div>
            <Link to={token ? "/userprofile" : "/login"} className="nav-link" onClick={handleClose}>
              {user ? <LogComponent text={`Ciao, ${user.firstName}`} /> : <LogComponent text={"Accedi"} />}
            </Link>
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className=" d-flex flex-column justify-content-center">
          <Link className="nav-link-transition nav-link fw-bold fs-1" to="/" onClick={handleClose}>
            <p className="my-2">Home</p>
          </Link>

          <div
            onClick={toggleDropdown}
            className="nav-link-transition nav-link fw-bold fs-1 cursor-pointer d-flex align-items-center"
          >
            <p className="my-2">Prodotti</p>
            <motion.span
              animate={{
                rotate: dropdownOpen ? 90 : 0,
                marginLeft: dropdownOpen ? "13px" : "3px",
                marginTop: dropdownOpen ? "10px" : "0px",
              }}
              transition={{ duration: 0.3 }}
            >
              <CaretRightFill className="fs-5" />
            </motion.span>
          </div>
          <motion.div
            initial="closed"
            animate={dropdownOpen ? "open" : "closed"}
            variants={dropdownVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Link className="nav-link nav-link-transition fw-bold fs-3" to="/categories/1" onClick={handleClose}>
              <p className="m-0 p-0 py-1">Yu-Gi-Oh!</p>
            </Link>
            <Link className="nav-link nav-link-transition fw-bold fs-3" to="/categories/2" onClick={handleClose}>
              <p className="m-0 p-0 py-1">One Piece</p>
            </Link>
            <Link className="nav-link nav-link-transition fw-bold fs-3" to="/categories/3" onClick={handleClose}>
              <p className="m-0 p-0 py-1">Dragonball</p>
            </Link>
            <Link className="nav-link nav-link-transition fw-bold fs-3" to="/categories/4" onClick={handleClose}>
              <p className="m-0 p-0 py-1">Pokémon</p>
            </Link>
          </motion.div>
          <Link to="/expansions" className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Espansioni</p>
          </Link>
          <Link to="/hotbuy" className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Hotbuy</p>
          </Link>
          <Link
            to={user ? "/wishlist" : "/login"}
            className="nav-link nav-link-transition fw-bold fs-1"
            onClick={handleWishlistClick}
          >
            <p className="my-2">Watchlist</p>
          </Link>

          <Link to="/sell" className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Vendi</p>
          </Link>
        </Offcanvas.Body>
        <div className="pb-3 mx-auto">
          {user && user.administrator ? (
            <Link to="/management" onClick={handleClose}>
              <button className="py-1 rounded-pill fs-3 fw-bold btn btn-dark" style={{ paddingInline: "44px" }}>
                Gestione
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="pb-4 mx-auto">{token ? <Logout onLoggedOut={handleClose} /> : <></>}</div>
      </Offcanvas>
    </>
  );
};

export default MenuOffcanvas;
