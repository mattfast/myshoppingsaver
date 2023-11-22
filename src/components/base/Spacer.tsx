import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion"

const Spacer = ({ gap, align, children }: {
  gap: number,
  align?: "center" | "left",
  children: ReactNode
}) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: align ? align : "center",
      gap: gap + "px",
      alignSelf: "stretch",
    }}>
      {children}
    </div>
  )
};

export default Spacer;
