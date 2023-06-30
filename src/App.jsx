import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import Label from "./components/Label";

function App() {
  return (
    <>
      <div className="phn"
      >
        <div className="comp">
          <InputField />
        </div>
        <div className="comp">
          <Label />
        </div>
      </div>
    </>
  );
}

export default App;
