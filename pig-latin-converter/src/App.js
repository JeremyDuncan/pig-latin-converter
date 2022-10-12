import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SavingsIcon from "@mui/icons-material/Savings";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import pig from "./assets/pig.png";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import "./App.css";
const App = () => {
  const [userInput, setUserInput] = useState("");
  const [inputTranslated, setInputTranslated] = useState("");
  const myPigLatinCodeHere = () => {
    const arrayOfUserInput = userInput.split(" ");
    const translatedWordsArray = arrayOfUserInput.map((word) => {
      const eachWord = word.toLowerCase(); // <== set all words to lowercase

      const vowelsArray = eachWord.split("").filter((vowel) => {
        return (
          vowel === "a" ||
          vowel === "e" ||
          vowel === "i" ||
          vowel === "o" ||
          vowel === "u"
        );
      });

      //Pig Latin logic goes here!
      //==============================================================================
      //removes all punctuation
      const punctFreeWordArr = eachWord.split("").filter((punct) => {
        return (
          punct !== "," &&
          punct !== "." &&
          punct !== "!" &&
          punct !== "?" &&
          punct !== ":" &&
          punct !== ";" &&
          punct !== "'"
        );
      });

      // stores all punctuation
      const punctuationArr = eachWord.split("").filter((punct) => {
        return (
          punct === "," ||
          punct === "." ||
          punct === "!" ||
          punct === "?" ||
          punct === ":" ||
          punct === ";" ||
          punct === "'"
        );
      });

      // ========Vowel at beginning add "way to end ==========="
      for (let i = 0; i < vowelsArray.length; i++) {
        if (vowelsArray[i] === eachWord[0]) {
          // if word has punctuation...
          if (punctuationArr.length > 0) {
            // return the word with "way" and punctuation at the end.
            return punctFreeWordArr.join("") + "way" + punctuationArr.join("");
          } else {
            //else return original word with "way" at the end
            return eachWord + "way";
          }
        }
      }

      // =triggered if words have "qu" in them and modifies word accordingly==
      for (let i = 0; i < eachWord.length; i++) {
        if (eachWord[i] === "q" && eachWord[i + 1] === "u") {
          // squeal === ealsquay

          let startIndex = i; // saves start index of leters to remove
          let endIndex = i + 2; // saves end index of leters to remove

          const vowelSlice = punctFreeWordArr.slice(startIndex, endIndex); // [ s, q, u ]
          const otherSLice = punctFreeWordArr.slice(endIndex); //[ e, a, l ]

          // check if there is punctuation in word
          // if there is, add punctuation at end
          if (punctuationArr.length > 0) {
            return (
              otherSLice.join("") +
              vowelSlice.join("") +
              "ay" +
              punctuationArr.join("")
            );
          } else {
            // else return word with "ay" at the end
            return otherSLice.join("") + vowelSlice.join("") + "ay";
          }
        }
      }

      // === triggered if no vowels and contains a "y" to make changes to word accordingly ===
      for (let i = 0; i < eachWord.length; i++) {
        if (vowelsArray.length === 0 && eachWord[i] === "y") {
          // fry === yfray
          let yIndex = i; // saves start index of letters to remove
          const vowelSlice = punctFreeWordArr.slice(yIndex, yIndex + 1); // ["y"]
          const otherSLice = punctFreeWordArr.slice(0, yIndex); // beginning characters

          // check if there is punctuation in word
          // if there is, add punctuation at end
          if (punctuationArr.length > 0) {
            // return the word with punctuation at the end.
            return (
              vowelSlice.join("") +
              otherSLice.join("") +
              "ay" +
              punctuationArr.join("")
            );
          } else {
            //else if no punctuation, do this...
            return vowelSlice.join("") + otherSLice.join("") + "ay"; // joined characters in new format
          }
        }
      }

      // through === ough "thr" + "ay"
      for (let i = 0; i < vowelsArray.length; i++) {
        let startIndex;
        let endIndex = 0;

        // if first letter is not a vowel then..
        if (vowelsArray[i] !== eachWord[0]) {
          startIndex = i;
          // iterate through letters to find the first vowel..
          // then store the index of that vowel
          for (let j = 0; j < vowelsArray.length; j++) {
            for (let k = 0; k < eachWord.length; k++) {
              if (vowelsArray[j] === eachWord[k]) {
                if (endIndex === 0) {
                  endIndex = k;
                }
              }
            }
          }
          const conSlice = punctFreeWordArr.slice(startIndex, endIndex); //["t", "h", "r"];
          const otherSLice = punctFreeWordArr.slice(endIndex);

          // check if there is punctuation in word
          // if there is, add punctuation at end
          if (punctuationArr.length > 0) {
            // return the word with punctuation at the end.
            return (
              otherSLice.join("") +
              conSlice.join("") +
              "ay" +
              punctuationArr.join("")
            );
          } else {
            //else if no punctuation, do this
            return otherSLice.join("") + conSlice.join("") + "ay";
          }
        }
      }
      //==============================================================================
      // this return will be the output of Pig Latin code
      // if input does not match requirements above then return message
      return "Please enter words, or suffer the consequences!!!";
    });

    // join array back to a string
    const translatedWords = translatedWordsArray.join(" ");

    // update the inputTranslated variable in state

    setInputTranslated(
      <Typography variant="h5" className="translatedText">
        {translatedWords}
      </Typography>
    );
  };

  // Resets state
  const restartGame = () => {
    setUserInput("");
    setInputTranslated("");
  };

  // this method prevents React from refreshing the page unnecessarily
  const setUpPreventDefault = (e) => {
    e.preventDefault();
    myPigLatinCodeHere();
  };

  // takes the value of the input and saves it in state
  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <Container className="container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignText: "center",
          gap: "20px"
        }}
      >
        <Typography
          variant="h3"
          sx={{ display: { xs: "none", sm: "initial" } }}
        >
          Pig Latin Translator
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", display: { xs: "inital", sm: "none" } }}
        >
          Pig Latin Translator
        </Typography>

        <Box sx={{ width: "200px" }}>
          <Image src={pig} alt="cute pig" />
        </Box>

        <Typography variant="h6">Enter phrase to be translated:</Typography>
        <TextField
          className="tf"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SavingsIcon />
              </InputAdornment>
            ),
          }}
          type="text"
          size="medium"
          label="Translator"
          onChange={handleInput}
          value={userInput}
        />
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button variant="contained" onClick={setUpPreventDefault}>
            Submit
          </Button>
          <Button variant="contained" onClick={restartGame}>
            Clear
          </Button>
        </Box>
      </Box>
      <br />
      <br />
      <Box>
        {inputTranslated}
      </Box>
      <br />

      <Box sx={{ textAlign: "center" }}>
        <footer>&copy; 2022 Jeremy Duncan</footer>
      </Box>
    </Container>
  );
};

export default App;
