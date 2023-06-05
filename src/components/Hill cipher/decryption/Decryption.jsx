import React from "react";
import { useState } from "react";
import "../../functions.css";

function Decryption() {
  // State variables
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  // Event handler for ciphertext input change
  const handleCiphertextChange = (event) => {
    setCiphertext(event.target.value);
  };

  // Event handler for key input change
  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  // Event handler for decryption button click
  const handleDecryption = () => {
    const decryptedText = decrypt(ciphertext, key);
    setDecryptedText(decryptedText);
  };

  // Decryption function
  const decrypt = (text, key) => {
    const sanitizedText = sanitizeText(text);
    const sanitizedKey = sanitizeText(key);

    const keyMatrix = generateKeyMatrix(sanitizedKey);
    const ciphertextBlocks = generateBlocks(sanitizedText, keyMatrix.length);
    let decryptedText = "";

    for (let i = 0; i < ciphertextBlocks.length; i++) {
      const ciphertextBlock = ciphertextBlocks[i];
      const decryptedBlock = decryptBlock(ciphertextBlock, keyMatrix);
      decryptedText += decryptedBlock;
    }

    return decryptedText;
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

  // Generate blocks of text
  const generateBlocks = (text, blockSize) => {
    const blocks = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const block = text.substring(currentIndex, currentIndex + blockSize);
      blocks.push(block);
      currentIndex += blockSize;
    }

    return blocks;
  };

  // Decrypt a block of text using the key matrix
  const decryptBlock = (block, matrix) => {
    const blockVector = block.split("").map((char) => char.charCodeAt(0) - 65);
    const inverseMatrix = getInverseMatrix(matrix);
    const resultVector = [];

    for (let i = 0; i < inverseMatrix.length; i++) {
      let sum = 0;

      for (let j = 0; j < inverseMatrix.length; j++) {
        sum += inverseMatrix[i][j] * blockVector[j];
      }

      resultVector.push(((sum % 26) + 26) % 26);
    }

    const decryptedBlock = resultVector
      .map((num) => String.fromCharCode(num + 65))
      .join("");
    return decryptedBlock;
  };

  // Calculate the modular inverse of a matrix
  const getInverseMatrix = (matrix) => {
    const det = determinant(matrix);
    const adjugate = adjugateMatrix(matrix);
    const inverseDet = modularInverse(det, 26);
    const inverseMatrix = [];

    for (let i = 0; i < adjugate.length; i++) {
      const row = adjugate[i].map(
        (num) => (((num * inverseDet) % 26) + 26) % 26
      );
      inverseMatrix.push(row);
    }

    return inverseMatrix;
  };

  // Calculate the determinant of a matrix
  const determinant = (matrix) => {
    if (matrix.length === 2) {
      const a = matrix[0][0];
      const b = matrix[0][1];
      const c = matrix[1][0];
      const d = matrix[1][1];
      return (a * d - b * c + 26) % 26;
    }

    let det = 0;

    for (let j = 0; j < matrix.length; j++) {
      const submatrix = [];

      for (let i = 1; i < matrix.length; i++) {
        const row = [];

        for (let k = 0; k < matrix.length; k++) {
          if (k !== j) {
            row.push(matrix[i][k]);
          }
        }

        submatrix.push(row);
      }

      const sign = j % 2 === 0 ? 1 : -1;
      const cofactor = (sign * determinant(submatrix) + 26) % 26;
      det = (det + matrix[0][j] * cofactor + 26) % 26;
    }

    return det;
  };

  // Calculate the adjugate matrix of a matrix
  const adjugateMatrix = (matrix) => {
    const adjugate = [];

    for (let i = 0; i < matrix.length; i++) {
      const row = [];

      for (let j = 0; j < matrix.length; j++) {
        const submatrix = [];

        for (let k = 0; k < matrix.length; k++) {
          if (k !== i) {
            const subrow = [];

            for (let l = 0; l < matrix.length; l++) {
              if (l !== j) {
                subrow.push(matrix[k][l]);
              }
            }

            submatrix.push(subrow);
          }
        }

        const sign = (i + j) % 2 === 0 ? 1 : -1;
        const cofactor = (sign * determinant(submatrix) + 26) % 26;
        row.push(cofactor);
      }

      adjugate.push(row);
    }

    return transposeMatrix(adjugate);
  };

  // Calculate the modular inverse of a number
  const modularInverse = (num, modulo) => {
    for (let i = 1; i < modulo; i++) {
      if ((num * i) % modulo === 1) {
        return i;
      }
    }

    return 0;
  };

  // Transpose a matrix
  const transposeMatrix = (matrix) => {
    const transposed = [];

    for (let i = 0; i < matrix.length; i++) {
      const row = [];

      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[j][i]);
      }

      transposed.push(row);
    }

    return transposed;
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
          <input type="text" value={key} onChange={handleKeyChange} placeholder="Enter valid key of length 9" className="hill__key"/>
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
    //   <input type="text" value={key} onChange={handleKeyChange} />
    //   <button onClick={handleDecryption}>Decrypt</button>
    //   <p>{decryptedText}</p>
    // </div>
  );
}

export default Decryption;
