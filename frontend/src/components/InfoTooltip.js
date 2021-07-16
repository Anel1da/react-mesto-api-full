import React from "react";
export const InfoTooltip = ({ isOpen, onClose, infoToolTipMessage }) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img
          className="popup__tooltip-icon"
          src={infoToolTipMessage.icon}
          alt="#"
        />
        <h2 className="popup__title">{infoToolTipMessage.message}</h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};
