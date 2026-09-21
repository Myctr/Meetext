import React, { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const signInHandler = async () => {
    if ((username !== "") & (password !== "")) {
      await api.post("/signin", { nickname: username, password }).then((res) => {
        if (res.data === false) {
          setError("Kullanıcı adı veya şifre hatalı!");
          toast.error("Kullanıcı adı veya şifre hatalı.");
        } else {
          toast.success("Giriş başarılı. Arayüze yönlendiriliyorsunuz.");
          props.onAuthenticated(res.data);
        }
      });
    } else {
      setError("Kullanıcı adı veya şifre alanı boş bırakılamaz!");
      toast.error("Kullanıcı adı ve şifre gerekli.");
    }
  };

  return (
    <div>
      <h2 className="form-title">Giriş yap</h2>
      <p className="form-description">
        Toplantı alanınıza devam etmek için hesabınıza giriş yapın.
      </p>
      <form className="auth-form">
        <label className="field-label">
          Kullanıcı adı
          <input
            className="field-input"
            type="text"
            placeholder="Kullanıcı adınız"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="field-label">
          Şifre
          <input
            className="field-input"
            type="password"
            placeholder="Şifreniz"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className="inline-error" role="alert">
          {errorMessage}
        </p>
        <button
          className="primary-button"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signInHandler();
          }}
        >
          Giriş yap
        </button>
        <p className="form-switch">
          Hesabınız yok mu?{" "}
          <button
            className="text-button"
            type="button"
            onClick={() => props.form(false)}
          >
            Kayıt olun
          </button>
        </p>
      </form>
    </div>
  );
};
export default LoginForm;
