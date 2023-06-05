import React from "react";
import { useState } from "react";

function Encryption() {
    // State variables
    const [plaintext, setPlaintext] = useState('');
    const [key, setKey] = useState('');
    const [ciphertext, setCiphertext] = useState('');
  
    // Event handler for plaintext input change
    const handlePlaintextChange = (event) => {
      setPlaintext(event.target.value);
    };
  
    // Event handler for key input change
    const handleKeyChange = (event) => {
      setKey(event.target.value.toUpperCase());
    };
  
    // Event handler for encryption button click
    const handleEncryption = () => {
      const encryptedText = encrypt(plaintext, key);
      setCiphertext(encryptedText);
    };
  
    // Encryption function
    const encrypt = (text, keyword) => {
      const sanitizedText = sanitizeText(text);
      const sanitizedKeyword = sanitizeText(keyword);
  
      const keyMatrix = generateKeyMatrix(sanitizedKeyword);
      const digraphs = generateDigraphs(sanitizedText);
      let encryptedText = '';
  
      for (let i = 0; i < digraphs.length; i++) {
        const digraph = digraphs[i];
        const encryptedDigraph = encryptDigraph(digraph, keyMatrix);
        encryptedText += encryptedDigraph;
      }
  
      return encryptedText;
    };
  
    // Sanitize text by removing non-alphabetic characters and converting to uppercase
    const sanitizeText = (text) => {
      return text
      .replace(/[^a-z]/gi, "") // Remove non-alphabetic characters
      .replace(/j/gi, "i")
      .toUpperCase();
    };
  
    // Generate the key matrix from the keyword
    const generateKeyMatrix = (keyword) => {
      // Generate initial key matrix from keyword
      const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      const key = keyword + alphabet;
      const uniqueChars = Array.from(new Set(key));
      const matrix = [];
  
      for (let i = 0; i < uniqueChars.length; i += 5) {
        matrix.push(uniqueChars.slice(i, i + 5));
      }
  
      return matrix;
    };
  
    // Generate digraphs from the sanitized text
    // Generate digraphs from the sanitized text
const generateDigraphs = (text) => {
  const digraphs = [];
  let i = 0;

  while (i < text.length) {
    const char1 = text[i];
    let char2;

    if (i === text.length - 1) {
      char2 = 'X';
      i++;
    } else if (char1 === text[i + 1]) {
      char2 = 'X';
    } else {
      char2 = text[i + 1];
      i += 2;
    }

    digraphs.push([char1, char2]);
  }

  return digraphs;
};

  
    // Encrypt a digraph using the key matrix
    // Encrypt a digraph using the key matrix
const encryptDigraph = (digraph, matrix) => {
  const [char1, char2] = digraph;

  let row1, col1, row2, col2;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char1) {
        row1 = i;
        col1 = j;
      } else if (matrix[i][j] === char2) {
        row2 = i;
        col2 = j;
      }
    }
  }

  let encryptedChar1, encryptedChar2;
  if (row1 === row2) {
    encryptedChar1 = matrix[row1][(col1 + 1) % 5];
    encryptedChar2 = matrix[row2][(col2 + 1) % 5];
  } else if (col1 === col2) {
    encryptedChar1 = matrix[(row1 + 1) % 5][col1];
    encryptedChar2 = matrix[(row2 + 1) % 5][col2];
  } else {
    encryptedChar1 = matrix[row1][col2];
    encryptedChar2 = matrix[row2][col1];
  }

  return encryptedChar1 + encryptedChar2;
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
          <input type="text" value={key} onChange={handleKeyChange} placeholder="Enter valid key" className="hill__key"/>
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
      //   <input type="text" value={key} onChange={handleKeyChange} />
      //   <button onClick={handleEncryption}>Encrypt</button>
      //   <p>{ciphertext}</p>
      // </div>
    );
  }
  

  export default Encryption;