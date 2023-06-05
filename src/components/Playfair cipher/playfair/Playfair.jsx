import React from "react";
import Encryption from "../encryption/Encryption";
import Decryption from "../decryption/Decryption";
import "../../container.css";
const Playfair = () => {
  return (
    <div className="container">
      <h2>Playfair cipher</h2>
      <div className="functions">
        <Encryption />
        <Decryption />
      </div>
      {/* Ceaser cipher page */}
    </div>
  );
};

export default Playfair;
