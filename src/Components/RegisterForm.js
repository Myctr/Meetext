import React, { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
import {
  validatePassword,
  validateText,
  validationRules,
} from "../formValidation";
import { useTranslation } from "../i18n";

const RegisterForm = (props) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const registerHandler = async (event) => {
    event.preventDefault();
    const nameError = validateText(
      name,
      t("auth.name"),
      validationRules.name,
      t,
    );
    const usernameError = validateText(
      username,
      t("auth.username"),
      validationRules.nickname,
      t,
    );
    const passwordError = validatePassword(password, t("auth.password"), t);
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
        setMessage(t("auth.usernameTaken"));
        toast.error(t("auth.usernameTaken"));
        return;
      }
      setMessage("");
      toast.success(t("auth.registerSuccess"));
      props.onAuthenticated(response.data);
    } catch (error) {
      setMessage(t("auth.registerFailed"));
      toast.error(t("auth.registerFailed"));
    }
  };
  return (
    <div>
      <h2 className="form-title">{t("auth.createAccount")}</h2>
      <p className="form-description">{t("auth.registerDescription")}</p>
      <form className="auth-form" onSubmit={registerHandler} noValidate>
        <label className="field-label">
          {t("auth.name")}
          <input
            className="field-input"
            type="text"
            placeholder={t("auth.namePlaceholder")}
            onChange={(e) => setName(e.target.value)}
            minLength={validationRules.name.minLength}
            maxLength={validationRules.name.maxLength}
            autoComplete="name"
          />
        </label>
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
            autoComplete="new-password"
          />
        </label>
        <p className="inline-error" role="alert">
          {message}
        </p>
        <button className="primary-button" type="submit">
          {t("auth.register")}
        </button>
        <p className="form-switch">
          {t("auth.haveAccount")}{" "}
          <button
            className="text-button"
            type="button"
            onClick={() => props.form(true)}
          >
            {t("auth.signInLink")}
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
