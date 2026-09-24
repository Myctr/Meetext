import React, { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
import {
  validatePassword,
  validateText,
  validationRules,
} from "../formValidation";
import { useTranslation } from "../i18n";
const LoginForm = (props) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const signInHandler = async (event) => {
    event.preventDefault();
    const usernameError = validateText(
      username,
      t("auth.username"),
      validationRules.nickname,
      t,
    );
    const passwordError = validatePassword(password, t("auth.password"), t);
    if (usernameError || passwordError) {
      setError(usernameError || passwordError);
      toast.error(t("auth.requiredCredentials"));
      return;
    }

    try {
      const response = await api.post("/signin", {
        nickname: username.trim(),
        password,
      });
      if (response.data === false) {
        setError(t("auth.invalidCredentials"));
        toast.error(t("auth.invalidCredentials"));
        return;
      }
      setError("");
      toast.success(t("auth.signInSuccess"));
      props.onAuthenticated(response.data);
    } catch (error) {
      setError(t("auth.signInFailed"));
      toast.error(t("auth.signInFailed"));
    }
  };

  return (
    <div>
      <h2 className="form-title">{t("auth.signIn")}</h2>
      <p className="form-description">
        {t("auth.signInDescription")}
      </p>
      <form className="auth-form" onSubmit={signInHandler} noValidate>
        <label className="field-label">
          {t("auth.username")}
          <input
            className="field-input"
            type="text"
            placeholder={t("auth.usernamePlaceholder")}
            onChange={(e) => setUsername(e.target.value)}
            minLength={validationRules.nickname.minLength}
            maxLength={validationRules.nickname.maxLength}
            autoComplete="username"
            aria-invalid={Boolean(errorMessage)}
          />
        </label>
        <label className="field-label">
          {t("auth.password")}
          <input
            className="field-input"
            type="password"
            placeholder={t("auth.passwordPlaceholder")}
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
        <button className="primary-button" type="submit">
          {t("auth.signIn")}
        </button>
        <p className="form-switch">
          {t("auth.noAccount")} {" "}
          <button
            className="text-button"
            type="button"
            onClick={() => props.form(false)}
          >
            {t("auth.register")}
          </button>
        </p>
      </form>
    </div>
  );
};
export default LoginForm;
