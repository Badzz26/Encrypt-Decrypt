import React from "react";
import { useState } from "react";

function Decryption() {
    // State variables
    const [ciphertext, setCiphertext] = useState('');
    const [key, setKey] = useState('');
    const [decryptedText, setDecryptedText] = useState('');    

    // Event handler for ciphertext input change
    const handleCiphertextChange = (event) => {
      setCiphertext(event.target.value);
    };
  
    // Event handler for key input change
    const handleKeyChange = (event) => {
      setKey(event.target.value.toUpperCase());
    };
  
    // Event handler for decryption button click
    const handleDecryption = () => {
      const decryptedText = decrypt(ciphertext, key);
      setDecryptedText(decryptedText);
    };
  
    // Decryption function
    const decrypt = (text, keyword) => {
      const sanitizedText = sanitizeText(text);
      const sanitizedKeyword = sanitizeText(keyword);
  
      const keyMatrix = generateKeyMatrix(sanitizedKeyword);
      const digraphs = generateDigraphs(sanitizedText);
      let decryptedText = '';
  
      for (let i = 0; i < digraphs.length; i++) {
        const digraph = digraphs[i];
        const decryptedDigraph = decryptDigraph(digraph, keyMatrix);
        decryptedText += decryptedDigraph;
      }
  
      return decryptedText;
    };
  
    // Sanitize text by removing non-alphabetic characters and converting to uppercase
    const sanitizeText = (text) => {
      return text.replace(/[^A-Za-z]/g, '').toUpperCase();
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
    const generateDigraphs = (text) => {
      const digraphs = [];
      let i = 0;
  
      while (i < text.length) {
        const char1 = text[i];
        let char2;
  
        if (i === text.length - 1 || char1 === text[i + 1]) {
          char2 = 'X';
          i--;
        } else {
          char2 = text[i + 1];
          i += 2;
        }
  
        digraphs.push([char1, char2]);
      }
  
      return digraphs;
    };
  
    // Decrypt a digraph using the key matrix
    const decryptDigraph = (digraph, matrix) => {
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
  
      let decryptedChar1, decryptedChar2;
      if (row1 === row2) {
        decryptedChar1 = matrix[row1][(col1 - 1 + 5) % 5];
        decryptedChar2 = matrix[row2][(col2 - 1 + 5) % 5];
      } else if (col1 === col2) {
        decryptedChar1 = matrix[(row1 - 1 + 5) % 5][col1];
        decryptedChar2 = matrix[(row2 - 1 + 5) % 5][col2];
      } else {
        decryptedChar1 = matrix[row1][col2];
        decryptedChar2 = matrix[row2][col1];
      }
  
      return decryptedChar1 + decryptedChar2;
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
          <input type="text" value={key} onChange={handleKeyChange} placeholder="Enter valid key" className="hill__key"/>
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
