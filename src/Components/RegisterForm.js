import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterForm = (props) => {
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
          toast.error("Bu kullanıcı adı zaten kullanımda.");
        } else {
          props.setUser(res.data);
          toast.success("Kayıt başarılı. Arayüze yönlendiriliyorsunuz.");
          props.signIn(true);
        }
      });
    } else {
      setMessage("Form alanı boş bırakılamaz!");
      toast.error("Tüm alanları doldurun.");
    }
  };
  return (
    <div>
      <h2 className="form-title">Hesap oluştur</h2>
      <p className="form-description">Toplantılarınıza hızlıca katılmak için yeni bir hesap oluşturun.</p>
      <form className="auth-form">
        <label className="field-label">
          Ad
          <input className="field-input" type="text" placeholder="Adınız" onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="field-label">
          Kullanıcı adı
          <input className="field-input" type="text" placeholder="Kullanıcı adınız" onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label className="field-label">
          Şifre
          <input className="field-input" type="password" placeholder="Şifreniz" onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <p className="inline-error" role="alert">{message}</p>
        <button className="primary-button" type="submit" onClick={(e) => {
          e.preventDefault();
          registerHandler();
        }}>
          Kayıt ol
        </button>
        <p className="form-switch">
          Zaten hesabınız var mı?{" "}
          <button className="text-button" type="button" onClick={() => props.form(true)}>
            Giriş yapın
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
