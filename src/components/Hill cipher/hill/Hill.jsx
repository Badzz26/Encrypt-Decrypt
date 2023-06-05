import React from 'react';
import Encryption from "../encryption/Encryption";
import Decryption from "../decryption/Decryption";
import "../../container.css"
const Hill = () => {
  return (
    <div className="container">
      <h2>Hill cipher</h2>
      <div className="functions">
        <Encryption />
        <Decryption />
      </div>
      {/* Ceaser cipher page */}
    </div>
  )
}

export default Hill;

