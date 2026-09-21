import React from "react";
import Participants from "../Components/Participants";

const Meet = (props) => {
  const meetParticipants = [
    props.meet.admin_id,
    props.meet.participant,
  ];

  return (
    <div className="meeting-room">
      <div className="meeting-room-header">
        <div>
          <p className="auth-kicker">Canlı toplantı</p>
          <h1 className="panel-title">{props.meet.name}</h1>
        </div>
        <div className="meeting-id">ID: {props.meet.conn_id}</div>
      </div>
      <div className="meeting-room-grid">
        <div className="meeting-chat">
          <div className="meeting-chat-box">Mesajlar burada görünecek.</div>
          <div className="meeting-message-box">
            <input type="text" className="field-input" placeholder="Mesaj yazın..." />
            <button className="secondary-button" type="button">
              Gönder
            </button>
          </div>
        </div>
        <Participants meetParticipants={meetParticipants} />
      </div>
    </div>
  );
};

export default Meet;
