import React, { useState, useRef, useEffect } from "react";

const Divider = () => {
  return (
    <div style={{
      width: "min(80vw, 560px)",
      height: "1px",
      flexShrink: 0,
      background: "#E3E8EF"
    }} />
  )
};

export default Divider;
