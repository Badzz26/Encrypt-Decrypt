import React from "react";
import { useState } from "react";
import "../../functions.css";

function Encryption() {
  // State variables
  const [plaintext, setPlaintext] = useState("");
  const [Key, setKey] = useState(0);
  const [ciphertext, setCiphertext] = useState("");

  // Event handler for plaintext input change
  const handlePlaintextChange = (event) => {
    setPlaintext(event.target.value);
  };

  // Event handler for shift value selection
  const handleKeyChange = (event) => {
    setKey(parseInt(event.target.value));
  };

  // Event handler for encryption button click
  const handleEncryption = () => {
    const encryptedText = encrypt(plaintext, Key);
    setCiphertext(encryptedText);
  };

  // Encryption function
  const encrypt = (text, shift) => {
    const uppercaseText = text.toUpperCase();
    let encryptedText = "";

    for (let i = 0; i < uppercaseText.length; i++) {
      const char = uppercaseText[i];
      if (char === " ") {
        encryptedText += " ";
      } else {
        const charCode = uppercaseText.charCodeAt(i);
        const encryptedCharCode = ((charCode - 65 + shift) % 26) + 65;
        encryptedText += String.fromCharCode(encryptedCharCode);
      }
    }

    return encryptedText;
  };

  // JSX rendering
  return (
    <>
      <h4 className="heading">Encryption</h4>
      <div className="input__output">
        <textarea
          name="input"
          className="io"
          cols="30"
          rows="10"
          value={plaintext}
          onChange={handlePlaintextChange}
          placeholder="Enter valid message to be encrypted"
        ></textarea>
        <div className="key__encrypt">
        <h5>Shift value</h5>
          <select
            value={Key}
            onChange={handleKeyChange}
            className="key__options"
          >
            {Array.from({ length: 26 }, (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
          <button onClick={handleEncryption} className="encrypt__button">
            Encrypt
          </button>
        </div>

        <textarea
          name="output"
          className="io"
          cols="30"
          rows="10"
          placeholder="Ouput"
          value={ciphertext}
        ></textarea>
      </div>
    </>
  );
}

export default Encryption;
