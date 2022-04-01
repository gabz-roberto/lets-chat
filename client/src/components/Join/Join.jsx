import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Join.css';

const Join = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOutsideContainer">
      <div className="joinInnerContainer">
        <h1 className="head-title">Entrar</h1>
        <div>
          <input
            type="text"
            placeholder="Nome"
            className="joinInput"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Sala"
            className="joinInput"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="btnJoin" type="submit">
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
