import React from "react";
import { noteStyles } from "../Styles/ComponentsStyle";

const Note = () => {
  const { container, header, note } = noteStyles;
  return (
    <div style={container}>
      <div style={header}>Matematik</div>
      <div style={note}>{"Muhammed - "}Matematik dersi başlamıştır.</div>
      <div style={note}>{"Yasin - "}Merhaba arkadaşlar.</div>
    </div>
  );
};

export default Note;
