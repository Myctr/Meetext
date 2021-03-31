import React from "react";
import { navbarStyles } from "../Styles/ComponentsStyle";
const Navbar = (props) => {
  const { background, logosrc, button, profileCard } = navbarStyles;
  return (
    <nav className="navbar navbar-light bg-light" style={background}>
      <div className="container-fluid">
        <button type="button" className="btn btn-sm">
          <img src={logosrc} alt="Meetext" />
        </button>
        <div
          className="d-flex"
          style={
            props.login ? { visibility: "visible" } : { visibility: "hidden" }
          }
        >
          <div style={profileCard}>{props.login ? props.user.name:'Undefined'}</div>
          <button
            className="btn btn-light  me-2 btn-lg "
            style={button}
            type="button"
            onClick={props.signOut}
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
