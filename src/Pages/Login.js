import React from "react";
import Intro from "../Components/Intro";
import LoginForm from "../Components/LoginForm";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  return (
    <div>
      <Intro />
      <LoginForm signIn={props.signIn} />
    </div>
  );
};

export default Login;
