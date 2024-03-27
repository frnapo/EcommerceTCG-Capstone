import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { PersonCircle, List, CaretRightFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../authentication/Logout";
import { motion } from "framer-motion";

const MenuOffcanvas = () => {
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

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
      <List className="text-white fs-1 cursor-pointer" onClick={handleShow} />
      <Offcanvas show={show} onHide={handleClose} placement="end" className="rounded-start-5">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-2">
            {user ? `Ciao, ${user.firstName}` : "Menu"}{" "}
            <Link to={token ? "/profilo" : "/login"} onClick={handleClose}>
              <PersonCircle className="text-black fs-1 cursor-pointer" />
            </Link>
          </Offcanvas.Title>
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
            style={{ overflow: "hidden" }}
          >
            <Link className="nav-link fw-bold fs-3" to="/categories/1" onClick={handleClose}>
              <p className="m-0 p-0">Yu-Gi-Oh!</p>
            </Link>
            <Link className="nav-link  fw-bold fs-3" to="/categories/2" onClick={handleClose}>
              <p className="m-0 p-0">One Piece</p>
            </Link>
            <Link className="nav-link  fw-bold fs-3" to="/categories/3" onClick={handleClose}>
              <p className="m-0 p-0">Pokémon</p>
            </Link>
            <Link className="nav-link  fw-bold fs-3" to="/categories/4" onClick={handleClose}>
              <p className="m-0 p-0">Dragonball</p>
            </Link>
          </motion.div>
          <Link className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Espansioni</p>
          </Link>
          <Link className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Acquista</p>
          </Link>
          <Link className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Hotbuy</p>
          </Link>
          <Link className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Wishlist</p>
          </Link>
          <Link className="nav-link nav-link-transition fw-bold fs-1" onClick={handleClose}>
            <p className="my-2">Info</p>
          </Link>
        </Offcanvas.Body>
        <div className="p-5 mx-auto">{token ? <Logout /> : <></>}</div>
      </Offcanvas>
    </>
  );
};

export default MenuOffcanvas;
