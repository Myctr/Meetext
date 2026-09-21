import React, { useState, useEffect } from "react";
import { api } from "../api";
import Menu from "../Components/Menu";
import Create from "../Components/Create";
import Join from "../Components/Join";
import History from "../Components/History";
import Meet from "../Pages/Meet";
import Welcome from "../Components/Welcome";
import Note from "../Components/Note";
import Profile from "../Components/Profile";

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
  const changeMenu = (nextMenu) => {
    if (activeMenu === "meet" && nextMenu !== "meet" && !window.confirm("Toplantıdan ayrılmak istediğinizden emin misiniz?")) {
      return;
    }
    setActiveMenu(nextMenu);
  };
  useEffect(() => {
    api.get("/showroms").then((res) => {
      setHistory(res.data);
    });
  }, [props.user.id]);

  return (
    <div className="workspace">
      <aside className="workspace-sidebar">
        <div className="sidebar-label">Çalışma alanı</div>
        <Menu active={activeMenu} setActive={changeMenu} />
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
              case "profile":
                return <Profile user={props.user} onUpdated={props.onUserUpdated} />;
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
