import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { List, PersonCircle, Bag } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchOffcanvas from "./SearchOffcanvas";
import Logout from "../autenticazione/Logout";

const NavbarComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-black">
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
                <Bag className="text-white fs-2 cursor-pointer" />
              </li>
              <li className="nav-item me-3">
                <SearchOffcanvas />
              </li>
              <li className="nav-item">
                <List className="text-white fs-1 cursor-pointer" onClick={handleShow} />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {user ? `Ciao, ${user.Nome}` : "Menu"}{" "}
            <Link to={token ? "/profilo" : "/login"} onClick={handleClose}>
              <PersonCircle className="text-black fs-1 cursor-pointer" />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <a href="#">Home</a>
          </div>
          <div>
            <a href="#">Features</a>
          </div>
          <div>{token ? <Logout /> : <></>}</div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;
