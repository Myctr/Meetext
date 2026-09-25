import React, { useEffect, useRef } from "react";
import avatar from "../Assets/Image/avatar.png";
import { useTranslation } from "../i18n";

const ParticipantMedia = ({ name, stream, muted = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream || null;
  }, [stream]);

  return (
    <div className={`participant-media ${stream ? "has-video" : "has-avatar"}`}>
      {stream ? (
        <video ref={videoRef} autoPlay muted={muted} playsInline />
      ) : (
        <img src={avatar} alt="" />
      )}
      {!stream && <span>{name.slice(0, 1).toUpperCase()}</span>}
    </div>
  );
};

const Participants = ({
  cameraEnabled,
  currentUserId,
  localStream,
  microphoneEnabled,
  onToggleCamera,
  onToggleMicrophone,
  participants,
  remoteStreams,
}) => {
  const { t } = useTranslation();
  const remoteParticipants = participants.filter(
    (participant) => String(participant.id) !== String(currentUserId),
  );

  return (
    <aside className="participants-panel">
      <div className="participants-heading">
        <h2 className="participants-title">{t("participants.title")}</h2>
        <span className="participants-count">{participants.length}</span>
      </div>
      <div className="participant-list">
        {participants.map((participant) => {
          const isCurrentUser =
            String(participant.id) === String(currentUserId);
          const remoteIndex = remoteParticipants.findIndex(
            (remoteParticipant) => remoteParticipant.id === participant.id,
          );
          const remoteStream = remoteStreams[remoteIndex]?.stream;
          const stream = isCurrentUser ? localStream : remoteStream;

          return (
            <div className="participant-card" key={participant.id}>
              <ParticipantMedia
                muted={isCurrentUser}
                name={participant.name}
                stream={stream}
              />
              <div className="participant-details">
                <strong>{isCurrentUser ? t("participants.you") : participant.name}</strong>
                <span>
                  {isCurrentUser
                    ? cameraEnabled
                      ? t("participants.cameraOn")
                      : t("participants.cameraOff")
                    : stream
                      ? t("participants.cameraOn")
                      : t("participants.audioOnly")}
                </span>
              </div>
              <span className="participant-state" aria-label={t("participants.connected")} />
            </div>
          );
        })}
      </div>
      <div className="media-controls participant-media-controls">
        <button
          className={cameraEnabled ? "device-button" : "device-button is-off"}
          type="button"
          onClick={onToggleCamera}
        >
          {cameraEnabled ? t("participants.turnCameraOff") : t("participants.turnCameraOn")}
        </button>
        <button
          className={
            microphoneEnabled ? "device-button" : "device-button is-off"
          }
          type="button"
          onClick={onToggleMicrophone}
        >
          {microphoneEnabled ? t("participants.turnMicOff") : t("participants.turnMicOn")}
        </button>
      </div>
    </aside>
  );
};

export default Participants;
