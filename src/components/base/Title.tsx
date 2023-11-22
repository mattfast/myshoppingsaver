import React, { useState, useRef, useEffect, ReactNode } from "react";

const Title = ({ children }: {
  children: ReactNode
}) => {
 
  return (
    <div style={{
      color: "#020617",
      textAlign: "center",
      fontFamily: "BabasNeue",
      fontStyle: "normal",
      fontSize: "32px",
      fontWeight: 400,
      lineHeight: "110%",
    }}>
      {children}
    </div>
  )
};

export default Title;

