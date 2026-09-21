import React, { useState, useEffect } from "react";
import { api } from "../api";
import Menu from "../Components/Menu";
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
  const [meetingPeer, setMeetingPeer] = useState();
  useEffect(() => {
    api.get("/showroms").then((res) => {
      setHistory(res.data);
    });
  }, [props.user.id]);

  return (
    <div className="workspace">
      <aside className="workspace-sidebar">
        <div className="sidebar-label">Çalışma alanı</div>
        <Menu active={activeMenu} setActive={setActiveMenu} />
      </aside>
      <section className="workspace-panel">
        <div className="workspace-panel-inner">
          {(() => {
            switch (activeMenu) {
              case "create":
                return (
                  <Create
                    user={props.user}
                    meet={meet}
                    setMeet={setMeet}
                    setMeetingPeer={setMeetingPeer}
                    setActiveMenu={setActiveMenu}
                  />
                );
              case "join":
                return (
                  <Join
                    user={props.user}
                    meet={meet}
                    setMeet={setMeet}
                    setMeetingPeer={setMeetingPeer}
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
                return (
                  <Meet
                    user={props.user}
                    meet={meet}
                    meetingPeer={meetingPeer}
                  />
                );
              default:
                return <Welcome setActive={setActiveMenu} />;
            }
          })()}
        </div>
      </section>
    </div>
  );
};
export default Interface;
