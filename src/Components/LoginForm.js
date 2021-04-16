import React, { useState } from "react";
import { loginFormStyles } from "../Styles/ComponentsStyle";
import axios from "axios";
const LoginForm = (props) => {
  const {
    container,
    intro,
    form,
    input,
    button,
    register,
    error,
  } = loginFormStyles;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const signInHandler = async () => {
    if ((username !== "") & (password !== "")) {
      await axios({
        method: "get",
        url: "http://localhost:3001/tbl_users/" + username + "&" + password,
      }).then((res) => {
        console.log(res.data);
        if (res.data === "Wrong") {
          props.setUser(res.data);
          setError("Kullanıcı adı veya şifre hatalı!");
        } else {
          props.setUser(res.data);
          props.signIn(true);
        }
      });
    } else {
      setError("Kullanıcı adı veya şifre alanı boş bırakılamaz!");
    }
  };

  return (
    <div style={container}>
      <div style={intro}>Giriş Yap</div>
      <form style={form}>
        <input
          type="text"
          style={input}
          placeholder="Kullanıcı adı"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          style={input}
          placeholder="Şifre"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <div className="badge bg-danger" style={error}>
          {errorMessage}
        </div>
        <br />
        <span
          style={register}
          onClick={() => {
            props.form(false);
          }}
        >
          Kayıt olmak için tıklayınız!
        </span>
        <button
          style={button}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signInHandler();
          }}
          className="btn btn-danger"
        >
          Giriş
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
