import React from "react";
import { Circle } from "better-react-spinkit";
import logo from "../assets/img/releaf.jpg";

const Loader = () => {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <img src={logo} alt="" style={{ marginBottom: 10 }} height="200" />
        <Circle color="#14a8f3" size={60} />
      </div>
    </center>
  );
};

export default Loader;
