import React, { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
import { validatePassword, validateText, validationRules } from "../formValidation";

const RegisterForm = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const registerHandler = async (event) => {
    event.preventDefault();
    const nameError = validateText(name, "Ad", validationRules.name);
    const usernameError = validateText(username, "Kullanıcı adı", validationRules.nickname);
    const passwordError = validatePassword(password);
    const validationError = nameError || usernameError || passwordError;
    if (validationError) {
      setMessage(validationError);
      toast.error(validationError);
      return;
    }

    try {
      const response = await api.post("/signup", {
        name: name.trim(),
        nickname: username.trim(),
        password,
      });
      if (response.data === false) {
        setMessage("Bu kullanıcı adı zaten kullanımda.");
        toast.error("Bu kullanıcı adı zaten kullanımda.");
        return;
      }
      setMessage("");
      toast.success("Kayıt başarılı. Arayüze yönlendiriliyorsunuz.");
      props.onAuthenticated(response.data);
    } catch (error) {
      setMessage("Kayıt yapılamadı. Lütfen tekrar deneyin.");
      toast.error("Kayıt yapılamadı.");
    }
  };
  return (
    <div>
      <h2 className="form-title">Hesap oluştur</h2>
      <p className="form-description">
        Toplantılarınıza hızlıca katılmak için yeni bir hesap oluşturun.
      </p>
      <form className="auth-form" onSubmit={registerHandler} noValidate>
        <label className="field-label">
          Ad
          <input
            className="field-input"
            type="text"
            placeholder="Adınız"
            onChange={(e) => setName(e.target.value)}
            minLength={validationRules.name.minLength}
            maxLength={validationRules.name.maxLength}
            autoComplete="name"
          />
        </label>
        <label className="field-label">
          Kullanıcı adı
          <input
            className="field-input"
            type="text"
            placeholder="Kullanıcı adınız"
            onChange={(e) => setUsername(e.target.value)}
            minLength={validationRules.nickname.minLength}
            maxLength={validationRules.nickname.maxLength}
            autoComplete="username"
          />
        </label>
        <label className="field-label">
          Şifre
          <input
            className="field-input"
            type="password"
            placeholder="Şifreniz"
            onChange={(e) => setPassword(e.target.value)}
            minLength={validationRules.password.minLength}
            maxLength={validationRules.password.maxLength}
            autoComplete="new-password"
          />
        </label>
        <p className="inline-error" role="alert">
          {message}
        </p>
        <button
          className="primary-button"
          type="submit"
        >
          Kayıt ol
        </button>
        <p className="form-switch">
          Zaten hesabınız var mı?{" "}
          <button
            className="text-button"
            type="button"
            onClick={() => props.form(true)}
          >
            Giriş yapın
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
