import React from "react";
import { calcTime, convertMoney } from "../../helpers";
import "./MovieInfoBar.css";

function MovieInfoBar(props) {
  const {time, budget, revenue}=props;
  return (
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <span className="rmdb-movieinfobar-info">
            Running time :{calcTime(time)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <span className="rmdb-movieinfobar-info">
            Budget:{convertMoney(budget)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <span className="rmdb-movieinfobar-info">
            Revenue:{convertMoney(revenue)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoBar;
