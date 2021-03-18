import React from "react";
import { createStyles } from "../Styles/ComponentsStyle";
import CreateSvg from "../Assets/Illustrates/CreateSvg";
const Create = () => {
  const { button, inputs, container, form } = createStyles;
  return (
    <div style={container}>
      <CreateSvg />
      <form style={form}>
        <input type="text" placeholder="Toplantı Adı" style={inputs} required />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          style={inputs}
          required
        />
        <br />
        <button className="btn btn-danger" style={button}>
          Oluştur!
        </button>
      </form>
    </div>
  );
};

export default Create;
