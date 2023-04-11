import React, { useState, useEffect } from "react";

import Display from "./components/Display";
import KeyPad from "./components/KeyPad";

import moonIcon from "./assets/moon.png";
import sunIcon from "./assets/sun.png";

import "./App.css";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 27, 37,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/", "%"];
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("calculator-app-mode")) || false
  );
  const [expression, setExression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );
  const [equal, setEqual] = useState(false);

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    //  
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);
    // 
    const answer = eval(exp).toFixed(2) + "";
    if (answer % 1 == 0) {
      setResult("= " + parseInt(answer));
      return (result.replace("= ", ""));
    }

    setResult("= " + answer);
    return answer;
  };

  const handleKeyPress = (keyCode, key) => {
    if (equal == true && operators.includes(key)) {
      setEqual(false);
      // if (result % 1 == 0)
      // setExression(parseInt(result) + key);
      // else
      setExression((result.replace("= ", "")) + key);
      return;
    }
    if (equal == true && numbers.includes(key)) {
      setResult("= " + key);
      setExression(key);
      setEqual(false);
      return;
    }
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (expression.length >= 12) return;
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar) || lastChar == ".") {
        setExression(expression.slice(0, -1) + key);
        return;
      }

      setExression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) {
        setExression(expression.slice(0, -1) + key);
        return;
      }

      setExression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExression(expression.slice(0, -1));
    } else if (keyCode === 27) {
      if (!expression) return;
      calculateResult("");
      setExression("");
      setEqual(false);
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(calculateResult(expression));
      setHistory(tempHistory);
      setEqual(true);
      if (result.length >= 12) {
        setEqual(false);
        setResult((result.replace("= ", "")) );
      }
    }
  }
  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  return (
    < >
      <div className="app w-screen h-screen bg-[#2a6c84] flex justify-center items-center transition-all duration-1000 font-Itim"
        tabIndex="0"
        onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
      >
        <div className="w-[300px] h-[550px] relative rounded-[30px] overflow-hidden flex flex-col shadow-3xl">
          <div className="absolute top-0 left-0 w-full bg-transparent h-[40px] p-3 flex gap-3 items-center overflow-hidden select-none">

            <div className="h-4 w-8 rounded-[20px] cursor-pointer
             shadow-[1px_1px_40px_80px_rgba(0,0,0,0.14)]" onClick={() => setIsDarkMode(!isDarkMode)}>

              <div className={`h-4 w-4 rounded-full duration-[300ms] 
               ${isDarkMode ? "ml-4 bg-white" : "bg-[#ffe203]"}`} >

              </div>
            </div>

            <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" height={24} width={24} />

          </div>

          <Display expression={expression} result={result}
            isDarkMode={isDarkMode} history={history} equal={equal} />

          <KeyPad isDarkMode={isDarkMode} handleKeyPress={handleKeyPress} />

        </div>
      </div>
    </>
  );
};

export default App;
