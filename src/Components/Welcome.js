import React from "react";
const Welcome = (props) => {
  return (
    <div className="welcome-view">
      <p className="auth-kicker">Meetext workspace</p>
      <h1 className="welcome-title">Toplantı alanınız hazır.</h1>
      <p className="welcome-copy">
        Yeni bir toplantı oluşturun veya size gönderilen toplantı kimliğiyle mevcut bir görüşmeye katılın.
      </p>
      <button
        className="primary-button welcome-button"
        type="button"
        onClick={() => props.setActive("create")}
      >
        Yeni toplantı oluştur
      </button>
    </div>
  );
};
export default Welcome;
