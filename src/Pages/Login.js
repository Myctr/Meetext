import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import background from "../Assets/Image/bg.jpg";
import Navbar from "../Components/Navbar";

const Login = () => {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Navbar />
      <div style={{ height: "900px", width: "100%" }}>
        <div style={{ marginLeft: "10%", position: "absolute" }}>
          <span style={{ color: "#F82249", padding: 50, fontSize: 100 }}>
            Meetext
          </span>
          <div style={{ color: "white", paddingLeft: 40, fontSize: 40 }}>
            Canlı Videokonferans
          </div>
        </div>
        <div style={{ textAlign: "end", margin: "10%" }}>
          <div style={{ fontSize: 50, marginRight: 70, color: "white" }}>
            Giriş Yap
          </div>
          <form style={{ alignItems: "center" }}>
            <input
              style={{
                width: 300,
                height: 40,
                borderRadius: 5,
                borderColor: "white",
                margin: 5,
              }}
              placeholder="Kullanıcı adı"
            />
            <br />
            <input
              style={{
                width: 300,
                height: 40,
                borderRadius: 5,
                borderColor: "white",
                margin: 5,
              }}
              placeholder="Şifre"
            />
            <br />
            <button
              type="button"
              style={{
                width: 100,
                height: 40,
                borderRadius: 5,
                borderColor: "white",
                margin: 5,
                backgroundColor: "#F82249",
                fontSize: 15,
              }}
              className="btn btn-danger"
            >
              Giriş
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
