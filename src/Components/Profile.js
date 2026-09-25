import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api";
import {
  validatePassword,
  validateText,
  validationRules,
} from "../formValidation";
import { useTranslation } from "../i18n";

const Profile = ({ user, onUpdated }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(user.name);
  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [saving, setSaving] = useState(false);

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 500000) {
      toast.error(t("profile.imageTooLarge"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const nameError = validateText(name, t("auth.name"), validationRules.name, t);
    const nicknameError = validateText(
      nickname,
      t("auth.username"),
      validationRules.nickname,
      t,
    );
    const passwordError = password
      ? validatePassword(password, t("profile.newPassword"), t)
      : "";
    const validationError = nameError || nicknameError || passwordError;
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSaving(true);
    try {
      const response = await api.put("/profile", {
        name: name.trim(),
        nickname: nickname.trim(),
        password: password || undefined,
        avatar: avatar || null,
      });
      onUpdated(response.data);
      setPassword("");
      toast.success(t("profile.updated"));
    } catch (error) {
      toast.error(t("profile.updateFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-view">
      <p className="auth-kicker">{t("profile.kicker")}</p>
      <h1 className="panel-title">{t("profile.title")}</h1>
      <p className="panel-description">
        {t("profile.description")}
      </p>
      <form className="profile-form" onSubmit={saveProfile}>
        <label className="avatar-picker">
          {avatar ? (
            <img src={avatar} alt={t("profile.preview")} />
          ) : (
            <span>{name.slice(0, 1).toUpperCase()}</span>
          )}
          <input type="file" accept="image/*" onChange={handleAvatar} />
          <strong>{t("profile.chooseImage")}</strong>
        </label>
        <label className="field-label">
          {t("auth.name")}
          <input
            className="field-input"
            value={name}
            required
            minLength={validationRules.name.minLength}
            maxLength={validationRules.name.maxLength}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="field-label">
          {t("auth.username")}
          <input
            className="field-input"
            value={nickname}
            required
            minLength={validationRules.nickname.minLength}
            maxLength={validationRules.nickname.maxLength}
            onChange={(event) => setNickname(event.target.value)}
          />
        </label>
        <label className="field-label">
          {t("profile.newPassword")}
          <input
            className="field-input"
            type="password"
            value={password}
            minLength={validationRules.password.minLength}
            maxLength={validationRules.password.maxLength}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t("profile.passwordHint")}
          />
        </label>
        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? t("profile.saving") : t("profile.save")}
        </button>
      </form>
    </div>
  );
};

export default Profile;
