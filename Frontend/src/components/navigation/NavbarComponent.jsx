import { Link } from "react-router-dom";
import SearchOffcanvas from "./SearchOffcanvas";
import MenuOffcanvas from "./MenuOffcanvas";
import BagIcon from "../../assets/icons/BagIcon";

const NavbarComponent = () => {
  return (
    <>
      <nav className="navbar navbar-expand">
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
      </nav>
    </>
  );
};

export default NavbarComponent;
