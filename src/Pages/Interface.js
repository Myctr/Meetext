import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const getMenuFromPath = (pathname) => {
  if (pathname.startsWith("/create")) return "create";
  if (pathname.startsWith("/join")) return "join";
  if (pathname.startsWith("/history/") && pathname.endsWith("/notes"))
    return "note";
  if (pathname.startsWith("/history")) return "history";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/meeting")) return "meet";
  return undefined;
};

const Interface = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(() =>
    getMenuFromPath(location.pathname),
  );
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
    if (nextMenu === "note" && selectedMeeting?.id) {
      navigate(`/history/${selectedMeeting.id}/notes`);
      return;
    }
    navigate(nextMenu === "meet" ? "/meeting" : `/${nextMenu}`);
  };
  useEffect(() => {
    setActiveMenu(getMenuFromPath(location.pathname));
  }, [location.pathname]);
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
                    setActiveMenu={changeMenu}
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
                    setActiveMenu={changeMenu}
                    onMeetingSaved={addToHistory}
                  />
                );
              case "history":
                return (
                  <History
                    history={history}
                    user={props.user}
                    setMeeting={setSelectedMeeting}
                    setActive={changeMenu}
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
                return <Welcome setActive={changeMenu} />;
            }
          })()}
        </div>
      </section>
    </div>
  );
};
export default Interface;
