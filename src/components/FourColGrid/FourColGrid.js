import React from "react";
import "./FourColGrid.css";

function FourColGrid(props) {
  function renderElements() {
    const gridElements = props.children.map((element, index) => (
      <div key={index} className="rmdb-grid-element">
        {element}
      </div>
    ));
    return gridElements;
  }

  return (
    <div className="rmdb-grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className="rmdb-grid-content">{renderElements()}</div>
    </div>
  );
}

export default FourColGrid;
