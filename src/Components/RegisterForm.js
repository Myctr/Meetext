import React, { useState } from "react";
import axios from "axios";
import { registerFormStyles } from "../Styles/ComponentsStyle";

const RegisterForm = (props) => {
  const { container, intro, form, input, button, login, error } =
    registerFormStyles;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const registerHandler = async () => {
    if ((name !== "") & (username !== "") & (password !== "")) {
      await axios({
        method: "post",
        url: "http://localhost:3001/signup",
        data: {
          name: name,
          nickname: username,
          password: password,
          rooms: "",
        },
      }).then((res) => {
        if (res.data === false) {
          setMessage("Kayıt olmak istediğiniz kullanıcı adı zaten mevcut.");
        } else {
          props.setUser(res.data[0]);
          alert("Kayıt işlemi başarılı arayüze yönlendiriliyorsunuz..");
          props.signIn(true);
        }
      });
    } else {
      setMessage("Form alanı boş bırakılamaz!");
    }
  };
  return (
    <div style={container}>
      <div style={intro}>Kayıt Ol</div>
      <form style={form}>
        <input
          type="text"
          style={input}
          placeholder="Ad"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          style={input}
          placeholder="Kullanıcı Adı"
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
        <div
          className={message === true ? "badge bg-success" : "badge bg-danger"}
          style={error}
        >
          {message}
        </div>
        <br />
        <span style={login} onClick={() => props.form(true)}>
          Giriş Yapmak için tıklayınız!
        </span>
        <button
          style={button}
          type="submit"
          className="btn btn-danger"
          onClick={(e) => {
            e.preventDefault();
            registerHandler();
          }}
        >
          Kayıt Ol!
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
