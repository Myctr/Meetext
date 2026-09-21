import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api";

const Profile = ({ user, onUpdated }) => {
  const [name, setName] = useState(user.name);
  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [saving, setSaving] = useState(false);

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 500000) {
      toast.error("500 KB'dan küçük bir görsel seçin.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await api.put("/profile", {
        name,
        nickname,
        password: password || undefined,
        avatar: avatar || null,
      });
      onUpdated(response.data);
      setPassword("");
      toast.success("Profil güncellendi.");
    } catch (error) {
      toast.error("Profil güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-view">
      <p className="auth-kicker">Hesap</p>
      <h1 className="panel-title">Profilini düzenle</h1>
      <p className="panel-description">Kişisel bilgilerini ve profil görselini güncel tut.</p>
      <form className="profile-form" onSubmit={saveProfile}>
        <label className="avatar-picker">
          {avatar ? <img src={avatar} alt="Profil önizleme" /> : <span>{name.slice(0, 1).toUpperCase()}</span>}
          <input type="file" accept="image/*" onChange={handleAvatar} />
          <strong>Profil görseli seç</strong>
        </label>
        <label className="field-label">Ad<input className="field-input" value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label className="field-label">Kullanıcı adı<input className="field-input" value={nickname} onChange={(event) => setNickname(event.target.value)} /></label>
        <label className="field-label">Yeni şifre<input className="field-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Değiştirmek istemiyorsanız boş bırakın" /></label>
        <button className="primary-button" type="submit" disabled={saving}>{saving ? "Kaydediliyor..." : "Değişiklikleri kaydet"}</button>
      </form>
    </div>
  );
};

export default Profile;