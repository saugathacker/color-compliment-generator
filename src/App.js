import React, { useState } from "react";
import ColorInput from "./components/ColorInput";
import ColorResult from "./components/ColorResult";
import Header from "./components/Header";
import {
  getCompliment,
  getSplitCompliment,
  getAnalogous,
} from "./colorConverters/colorConverters";

function App() {
  const [input, setInput] = useState("");
  const [inputBG, setInputBG] = useState("#ff0000");
  const [compliment, setCompliment] = useState("#00ffff");
  const [split, setSplit] = useState(["#00ff80", "#0080ff"]);
  const [analog, setAnalog] = useState(["#ff8000", "#ff0080"]);
  const [isValid, setIsValid] = useState(true);

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const generate = () => {
    let hex = input;
    setIsValid(true);

    if (!input.startsWith("#")) {
      hex = `#${input}`;
    }

    if (!/^#[0-9A-F]{6}$/i.test(hex)) {
      setIsValid(false);
      return;
    }

    setInputBG(hex);
    const com = getCompliment(hex);
    setCompliment(com);
    setSplit(getSplitCompliment(hex));
    setAnalog(getAnalogous(hex));
  };
  return (
    <div class='bg-gradient-to-br from-yellow-500 via-red-400 to-purple-400 lg:h-screen w-screen min-h-screen h-auto flex flex-col justify-start items-center font-sans pb-10'>
      <Header>Compliment Generator</Header>
      <ColorInput input={input} inputChange={inputChange} generate={generate} />
      {isValid ? "" : <p class='text-red-700'>!INVALID HEX CODE (#rrggbb)</p>}
      <ColorResult
        input={inputBG}
        compliment={compliment}
        split={split}
        analog={analog}
      />
    </div>
  );
}

export default App;
