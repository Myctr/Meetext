import React from "react";
const Navbar = (props) => {
  return (
    <nav className="app-navbar">
      <div className="navbar-brand">Meetext<span>.</span></div>
      {props.login && props.user && (
        <div className="navbar-actions">
          <div className="profile-card">{props.user.name}</div>
          <button className="secondary-button" type="button" onClick={props.signOut}>
            Çıkış Yap
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
