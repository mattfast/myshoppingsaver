import React, { useState, useRef, useEffect } from "react";

import Text from "./base/Text";
import "./AppHeader.css";

const BottomBar = ({ setPrivacyModalOpen, setTermsModalOpen }) => {

  return (
    <div style={{
      display: "flex",
      position: "fixed",
      bottom: "32px",
      width: "calc(100vw - 64px)",
      left: "32px",
      justifyContent: "space-between",
    }}>
      <Text color="light-gray" size="16px" weight={400}>
        ©Resell, 2023
      </Text>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => setTermsModalOpen(true)}>
          <Text color="light-gray" size="16px" weight={400}>
            Terms
          </Text>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => setPrivacyModalOpen(true)}>
          <Text color="light-gray" size="16px" weight={400}>
            Privacy
          </Text>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => window.open("mailto:matthew@milk-ai.com", "_blank")}>
          <Text color="light-gray" size="16px" weight={400}>
            Contact
          </Text>
        </div>
      </div>
    </div>
  )
};

export default BottomBar;
