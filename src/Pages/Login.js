import React,{useState} from "react";
import Intro from "../Components/Intro";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";


const Login = (props) => {
  const [form,setForm] = useState(true);
  return (
    <div>
      <Intro />
      {
        form ? <LoginForm signIn={props.signIn} setUser={props.setUser} form={setForm} />:
        <RegisterForm signIn={props.signIn} form={setForm} />
      }
      
    </div>
  );
};

export default Login;
