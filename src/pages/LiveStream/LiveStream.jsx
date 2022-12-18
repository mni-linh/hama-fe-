import React from "react";
import FacebookEmbed from "./FacebookEmbed";
import YoutubeEmbed from "./YoutubeEmbed";
import "./livestream.css";
const LiveStream = () => {
  return (
    <div className="grid-container">
      <div className="youtube grid-item">
        <h2 style={{ color: "#4267b2" }}>Trực tiếp từ Youtube</h2>
        <YoutubeEmbed embedId="tYkEphdzQs0" />
      </div>
      <div className="facebook grid-item">
        <h2 style={{ color: "#4267b2" }}>Trực tiếp từ Facebook</h2>
        {/* <FacebookEmbed embedId="10153231379946729" /> */}
        <FacebookEmbed embedId="1170632433855622" />
      </div>
    </div>
  );
};

export default LiveStream;
