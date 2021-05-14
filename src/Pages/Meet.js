import React, { useEffect, useState } from "react";
import axios from "axios";
import MeetStyle from "../Styles/MeetStyle";
import avatar from "../Assets/Image/avatar.png";

const Meet = (props) => {
  const [meetParticipants, setMeetParticipants] = useState([]);

  const findName = (id) => {
    axios({
      method: "get",
      url: "http://localhost:3001/tbl_users/" + id,
    }).then((res) => {
      setMeetParticipants([...meetParticipants, res.data[1]]);
    });
  };

  useEffect(() => {
    findName(props.meet.admin_id);
    if (props.meet.participant) {
      findName(props.meet.participant);
    }
  }, []);

  /*
  const findName = async (id) => {
    await axios({
      method: "get",
      url: "http://localhost:3001/tbl_users/" + id,
    }).then((res) => {
      setMeetParticipants([...meetParticipants, res.data[1]]);
      console.log(meetParticipants);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url:
        "http://localhost:3001/tbl_rooms/" +
        props.meet.conn_id +
        "&" +
        props.meet.password,
    }).then((res) => {
      props.setMeet(res.data);
      findName(res.data.admin_id);
      if (res.data.participant) {
        findName(res.data.participant);
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
        <div style={participants} className="col-2">
          <div>
            {meetParticipants.map((user) => (
              <div style={participant} key={user}>
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ width: "55%", height: "80%" }}
                />
                <br />
                {user}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={toolBox}></div>
    </div>
  );
};

export default Meet;
