import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Title from "./base/Title";
import "./GenerateSection.css";
import Spacer from "./base/Spacer";

const GenerateSection = () => {
  
  const [generating, setGenerating] = useState<boolean>(false);

  const onClick = () => {
    setGenerating(true);
    // TODO: add generation call

    //setGenerating(false);
  }
 
  return (
    <Spacer gap={10}>
      <div
        className="generateButton"
        onClick={onClick}
      >
      </div>
    </Spacer>
  )
};

export default GenerateSection;
