import React, { useState } from "react";
import Intro from "../Components/Intro";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

const Login = (props) => {
  const [form, setForm] = useState(true);
  return (
    <div className="auth-page">
      <Intro />
      <div className="auth-card">
        {form ? (
          <LoginForm signIn={props.signIn} setUser={props.setUser} form={setForm} />
        ) : (
          <RegisterForm signIn={props.signIn} form={setForm} setUser={props.setUser} />
        )}
      </div>
    </div>
  );
};

export default Login;
