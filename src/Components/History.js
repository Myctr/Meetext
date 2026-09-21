import React from "react";
const History = (props) => {
  return (
    <div>
      <div className="section-heading">
        <p className="auth-kicker">Geçmiş</p>
        <h1 className="panel-title">Toplantılarım</h1>
      </div>
      <div className="history-grid">
        {(props.history || []).map((room) => (
          <div className="history-card" key={room.id}>
            <h2 className="history-card-title">{room.name}</h2>
            <button
              className="secondary-button"
              type="button"
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
