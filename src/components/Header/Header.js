import React from "react";

import "./Header.css";

function Header() {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <img
          src="./images/reactMovie_logo.png"
          alt="react movie logo"
          className="rmdb-logo"
        />
        <img
          src="./images/tmdb_logo.png"
          alt="react movie logo"
          className="rmdb-tmdb-logo"
        />
      </div>
    </div>
  );
}

export default Header;