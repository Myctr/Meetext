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
import { useTranslation } from "../i18n";

const Interface = (props) => {
  const { t } = useTranslation();
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
  const [selectedMeeting, setSelectedMeeting] = useState();
  const [meetingPeer, setMeetingPeer] = useState();
  const [localStream, setLocalStream] = useState(null);
  const addToHistory = (room) => {
    setHistory((currentHistory) => [
      room,
      ...(currentHistory || []).filter(
        (currentRoom) => currentRoom.id !== room.id,
      ),
    ]);
  };
  const changeMenu = (nextMenu) => {
    if (
      activeMenu === "meet" &&
      nextMenu !== "meet" &&
      !window.confirm(t("meeting.leaveConfirm"))
    ) {
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
        <div className="sidebar-label">{t("menu.workspace")}</div>
        <Menu active={activeMenu} setActive={changeMenu} />
      </aside>
      <section
        className={
          activeMenu === "meet"
            ? "workspace-panel is-meeting"
            : "workspace-panel"
        }
      >
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
                    setLocalStream={setLocalStream}
                    setActiveMenu={setActiveMenu}
                    onMeetingSaved={addToHistory}
                  />
                );
              case "join":
                return (
                  <Join
                    user={props.user}
                    meet={meet}
                    setMeet={setMeet}
                    setMeetingPeer={setMeetingPeer}
                    setLocalStream={setLocalStream}
                    setActiveMenu={setActiveMenu}
                    onMeetingSaved={addToHistory}
                  />
                );
              case "history":
                return (
                  <History
                    history={history}
                    user={props.user}
                    setMeeting={setSelectedMeeting}
                    setActive={setActiveMenu}
                  />
                );
              case "note":
                return <Note meeting={selectedMeeting} />;
              case "profile":
                return (
                  <Profile user={props.user} onUpdated={props.onUserUpdated} />
                );
              case "meet":
                return (
                  <Meet
                    user={props.user}
                    meet={meet}
                    meetingPeer={meetingPeer}
                    localStream={localStream}
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
