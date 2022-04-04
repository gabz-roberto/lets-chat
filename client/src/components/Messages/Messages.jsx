import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "../Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => {
  return (
    <div>
      <ScrollToBottom>
        {messages.map((message, index) => (
          <div key={index}>
            <Message message={message} name={name} />
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
