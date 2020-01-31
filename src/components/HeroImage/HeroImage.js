import React from "react";
import "./HeroImage.css";

function HeroImage(props) {
  const { title, text } = props;
  return (
    <div
      className="rmdb-heroimage"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)  39%,rgba(0,0,0,0)  41%,rgba(0,0,0,0.65)  100%),  url('${props.image}'), #1c1c1c`
      }}
    >
      <div className="rmdb-heroimage-content">
        <div className="rmdb-heroimage-text">
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default HeroImage;
