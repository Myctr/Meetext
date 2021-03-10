import React from 'react';
import background from '../Assets/Image/bg.jpg';
import logo from '../Assets/Image/logo.png';
const Navbar = () => {
    return(
        <nav className="navbar navbar-light bg-light" style={{ backgroundImage: `url(${background})`}} >
        <div className="container-fluid" >
            
          <button type="button" className="btn btn-sm">
            <img src={logo} alt="Meetext" />
          </button>
          {/* <div className="d-flex">
            <button
              className="btn btn-outline-danger  me-2 btn-lg "
              type="submit"
            >
              İletişim
            </button>
            <button
              className="btn btn-success me-3 btn-lg"
              type="submit"
            >
              Hakkımızda
            </button>
          </div> */}
        </div>
      </nav>
    )
}

export default Navbar;