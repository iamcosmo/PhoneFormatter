import { useState,useRef,useEffect} from "react";

const InputField = () => {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);
  const [selectionStart, setSelectionStart] = useState(0);
  
  const handleInputChange = (event) => {

    let removalList = /(\D+)/g, firstStr = "", middlStr = "", lastStr = "";
    let oldStr = event.target.value;
    let newVal = event.target.value.replace(removalList, "");
    
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

    let currentIndex = 0;
    while (currentIndex<newVal.length) {
      if (oldStr.charAt(currentIndex)!==newVal.charAt(currentIndex)) {
        if (newVal.charAt(currentIndex)==='-'||newVal.charAt(currentIndex)===')') {
            currentIndex+=2;
        }
        break;
      }
      currentIndex+=1;
    }    
    setSelectionStart(currentIndex);  
    
    
  };

  useEffect(function () {
    const currentNewPosition = selectionStart;
    inputRef.current.setSelectionRange(currentNewPosition, currentNewPosition);
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
