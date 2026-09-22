import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const DevicePreview = ({ onStreamReady }) => {
  const videoRef = useRef(null);
  const onStreamReadyRef = useRef(onStreamReady);
  const [stream, setStream] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

  useEffect(() => {
    onStreamReadyRef.current = onStreamReady;
  }, [onStreamReady]);

  useEffect(() => {
    let active = true;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((nextStream) => {
        if (!active) return;
        setStream(nextStream);
        onStreamReadyRef.current(nextStream);
        if (videoRef.current) videoRef.current.srcObject = nextStream;
      })
      .catch(() => toast.error("Kamera veya mikrofon izni alınamadı."));

    return () => {
      active = false;
    };
  }, []);

  const toggleCamera = () => {
    const enabled = !cameraEnabled;
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = enabled;
    });
    setCameraEnabled(enabled);
  };

  const toggleMicrophone = () => {
    const enabled = !microphoneEnabled;
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = enabled;
    });
    setMicrophoneEnabled(enabled);
  };

  return (
    <div className="device-preview">
      <video ref={videoRef} autoPlay muted playsInline />
      {!cameraEnabled && <div className="video-off-label">Kamera kapalı</div>}
      <div className="device-controls">
        <button className={cameraEnabled ? "device-button" : "device-button is-off"} type="button" onClick={toggleCamera}>
          {cameraEnabled ? "Kamerayı kapat" : "Kamerayı aç"}
        </button>
        <button className={microphoneEnabled ? "device-button" : "device-button is-off"} type="button" onClick={toggleMicrophone}>
          {microphoneEnabled ? "Mikrofonu kapat" : "Mikrofonu aç"}
        </button>
      </div>
    </div>
  );
};

export default DevicePreview;
