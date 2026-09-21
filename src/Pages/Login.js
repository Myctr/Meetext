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
          <LoginForm
            onAuthenticated={props.onAuthenticated}
            form={setForm}
          />
        ) : (
          <RegisterForm
            onAuthenticated={props.onAuthenticated}
            form={setForm}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
