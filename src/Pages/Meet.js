import React, { useEffect, useState } from "react";
import MeetStyle from "../Styles/MeetStyle";
import avatar from "../Assets/Image/avatar.png";
import axios from "axios";

const Meet = (props) => {
  const [users, setUsers] = useState([]);
  /*
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/tbl_users/" + props.meet.admin_id,
    }).then((res) => {
      if (res.data === "notfound") {
      } else {
        setUsers([...users, res.data]);
      }
    });
  }, []);
  */
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
        <div style={participants} className="col-2">
          {users.map((user) => (
            <div key={user[0]}>
              <div style={participant}>
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ width: "55%", height: "80%" }}
                />
                {user[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={toolBox}></div>
    </div>
  );
};

export default Meet;
