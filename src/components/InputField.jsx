import { useState,useRef,useEffect} from "react";

const InputField = () => {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);
  const [selectionStart, setSelectionStart] = useState(0);
  
  const handleInputChange = (event) => {

    let r = /(\D+)/g, firstStr = "", middlStr = "", lastStr = "";
    let oldStr = event.target.value;
    let newVal = event.target.value.replace(r, "");
    
    if (newVal.length > 0) {
      firstStr = newVal.substr(0, 3);
      middlStr = newVal.substr(3, 3);
      lastStr = newVal.substr(6, 4);
      if (newVal.length > 6) {
        newVal = "(" + firstStr + ")" + middlStr + "-" + lastStr;
      } else if (newVal.length > 3) {
        newVal = "(" + firstStr + ")" + middlStr;
        if(!oldStr.includes("("))
        {
          oldStr = "("+oldStr;
        }
      } else if (newVal.length < 4) {
        newVal = firstStr;
        if(oldStr.includes("(")||oldStr.includes(")"))
        {
          oldStr=firstStr;
        }
      }
    }

    setInputVal(newVal);
    console.log("oldStr Value: "+oldStr);
    console.log("New Value: "+newVal);

    console.log("new Value Length: "+newVal.length);

    let ci = 0;
    while (ci<newVal.length) {
      console.log("ci: "+ci);
      if (oldStr.charAt(ci)!==newVal.charAt(ci)) {
        if (newVal.charAt(ci)==='-'||newVal.charAt(ci)===')') {
            ci+=2;
        }
        break;
      }
      ci+=1;
    }    
    setSelectionStart(ci);  
    
    
  };

  useEffect(function () {
    const cp = selectionStart;
    inputRef.current.setSelectionRange(cp, cp);
  });



  return (
    <input
      ref={inputRef}
      placeholder="Mobile Number"
      className="form-control border-dark border-2"
      value={inputVal}
      onChange={handleInputChange}
    ></input>
  );
};
export default InputField;
