import React from "react";
import { introStyles } from "../Styles/ComponentsStyle";

const Intro = () => {
  const { intro, header, info } = introStyles;
  return (
    <div style={intro}>
      <span style={header}>Meetext</span>
      <div style={info}>Canlı Videokonferans</div>
    </div>
  );
};

export default Intro;
