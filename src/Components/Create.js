import React from "react";
import { createStyles } from "../Styles/ComponentsStyle";
import CreateSvg from "../Assets/Illustrates/CreateSvg";
const Create = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <CreateSvg />
      <form style={{ margin: 50 }}>
        <input
          type="text"
          placeholder="Toplantı Adı"
          style={{
            width: 300,
            height: 40,
            borderRadius: 5,
            borderColor: "#E6E6E6",
            margin: 5,
            backgroundColor: "white",
          }}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          style={{
            width: 300,
            height: 40,
            borderRadius: 5,
            borderColor: "#E6E6E6",
            margin: 5,
            backgroundColor: "white",
          }}
          required
        />
        <br />
        <button
          className="btn btn-danger"
          style={{
            width: 100,
            height: 40,
            borderRadius: 5,
            borderColor: "white",
            margin: 5,
            backgroundColor: "#F82249",
            fontSize: 15,
          }}
        >
          Oluştur!
        </button>
      </form>
    </div>
  );
};

export default Create;
