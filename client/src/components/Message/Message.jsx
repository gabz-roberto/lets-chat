import React from "react";
import ReactEmoji from 'react-emoji';

import "./Message.css";

const Message = ({ message: { user, text }, name }) => {
  let currentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    currentUser = true;
  }

  return currentUser ? (
    <div className="messageContent justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="msgBox bgBlue">
        <p className="msgText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContent justifyStart">
      <div className="msgBox bgLight">
        <p className="msgText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};

export default Message;
