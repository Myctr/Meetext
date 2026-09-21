import React, { useEffect, useRef, useState } from "react";
import Participants from "../Components/Participants";

const Meet = ({ meet, meetingPeer, user }) => {
  const [connectionStatus, setConnectionStatus] = useState("Bağlantı hazırlanıyor");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([
    { id: user.id, name: user.name },
  ]);
  const [messageText, setMessageText] = useState("");
  const connectionRef = useRef(null);
  const isHost = String(meet.admin_id) === String(user.id);

  useEffect(() => {
    if (!meetingPeer) return undefined;

    const addMessage = (message) => {
      if (message.type !== "message") return;
      setMessages((currentMessages) => [...currentMessages, message]);
    };

    const handleConnection = (connection) => {
      if (!connection) {
        setConnectionStatus("Bağlantı kurulamadı");
        return;
      }

      connectionRef.current = connection;
      connection.on("open", () => {
        setConnectionStatus("Bağlandı");
        if (!isHost) {
          connection.send({
            type: "join",
            user: { id: user.id, name: user.name },
          });
        }
      });
      connection.on("data", (data) => {
        if (data.type === "join" && isHost) {
          setParticipants((currentParticipants) => {
            const nextParticipants = currentParticipants.some(
              (participant) => String(participant.id) === String(data.user.id),
            )
              ? currentParticipants
              : [...currentParticipants, data.user];
            connection.send({ type: "participants", participants: nextParticipants });
            return nextParticipants;
          });
          return;
        }
        if (data.type === "participants") {
          setParticipants(data.participants);
          return;
        }
        addMessage(data);
      });
      connection.on("close", () => {
        connectionRef.current = null;
        setConnectionStatus("Bağlantı kapandı");
      });
      connection.on("error", () => setConnectionStatus("Bağlantı hatası"));
    };

    const connectToHost = () => {
      const connection = meetingPeer.connect(meet.conn_id, { reliable: true });
      handleConnection(connection);
    };

    if (isHost) {
      meetingPeer.on("connection", handleConnection);
      setConnectionStatus("Katılımcı bekleniyor");
    } else if (meetingPeer.open) {
      connectToHost();
    } else {
      meetingPeer.once("open", connectToHost);
    }

    return () => {
      meetingPeer.off("connection", handleConnection);
      meetingPeer.off("open", connectToHost);
      connectionRef.current?.close();
      connectionRef.current = null;
    };
  }, [isHost, meet.conn_id, meetingPeer, user.id, user.name]);

  const sendMessage = () => {
    const trimmedMessage = messageText.trim();
    const connection = connectionRef.current;
    if (!trimmedMessage || !connection || !connection.open) return;

    const message = {
      type: "message",
      sender: { id: user.id, name: user.name },
      text: trimmedMessage,
    };
    connection.send(message);
    setMessages((currentMessages) => [...currentMessages, message]);
    setMessageText("");
  };

  return (
    <div className="meeting-room">
      <div className="meeting-room-header">
        <div>
          <p className="auth-kicker">Canlı toplantı</p>
          <h1 className="panel-title">{meet.name}</h1>
          <p className="meeting-status">{connectionStatus}</p>
        </div>
        <div className="meeting-id">ID: {meet.conn_id}</div>
      </div>
      <div className="meeting-room-grid">
        <div className="meeting-chat">
          <div className="meeting-chat-box">
            {messages.length === 0 && (
              <p className="empty-chat">Mesajlar burada görünecek.</p>
            )}
            {messages.map((message, index) => (
              <div
                className={String(message.sender.id) === String(user.id) ? "chat-message own" : "chat-message"}
                key={`${message.sender.id}-${index}`}
              >
                <span className="chat-sender">{message.sender.name}</span>
                <span>{message.text}</span>
              </div>
            ))}
          </div>
          <div className="meeting-message-box">
            <input
              type="text"
              className="field-input"
              placeholder="Mesaj yazın..."
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              disabled={connectionStatus !== "Bağlandı"}
            />
            <button className="secondary-button" type="button" onClick={sendMessage}>
              Gönder
            </button>
          </div>
        </div>
        <Participants participants={participants} />
      </div>
    </div>
  );
};

export default Meet;
