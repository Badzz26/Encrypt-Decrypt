import React from 'react';
import Encryption from "../encryption/Encryption";
import Decryption from "../decryption/Decryption";
import "../../container.css"
const Vigenere = () => {
  return (
    <div className="container">
      <h2>Vigenere cipher</h2>
      <div className="functions">
        <Encryption />
        <Decryption />
      </div>
    </div>
  )
}

export default Vigenere;

