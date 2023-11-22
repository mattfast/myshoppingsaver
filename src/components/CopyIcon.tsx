import React, { useState, useRef, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';

import Title from "./base/Title";
import Text from "./base/Text";
import Spacer from "./base/Spacer";
import "./CopyArea.css";

const CopyIcon = ({ text }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setClicked(true);
  };

  return (
    <>
      { !clicked && <img src={process.env.PUBLIC_URL + "assets/copy.png"} className="copyButtonIcon" onClick={copy} /> }
      { clicked && <img src={process.env.PUBLIC_URL + "assets/green-check.png"} className="copyButtonIcon" onClick={copy} /> }
    </>
  )
};

export default CopyIcon;
