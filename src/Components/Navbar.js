import React from "react";
import { navbarStyles } from "../Styles/ComponentsStyle";
const Navbar = () => {
  const { background, logosrc, button } = navbarStyles;
  return (
    <nav className="navbar navbar-light bg-light" style={background}>
      <div className="container-fluid">
        <button type="button" className="btn btn-sm">
          <img src={logosrc} alt="Meetext" />
        </button>
        {/* <div className="d-flex">
          <button
            className="btn btn-light me-3 btn-lg"
            type="button"
            style={button}
          >
            Hakkımızda
          </button>
          <button
            className="btn btn-light  me-2 btn-lg "
            type="button"
            style={button}
          >
            İletişim
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
