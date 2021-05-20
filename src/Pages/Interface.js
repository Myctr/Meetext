import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../Components/Menu";
import styles from "../Styles/InterfaceStyle";
import Create from "../Components/Create";
import Join from "../Components/Join";
import History from "../Components/History";
import Meet from "../Pages/Meet";
import Welcome from "../Components/Welcome";
import Note from "../Components/Note";

const Interface = (props) => {
  const [activeMenu, setActiveMenu] = useState();
  const [meet, setMeet] = useState({
    id: "",
    name: "",
    password: "",
    admin_id: "",
    conn_id: "",
    participant: "",
  });
  const [history, setHistory] = useState();
  const [messageIndex, setMessageIndex] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url:
        "http://localhost:3001/showroms/" +
        props.user.nickname +
        "&" +
        props.user.password,
    }).then((res) => {
      setHistory(res.data);
      console.log(res.data);
    });
  }, []);
  const { row, container, menu, panel } = styles;
  return (
    <div className="container" style={container}>
      <Menu style={menu} active={activeMenu} setActive={setActiveMenu} />
      {}
      <div className="row" style={row}>
        <div style={panel}>
          {(() => {
            switch (activeMenu) {
              case "create":
                return (
                  <Create
                    user={props.user}
                    meet={meet}
                    setMeet={setMeet}
                    setActiveMenu={setActiveMenu}
                  />
                );
              case "join":
                return (
                  <Join
                    user={props.user}
                    meet={meet}
                    setMeet={setMeet}
                    setActiveMenu={setActiveMenu}
                  />
                );
              case "history":
                return (
                  <History
                    history={history}
                    user={props.user}
                    setMessageIndex={setMessageIndex}
                    setActive={setActiveMenu}
                  />
                );
              case "note":
                return <Note user={props.user} messageIndex={messageIndex} />;
              case "meet":
                return <Meet user={props.user} meet={meet} setMeet={setMeet} />;
              default:
                return <Welcome setActive={setActiveMenu} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};
export default Interface;
