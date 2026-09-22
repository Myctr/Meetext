import React, { useEffect, useRef } from "react";
import avatar from "../Assets/Image/avatar.png";

const VideoTile = ({ label, stream, muted = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream || null;
  }, [stream]);

  return (
    <div className="video-tile">
      <video ref={videoRef} autoPlay muted={muted} playsInline />
      <span>{label}</span>
    </div>
  );
};

const Participants = ({
  cameraEnabled,
  localStream,
  microphoneEnabled,
  onToggleCamera,
  onToggleMicrophone,
  participants,
  remoteStreams,
}) => {
  return (
    <aside className="participants-panel">
      <h2 className="participants-title">Katılımcılar</h2>
      <div className="participant-video-grid">
        <VideoTile label="Sen" muted stream={localStream} />
        {remoteStreams.map(({ id, stream }) => (
          <VideoTile key={id} label={`Katılımcı ${id}`} stream={stream} />
        ))}
      </div>
      <div className="media-controls participant-media-controls">
        <button className={cameraEnabled ? "device-button" : "device-button is-off"} type="button" onClick={onToggleCamera}>
          {cameraEnabled ? "Kamera kapat" : "Kamera aç"}
        </button>
        <button className={microphoneEnabled ? "device-button" : "device-button is-off"} type="button" onClick={onToggleMicrophone}>
          {microphoneEnabled ? "Mikrofon kapat" : "Mikrofon aç"}
        </button>
      </div>
      {participants.map((participant) => (
        <div className="participant-card" key={participant.id}>
          <img src={avatar} alt="" />
          <span>{participant.name}</span>
        </div>
      ))}
    </aside>
  );
};
export default Participants;
