import React, { useEffect, useState } from "react";
import axios from "axios";
import MeetStyle from "../Styles/MeetStyle";
import Participants from "../Components/Participants";

const Meet = (props) => {
  const [meetParticipants, setMeetParticipants] = useState([
    props.meet.admin_id,
    props.meet.participant,
  ]);

  const {
    header,
    chat,
    messageBox,
    toolBox,
    participants,
    participant,
    container,
    row,
    chatBox,
    textBox,
    button,
  } = MeetStyle;
  return (
    <div className="container" style={container}>
      <div style={header}>{props.meet.name}</div>
      <div style={header}>Toplantı Id : {props.meet.conn_id}</div>
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
        <Participants meetParticipants={meetParticipants} />
      </div>
      <div style={toolBox}></div>
    </div>
  );
};

export default Meet;
