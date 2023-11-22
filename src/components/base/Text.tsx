import React, { useState, useRef, useEffect, ReactNode } from "react";

const Text = ({ size, color, weight, align, whiteSpace, children }: {
  size: string,
  color: "dark-gray" | "light-gray" | "white" | "black" | "blue" | "red",
  weight: number,
  align?: CanvasTextAlign,
  whiteSpace?: "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces",
  children: ReactNode
}) => {
 
  return (
    <div style={{
      textAlign: align ? align : "center",
      fontFamily: "Switzer",
      fontSize: size,
      fontStyle: "normal",
      fontWeight: weight,
      whiteSpace: whiteSpace ?? undefined,
      color: color == "dark-gray" ? "#475569" : color == "light-gray" ? "#7E8DA1" : color == "white" ? "#FFFFFF" : color == "black" ? "#000000" : color == "blue" ? "#3B82F6" : color == "red" ? "#FF0000" : undefined,
    }}>
      {children}
    </div>
  )
};

export default Text;
