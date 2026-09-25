import React, { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
import { validatePassword, validateText, validationRules } from "../formValidation";
const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const signInHandler = async (event) => {
    event.preventDefault();
    const usernameError = validateText(username, "Kullanıcı adı", validationRules.nickname);
    const passwordError = validatePassword(password);
    if (usernameError || passwordError) {
      setError(usernameError || passwordError);
      toast.error("Kullanıcı adı ve şifre gerekli.");
      return;
    }

    try {
      const response = await api.post("/signin", {
        nickname: username.trim(),
        password,
      });
      if (response.data === false) {
        setError("Kullanıcı adı veya şifre hatalı.");
        toast.error("Kullanıcı adı veya şifre hatalı.");
        return;
      }
      setError("");
      toast.success("Giriş başarılı. Arayüze yönlendiriliyorsunuz.");
      props.onAuthenticated(response.data);
    } catch (error) {
      setError("Giriş yapılamadı. Lütfen tekrar deneyin.");
      toast.error("Giriş yapılamadı.");
    }
  };

  return (
    <div>
      <h2 className="form-title">Giriş yap</h2>
      <p className="form-description">
        Toplantı alanınıza devam etmek için hesabınıza giriş yapın.
      </p>
      <form className="auth-form" onSubmit={signInHandler} noValidate>
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
            aria-invalid={Boolean(errorMessage)}
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
            autoComplete="current-password"
            aria-invalid={Boolean(errorMessage)}
          />
        </label>
        <p className="inline-error" role="alert">
          {errorMessage}
        </p>
        <button
          className="primary-button"
          type="submit"
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
