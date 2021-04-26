import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainerr justifyEnd">
      <p className="sentTextt pr-10">{trimmedName}</p>
      <div className="messageBoxx backgroundBlue">
        <p className="messageTextt colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainerr justifyStart">
      <div className="messageBoxx backgroundLight">
        <p className="messageTextt colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentTextt pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
