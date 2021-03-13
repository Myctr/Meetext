import React from "react";
import { loginFormStyles } from "../Styles/ComponentsStyle";

const LoginForm = (props) => {
  const {
    container,
    intro,
    form,
    input,
    button,
    loss,
    register,
  } = loginFormStyles;
  return (
    <div style={container}>
      <div style={intro}>Giriş Yap</div>
      <form style={form}>
        <input type="text" style={input} placeholder="Kullanıcı adı" required />
        <br />
        <input type="password" style={input} placeholder="Şifre" required />
        <br />
        <div>
          <a style={loss}>Şifremi unuttum!</a>
        </div>
        <a style={register}>Kayıt olmak için tıklayınız!</a>

        <button
          style={button}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.signIn();
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
