import React from "react";
import { historyStyles } from "../Styles/ComponentsStyle";
const History = () => {
  const { container, card, header, date, button } = historyStyles;
  return (
    <div className="container" style={container}>
      <div className="row">
        <div className="col-2" style={card}>
          <div style={header}>Matematik</div>
          <div style={date}>18/03/2021</div>
          <button className="btn btn-light" style={button}>
            Notlar
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
