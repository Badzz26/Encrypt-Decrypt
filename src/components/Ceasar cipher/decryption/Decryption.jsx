import React from "react";
import { useState } from "react";
import "../../functions.css";

function Decryption() {
  // State variables
  const [ciphertext, setCiphertext] = useState("");
  const [Key, setKey] = useState(0);
  const [decryptedText, setDecryptedText] = useState("");

  // Event handler for ciphertext input change
  const handleCiphertextChange = (event) => {
    setCiphertext(event.target.value);
  };

  // Event handler for shift value selection
  const handleKeyChange = (event) => {
    setKey(parseInt(event.target.value));
  };

  // Event handler for decryption button click
  const handleDecryption = () => {
    const decryptedText = decrypt(ciphertext, Key);
    setDecryptedText(decryptedText);
  };

  // Decryption function
  const decrypt = (text, shift) => {
    const uppercaseText = text.toUpperCase();
    let decryptedText = "";

    for (let i = 0; i < uppercaseText.length; i++) {
      const char = uppercaseText[i];
      if (char === " ") {
        decryptedText += " ";
      } else {
        const charCode = uppercaseText.charCodeAt(i);
        const decryptedCharCode = ((charCode - 65 - shift + 26) % 26) + 65;
        decryptedText += String.fromCharCode(decryptedCharCode);
      }
    }

    return decryptedText;
  };

  // JSX rendering
  return (
    <>
      <h4 className="heading">Decryption</h4>
      <div className="input__output">
        <textarea
          name="input"
          className="io"
          cols="30"
          rows="10"
          value={ciphertext}
          onChange={handleCiphertextChange}
          placeholder="Enter valid message to be decrypted"
        ></textarea>
        <div className="key__encrypt">
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
          <button onClick={handleDecryption} className="encrypt__button">
            Decrypt
          </button>
        </div>

        <textarea
          name="output"
          className="io"
          cols="30"
          rows="10"
          placeholder="Ouput"
          value={decryptedText}
        ></textarea>
      </div>
    </>
  );
}

export default Decryption;
