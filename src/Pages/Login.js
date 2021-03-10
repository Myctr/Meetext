import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import background from '../Assets/Image/bg.jpg';
import Navbar from '../Components/Navbar'

const Login = () => {
  return (
    <div style={{ backgroundImage: `url(${background})`,height:'100%'}}>
        <Navbar />
    </div>
  );
};

export default Login;
