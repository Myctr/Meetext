import React from "react";
import Navbar from "../Components/Navbar";
import Intro from "../Components/Intro";
import LoginForm from "../Components/LoginForm";
import About from "../Components/About";
import styles from "../Styles/LoginStyle";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { background, page } = styles;
  return (
    <div style={background}>
      <Navbar />
      <div style={page}>
        <Intro />
        <LoginForm />
      </div>
      <div>
        <About />
      </div>
    </div>
  );
};

export default Login;
