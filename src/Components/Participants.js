import React from "react";
import avatar from "../Assets/Image/avatar.png";
const Participants = (props) => {
  return (
    <aside className="participants-panel">
      <h2 className="participants-title">Katılımcılar</h2>
      {props.meetParticipants.map((participant, index) => participant && (
        <div className="participant-card" key={`${participant}-${index}`}>
          <img src={avatar} alt="" />
          <span>{participant}</span>
        </div>
      ))}
    </aside>
  );
};
export default Participants;
