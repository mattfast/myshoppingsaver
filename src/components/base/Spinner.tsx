import React, { useState, useRef, useEffect, ReactNode } from "react";

import './Spinner.css';
import Spacer from "./Spacer";

const LoadingSpinner = () => {
  return (
    <Spacer gap={0}>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </Spacer>
  );
};

export default LoadingSpinner;
