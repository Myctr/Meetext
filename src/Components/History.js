import React, { useState } from "react";
import { historyStyles } from "../Styles/ComponentsStyle";
import axios from "axios";
const History = (props) => {
  const { container, card, header, date, button } = historyStyles;

  return (
    <div className="container" style={container}>
      <div className="row">
        {props.history.map((room) => (
          <div className="col-2" style={card} key={room.id}>
            <div style={header}>{room.name}</div>
            {/* <div style={date}>18/03/2021</div> */}
            <button
              className="btn btn-light"
              style={button}
              onClick={(e) => {
                e.preventDefault();
                props.setMessageIndex(room.id);
                props.setActive("note");
              }}
            >
              Notlar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
