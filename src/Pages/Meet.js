import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Participants from "../Components/Participants";
import { api } from "../api";
import { useTranslation } from "../i18n";

const formatElapsed = (seconds) => {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${remainingSeconds}`;
};

const formatMessageTime = (timestamp, language) =>
  new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));

const Meet = ({ meet, meetingPeer, user, localStream }) => {
  const { language, t } = useTranslation();
  const [connectionStatus, setConnectionStatus] = useState(
    "meeting.preparing",
  );
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([
    { id: user.id, name: user.name },
  ]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [copied, setCopied] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const connectionRef = useRef(null);
  const pendingConnectionsRef = useRef(new Map());
  const meetingStartedAtRef = useRef(Date.now());
  const isHost = String(meet.admin_id) === String(user.id);

  const approveRequest = (request) => {
    const connection = pendingConnectionsRef.current.get(String(request.id));
    if (!connection) {
      toast.error(t("meeting.connectionUnavailable"));
      setPendingRequests((currentRequests) =>
        currentRequests.filter((current) => current.id !== request.id),
      );
      return;
    }

    if (!connection.open) {
      toast.error(t("meeting.connectionNotReady"));
      return;
    }

    pendingConnectionsRef.current.delete(String(request.id));
    setPendingRequests((currentRequests) =>
      currentRequests.filter((current) => current.id !== request.id),
    );
    const nextParticipants = participants.some(
      (participant) => String(participant.id) === String(request.user.id),
    )
      ? participants
      : [...participants, request.user];
    try {
      connection.send({
        type: "join_approved",
        participants: nextParticipants,
      });
      if (localStream) {
        const mediaCall = meetingPeer.call(connection.peer, localStream);
        mediaCall.on("stream", (stream) => {
          setRemoteStreams([{ id: connection.peer, stream }]);
        });
      }
      connectionRef.current = connection;
      setParticipants(nextParticipants);
      setConnectionStatus("meeting.connected");
      meetingStartedAtRef.current = Date.now();
      toast.success(t("meeting.joined", { name: request.user.name }));
    } catch (error) {
      toast.error(t("meeting.approveFailed"));
    }
  };

  const rejectRequest = (request) => {
    const connection = pendingConnectionsRef.current.get(String(request.id));
    pendingConnectionsRef.current.delete(String(request.id));
    setPendingRequests((currentRequests) =>
      currentRequests.filter((current) => current.id !== request.id),
    );
    if (!connection) return;
    connection.send({ type: "join_rejected" });
    toast.success(t("meeting.rejectedFor", { name: request.user.name }));
    window.setTimeout(() => connection.close(), 250);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - meetingStartedAtRef.current) / 1000),
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const warnBeforeLeaving = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, []);

  useEffect(() => {
    if (!meetingPeer) return undefined;
    const pendingConnections = pendingConnectionsRef.current;

    const addMessage = (message) => {
      if (message.type !== "message") return;
      setMessages((currentMessages) => [...currentMessages, message]);
    };

    const handleConnection = (connection) => {
      if (!connection) {
        setConnectionStatus("meeting.connectionFailed");
        return;
      }
      connection.on("open", () => {
        if (!isHost) {
          setConnectionStatus("meeting.awaitingApproval");
          connection.send({
            type: "join_request",
            user: { id: user.id, name: user.name },
          });
        }
      });
      connection.on("data", (data) => {
        if (data.type === "join_request" && isHost) {
          pendingConnectionsRef.current.set(String(data.user.id), connection);
          setPendingRequests((currentRequests) =>
            currentRequests.some(
              (request) => String(request.id) === String(data.user.id),
            )
              ? currentRequests
              : [...currentRequests, { id: data.user.id, user: data.user }],
          );
          setConnectionStatus("meeting.permissionPending");
          return;
        }
        if (data.type === "join_approved" && !isHost) {
          connectionRef.current = connection;
          setParticipants(data.participants);
          setConnectionStatus("meeting.connected");
          meetingStartedAtRef.current = Date.now();
          return;
        }
        if (data.type === "join_rejected") {
          setConnectionStatus("meeting.rejected");
          toast.error(t("meeting.rejectedToast"));
          return;
        }
        if (data.type === "leave" && isHost) {
          setParticipants((currentParticipants) =>
            currentParticipants.filter(
              (participant) => String(participant.id) !== String(data.user.id),
            ),
          );
          setRemoteStreams((currentStreams) =>
            currentStreams.filter((current) => current.id !== connection.peer),
          );
          connection.close();
          return;
        }
        if (data.type === "host_left") {
          setConnectionStatus("meeting.hostLeft");
          toast.error(t("meeting.hostLeftToast"));
          return;
        }
        addMessage(data);
      });
      connection.on("close", () => {
        if (connectionRef.current === connection) connectionRef.current = null;
        setConnectionStatus("meeting.closed");
      });
      connection.on("error", () => setConnectionStatus("meeting.error"));
    };

    const handleMediaCall = (mediaCall) => {
      mediaCall.answer(localStream || undefined);
      mediaCall.on("stream", (stream) => {
        setRemoteStreams((currentStreams) => {
          const nextStreams = currentStreams.filter(
            (current) => current.id !== mediaCall.peer,
          );
          return [...nextStreams, { id: mediaCall.peer, stream }];
        });
      });
    };

    const connectToHost = () =>
      handleConnection(meetingPeer.connect(meet.conn_id, { reliable: true }));
    if (isHost) {
      meetingPeer.on("connection", handleConnection);
      setConnectionStatus("meeting.waiting");
    } else if (meetingPeer.open) {
      connectToHost();
    } else {
      meetingPeer.once("open", connectToHost);
    }
    meetingPeer.on("call", handleMediaCall);

    return () => {
      meetingPeer.off("connection", handleConnection);
      meetingPeer.off("open", connectToHost);
      meetingPeer.off("call", handleMediaCall);
      const activeConnection = connectionRef.current;
      if (activeConnection?.open) {
        activeConnection.send({
          type: isHost ? "host_left" : "leave",
          user: { id: user.id, name: user.name },
        });
      }
      window.setTimeout(() => activeConnection?.close(), 150);
      pendingConnections.forEach((connection) => connection.close());
      pendingConnections.clear();
      connectionRef.current = null;
    };
  }, [isHost, localStream, meet.conn_id, meetingPeer, t, user.id, user.name]);

  const toggleTrack = (kind) => {
    const nextEnabled = kind === "video" ? !cameraEnabled : !microphoneEnabled;
    localStream
      ?.getTracks()
      .filter((track) => track.kind === kind)
      .forEach((track) => {
        track.enabled = nextEnabled;
      });
    if (kind === "video") setCameraEnabled(nextEnabled);
    else setMicrophoneEnabled(nextEnabled);
  };

  const sendMessage = () => {
    const trimmedMessage = messageText.trim();
    const connection = connectionRef.current;
    if (!trimmedMessage || !connection || !connection.open) return;
    const message = {
      type: "message",
      sender: { id: user.id, name: user.name },
      text: trimmedMessage,
      sentAt: Date.now(),
    };
    connection.send(message);
    setMessages((currentMessages) => [...currentMessages, message]);
    setMessageText("");
    api.post(`/rooms/${meet.id}/messages`, { message: trimmedMessage }).catch(() => {
      toast.error(t("meeting.recordFailed"));
    });
  };

  const copyMeetingId = async () => {
    try {
      await navigator.clipboard.writeText(meet.conn_id);
      setCopied(true);
      toast.success(t("meeting.idCopied"));
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      toast.error(t("meeting.idCopyFailed"));
    }
  };

  return (
    <div className="meeting-room">
      <div className="meeting-room-header">
        <div>
          <p className="auth-kicker">{t("meeting.kicker")}</p>
          <h1 className="panel-title">{meet.name}</h1>
          <div className="meeting-meta">
            <p className="meeting-status">{t(connectionStatus)}</p>
            <span className="meeting-timer">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
        </div>
        <div className="meeting-id">
          <span>{t("meeting.id")}: {meet.conn_id}</span>
          <button className="copy-button" type="button" onClick={copyMeetingId}>
            {copied ? t("meeting.copied") : t("meeting.copy")}
          </button>
        </div>
      </div>
      {isHost && pendingRequests.length > 0 && (
        <div className="permission-panel">
          <strong>{t("meeting.requests")}</strong>
          {pendingRequests.map((request) => (
            <div className="permission-request" key={request.id}>
              <span>{t("meeting.request", { name: request.user.name })}</span>
              <div>
                <button
                  className="primary-button compact-button"
                  type="button"
                  onClick={() => approveRequest(request)}
                >
                  {t("meeting.approve")}
                </button>
                <button
                  className="secondary-button compact-button"
                  type="button"
                  onClick={() => rejectRequest(request)}
                >
                  {t("meeting.reject")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="meeting-room-grid">
        <div className="meeting-chat">
          <div className="meeting-chat-box">
            {messages.map((message, index) => (
              <div
                className={
                  String(message.sender.id) === String(user.id)
                    ? "chat-message own"
                    : "chat-message"
                }
                key={`${message.sender.id}-${index}`}
              >
                <span className="chat-sender">{message.sender.name}</span>
                <span>{message.text}</span>
                <time
                  className="chat-time"
                  dateTime={new Date(message.sentAt).toISOString()}
                >
                  {formatMessageTime(message.sentAt, language)}
                </time>
              </div>
            ))}
          </div>
          <div className="meeting-message-box">
            <input
              type="text"
              className="field-input"
              placeholder={t("meeting.messagePlaceholder")}
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              disabled={connectionStatus !== "meeting.connected"}
            />
            <button
              className="secondary-button"
              type="button"
              onClick={sendMessage}
              disabled={connectionStatus !== "meeting.connected"}
            >
              {t("meeting.send")}
            </button>
          </div>
        </div>
        <Participants
          cameraEnabled={cameraEnabled}
          currentUserId={user.id}
          localStream={localStream}
          microphoneEnabled={microphoneEnabled}
          onToggleCamera={() => toggleTrack("video")}
          onToggleMicrophone={() => toggleTrack("audio")}
          participants={participants}
          remoteStreams={remoteStreams}
        />
      </div>
    </div>
  );
};

export default Meet;
