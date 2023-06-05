import React from "react";
import { useState } from "react";
import "../../functions.css";

function Encryption() {
  // State variables
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [ciphertext, setCiphertext] = useState("");

  // Event handler for plaintext input change
  const handlePlaintextChange = (event) => {
    setPlaintext(event.target.value);
  };

  // Event handler for key input change
  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  // Event handler for encryption button click
  const handleEncryption = () => {
    const encryptedText = encrypt(plaintext, key);
    setCiphertext(encryptedText);
  };

  // Encryption function
  const encrypt = (text, key) => {
    const sanitizedText = sanitizeText(text);
    const sanitizedKey = sanitizeText(key);

    const keyMatrix = generateKeyMatrix(sanitizedKey);
    const plaintextBlocks = generateBlocks(sanitizedText, keyMatrix.length);
    let encryptedText = "";

    for (let i = 0; i < plaintextBlocks.length; i++) {
      const plaintextBlock = plaintextBlocks[i];
      const encryptedBlock = encryptBlock(plaintextBlock, keyMatrix);
      encryptedText += encryptedBlock;
    }

    return encryptedText;
  };

  // Sanitize text by removing non-alphabetic characters and converting to uppercase
  const sanitizeText = (text) => {
    return text.replace(/[^A-Za-z]/g, "").toUpperCase();
  };

  // Generate the key matrix from the key
  const generateKeyMatrix = (key) => {
    const size = Math.sqrt(key.length);
    const matrix = [];

    for (let i = 0; i < key.length; i += size) {
      const row = key
        .substring(i, i + size)
        .split("")
        .map((char) => char.charCodeAt(0) - 65);
      matrix.push(row);
    }

    return matrix;
  };

  // Generate blocks of text with padding if necessary
  const generateBlocks = (text, blockSize) => {
    const blocks = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const block = text.substring(currentIndex, currentIndex + blockSize);

      if (block.length < blockSize) {
        const padding = "X".repeat(blockSize - block.length);
        blocks.push(block + padding);
      } else {
        blocks.push(block);
      }

      currentIndex += blockSize;
    }

    return blocks;
  };

  // Encrypt a block of text using the key matrix
  const encryptBlock = (block, matrix) => {
    const blockVector = block.split("").map((char) => char.charCodeAt(0) - 65);
    const resultVector = [];

    for (let i = 0; i < matrix.length; i++) {
      let sum = 0;

      for (let j = 0; j < matrix.length; j++) {
        sum += matrix[i][j] * blockVector[j];
      }

      resultVector.push(sum % 26);
    }

    const encryptedBlock = resultVector
      .map((num) => String.fromCharCode(num + 65))
      .join("");
    return encryptedBlock;
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
          <input type="text" value={key} onChange={handleKeyChange} placeholder="Enter valid key of length 9" className="hill__key"/>
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
