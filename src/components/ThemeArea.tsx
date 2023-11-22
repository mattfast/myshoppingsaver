import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import "./ThemeArea.css";
import "../Signup.css"

const themeNames = [
  "king",
  "princess",
  "cowboy",
  "athlete",
  "magical",
  "warrior"
]

const themeEmojis = [
  "👑",
  "👸🏻",
  "🤠",
  "🏈",
  "🪄",
   "⚔️",
];

const ThemeArea = ({ themeList, setThemeList, isSelecting, noText }) => {

  useEffect(() => {
    if (isSelecting) {
      for (let i = 0; i < themeList.length; i++) {
        const targetComponent = document.getElementById(`emoji-button-${themeList[i]}`);
        if (targetComponent) {
          targetComponent.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
          targetComponent.style.color = "#0CA0E4";
        }
      }
    }
  }, [isSelecting])

  const addToThemeList = (text: string) => {
    if (!isSelecting) return;

    const targetComponent = document.getElementById(`emoji-button-${text}`);
    
    if (targetComponent) {
      if (themeList.includes(text)) {
        setThemeList(themeList.filter(t => t != text));
        targetComponent.style.backgroundColor = "rgba(255, 255, 255, 0.16)";
        targetComponent.style.color = "#FFF";
      } else if (themeList.length < 3) {
        setThemeList([...themeList, text]);
        targetComponent.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
        targetComponent.style.color = "#0CA0E4";
      }
    }
  }
 
  return (
    <div className="themesArea">
      <div className="themesInstructionText">
        { isSelecting && "Choose up to 3 personalities:" }
        { !isSelecting && !noText && "Your personalities:" }
      </div>
        <div className="themes">
          { isSelecting && themeNames.map((t, i) => (
            <div id={`emoji-button-${t}`} className="retakeButton" onClick={() => addToThemeList(t)}>
              <div>{themeEmojis[i]}</div>
              <div>{t}</div>
            </div>
          ))}
          { !isSelecting && themeList.map(t => (
            <div id={`emoji-button-${t}`} className="retakeButton" onClick={() => addToThemeList(t)}>
              <div>{themeEmojis[themeNames.indexOf(t)]}</div>
              <div>{t}</div>
            </div>
          ))}
      </div>
    </div>
  )
};

export default ThemeArea;
