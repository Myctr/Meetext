import React from "react";
import JoinSvg from "../Assets/Illustrates/JoinSvg";
import { joinStyles } from "../Styles/ComponentsStyle";
const Join = () => {
  const { button, inputs, container, form } = joinStyles;
  return (
    <div style={container}>
      <JoinSvg />
      <form style={form}>
        <input type="text" placeholder="Toplantı Id" style={inputs} required />
        <br />
        <input
          type="password"
          placeholder="Toplantı Şifresi"
          style={inputs}
          required
        />
        <br />
        <button className="btn btn-danger" style={button}>
          Katıl!
        </button>
      </form>
    </div>
  );
};

export default Join;
