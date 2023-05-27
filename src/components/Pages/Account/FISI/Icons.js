import React from "react";
import "./topLevel.css";
import "./css/Icons.css";

function Icons() {
  return (
    <>
      <div className="container">
        <nav className="nav">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Blue.png`}
            alt=""
            className="logo"
          />
        </nav>

        <img
          src={`${process.env.PUBLIC_URL}/assets/images/SDG-wheel.png`}
          alt=""
          className="sdg-wheel "
        />
      </div>
    </>
  );
}

export default Icons;
