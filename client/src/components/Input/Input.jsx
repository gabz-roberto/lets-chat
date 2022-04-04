import React from "react";

import "./Input.css";

const Input = ({message, sendMessage, setMessage}) => {
  return (
    <form className="inputForm">
      <input
        className="input"
        type="text"
        placeholder="Mensagem..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="btnSend" onClick={event => sendMessage(event)}>Enviar</button>
    </form>
  );
};

export default Input;
