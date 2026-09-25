import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "../i18n";

const DevicePreview = ({ onStreamReady }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const onStreamReadyRef = useRef(onStreamReady);
  const tRef = useRef(t);
  const [stream, setStream] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

  useEffect(() => {
    onStreamReadyRef.current = onStreamReady;
  }, [onStreamReady]);

  useEffect(() => {
    tRef.current = t;
  }, [t]);

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
      .catch(() => toast.error(tRef.current("device.permissionDenied")));

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
      {!cameraEnabled && <div className="video-off-label">{t("device.cameraOff")}</div>}
      <div className="device-controls">
        <button
          className={cameraEnabled ? "device-button" : "device-button is-off"}
          type="button"
          onClick={toggleCamera}
        >
          {cameraEnabled ? t("device.turnCameraOff") : t("device.turnCameraOn")}
        </button>
        <button
          className={
            microphoneEnabled ? "device-button" : "device-button is-off"
          }
          type="button"
          onClick={toggleMicrophone}
        >
          {microphoneEnabled ? t("device.turnMicOff") : t("device.turnMicOn")}
        </button>
      </div>
    </div>
  );
};

export default DevicePreview;
