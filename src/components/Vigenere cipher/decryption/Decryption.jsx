import React from "react";
import { useState } from "react";


function Decryption() {
  // State variables
  const [ciphertext, setCiphertext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  // Event handler for ciphertext input change
  const handleCiphertextChange = (event) => {
    setCiphertext(event.target.value);
  };

  // Event handler for keyword input change
  const handleKeyChange = (event) => {
    setKeyword(event.target.value.toUpperCase());
  };

  // Event handler for decryption button click
  const handleDecryption = () => {
    const decryptedText = decrypt(ciphertext, keyword);
    setDecryptedText(decryptedText);
  };

  // Decryption function
  const decrypt = (text, key) => {
    const uppercaseText = text.toUpperCase();
    const uppercaseKey = key.toUpperCase();
    let decryptedText = "";

    let keyIndex = 0;
    for (let i = 0; i < uppercaseText.length; i++) {
      const char = uppercaseText[i];
      if (char === " ") {
        decryptedText += " ";
      } else {
        const charCode = uppercaseText.charCodeAt(i);
        const keyChar = uppercaseKey[keyIndex % uppercaseKey.length];
        const keyCharCode = keyChar.charCodeAt(0);
        const decryptedCharCode =
          ((charCode - 65 - (keyCharCode - 65) + 26) % 26) + 65;
        decryptedText += String.fromCharCode(decryptedCharCode);

        keyIndex++;
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
          <input type="text" value={keyword} onChange={handleKeyChange} placeholder="Enter valid key" className="hill__key"/>
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
    // <div>
    //   <input type="text" value={ciphertext} onChange={handleCiphertextChange} />
    //   <input type="text" value={keyword} onChange={handleKeywordChange} />
    //   <button onClick={handleDecryption}>Decrypt</button>
    //   <p>{decryptedText}</p>
    // </div>
  );
}


export default Decryption;