import React, { useState, useRef, useEffect, ReactNode } from "react";

import "./Button.css";

const Button = ({ onClick, children }: {
  onClick?: () => void,
  children: ReactNode
}) => {
  return (
    <div
      className="button"
      onClick={onClick}
    >
      {children}
    </div>
  )
};

export default Button;
