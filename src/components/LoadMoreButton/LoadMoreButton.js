import React from "react";
import "./LoadMoreButton.css";

function LoadMoreButton(props) {
  return (
    <div className="rmdb-loadmorebtn" onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  );
}

export default LoadMoreButton;
