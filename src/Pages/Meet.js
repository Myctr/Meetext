import React from "react";
import MeetStyle from "../Styles/MeetStyle";

const Meet = () => {
  const {
    header,
    chat,
    messageBox,
    toolBox,
    participant,
    container,
    row,
    chatBox,
    textBox,
    button,
  } = MeetStyle;
  return (
    <div className="container" style={container}>
      <div style={header}>Matematik</div>
      <div className="row" style={row}>
        <div style={chat} className="col-9">
          <div style={chatBox}>chatBox</div>
          <div style={messageBox}>
            <input type="text" style={textBox}></input>
            <button className="btn btn-light" style={button}>
              Gönder
            </button>
          </div>
        </div>
        <div style={participant} className="col-2">
          Katılımcılar
        </div>
      </div>
      <div style={toolBox}></div>
    </div>
  );
};

export default Meet;
