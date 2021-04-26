import React from "react";

import onlineIcon from "../icons/onlineIcon.png";
import closeIcon from "../icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBarr">
    <div className="leftInnerContainerr">
      <img className="onlineIconn" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainerr">
      <a href="/">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
