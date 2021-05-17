import React, { useEffect, useState } from "react";
import { participantsStyles } from "../Styles/ComponentsStyle";
import avatar from "../Assets/Image/avatar.png";
const Participants = (props) => {
  const { participants, participant } = participantsStyles;

  return (
    <div style={participants} className="col-2">
      <div>
        <div style={participant}>
          <img
            src={avatar}
            alt="avatar"
            style={{ width: "55%", height: "80%" }}
          />
          {props.meetParticipants[0]}
          <br />
        </div>
        <br />
        {props.meetParticipants[1] ? (
          <div style={participant}>
            <img
              src={avatar}
              alt="avatar"
              style={{ width: "55%", height: "80%" }}
            />

            <br />
            {props.meetParticipants[1]}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default Participants;
