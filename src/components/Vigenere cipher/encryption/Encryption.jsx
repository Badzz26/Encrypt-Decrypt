import React from "react";
import { useState } from "react";

function Encryption() {
  // State variables
  const [plaintext, setPlaintext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [ciphertext, setCiphertext] = useState("");

  // Event handler for plaintext input change
  const handlePlaintextChange = (event) => {
    setPlaintext(event.target.value);
  };

  // Event handler for keyword input change
  const handleKeyChange = (event) => {
    setKeyword(event.target.value.toUpperCase());
  };

  // Event handler for encryption button click
  const handleEncryption = () => {
    const encryptedText = encrypt(plaintext, keyword);
    setCiphertext(encryptedText);
  };

  // Encryption function
  const encrypt = (text, key) => {
    const uppercaseText = text.toUpperCase();
    const uppercaseKey = key.toUpperCase();
    let encryptedText = "";

    let keyIndex = 0;
    for (let i = 0; i < uppercaseText.length; i++) {
      const char = uppercaseText[i];
      if (char === " ") {
        encryptedText += " ";
      } else {
        const charCode = uppercaseText.charCodeAt(i);
        const keyChar = uppercaseKey[keyIndex % uppercaseKey.length];
        const keyCharCode = keyChar.charCodeAt(0);
        const encryptedCharCode =
          ((charCode - 65 + (keyCharCode - 65)) % 26) + 65;
        encryptedText += String.fromCharCode(encryptedCharCode);

        keyIndex++;
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
          <input type="text" value={keyword} onChange={handleKeyChange} placeholder="Enter valid key" className="hill__key"/>
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
    // <div>
    //   <input type="text" value={plaintext} onChange={handlePlaintextChange} />
    //   <input type="text" value={keyword} onChange={handleKeywordChange} />
    //   <button onClick={handleEncryption}>Encrypt</button>
    //   <p>{ciphertext}</p>
    // </div>
  );
}

export default Encryption;