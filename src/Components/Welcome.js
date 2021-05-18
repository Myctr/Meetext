import React from "react";
import { welcomeStyles } from "../Styles/ComponentsStyle";
const Welcome = (props) => {
  const { container, button, content, header } = welcomeStyles;
  return (
    <div style={container}>
      <div style={header}>
        Meetext'e Hoşgeldiniz!
        <br /> Videokonferans oluşturmak için lütfen tıklayınız.
        <br />
        <br />
        <button
          className="btn btn-danger"
          style={button}
          onClick={(e) => {
            e.preventDefault();
            props.setActive("create");
          }}
        >
          Meetext
        </button>
      </div>
      <div style={content}>
        Meetext üzerinden çevrimiçi videokonferanslara oluşturabilir veya
        katılabilirsiniz.Videokonferans sırasında yazılı veya sesli notlar
        oluşturabilir ve bu notlara istediğiniz zaman erişebilirsiniz.
      </div>
    </div>
  );
};
export default Welcome;
