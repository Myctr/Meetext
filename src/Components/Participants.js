import React from "react";
import avatar from "../Assets/Image/avatar.png";
const Participants = ({ participants }) => {
  return (
    <aside className="participants-panel">
      <h2 className="participants-title">Katılımcılar</h2>
      {participants.map((participant) => (
        <div className="participant-card" key={participant.id}>
          <img src={avatar} alt="" />
          <span>{participant.name}</span>
        </div>
      ))}
    </aside>
  );
};
export default Participants;
