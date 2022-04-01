import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

import "./Chat.css";

const Chat = ({location}) => {

    useEffect(() => {
        const parsed = queryString.parse(location.search)
        console.log(parsed)
        console.log(location.search)
    })

  return (
    <div className="main">
      <h1>Main</h1>
    </div>
  );
};

export default Chat;
