import React from "react";
import "./Popup.css";

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const staticServerUri = process.env.REACT_APP_PATH || "";
  // useEffect(() => {
  //   const dontShowToday = localStorage.getItem("dontShowToday");
  //   const savedDate = localStorage.getItem("dontShowDate");

  //   if (dontShowToday && savedDate) {
  //     const currentDate = new Date().toISOString().split("T")[0]; // 오늘 날짜
  //     if (currentDate === savedDate) {
  //       onClose();
  //     } else {
  //       localStorage.removeItem("dontShowToday");
  //       localStorage.removeItem("dontShowDate");
  //     }
  //   }
  // }, [onClose]);
  const onClickEventPage = (e) => {
    e.preventDefault();
    window.location.href = `${staticServerUri}/event`;
  };

  // 오버레이 클릭 시 팝업 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // const handleDontShowToday = () => {
  //   const today = new Date().toISOString().split("T")[0];
  //   localStorage.setItem("dontShowToday", "true");
  //   localStorage.setItem("dontShowDate", today);
  //   onClose();
  // };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="100%"
          height="320px"
          src="https://www.youtube.com/embed/93mnQmY5FiM?si=SViEW0AB2aYnoOhx"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>
        <div className="kakao-button-wrapper">
          <div className="kakao-button" onClick={onClickEventPage}>
            네고왕 X 카카오 이벤트 바로가기
          </div>
        </div>
        <div className="today-button" onClick={onClose}>
          오늘 하루 보지 않기
        </div>
        <div className="modal-close-button" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Popup;
