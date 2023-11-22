import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';

import './PhotoOptions.css';
import OptionButton from './OptionButton';
import Spacer from './base/Spacer';
import Text from './base/Text';

const PhotoAndDelete = ({ imageUrl, onDelete }) => {

  return (
    <Spacer gap={10}>
      <div style={{
        position: "relative",
        display: "inline-block"
      }}>
        <div 
          onClick={onDelete}
          style={{
            height: "48px",
            width: "48px",
            borderRadius: "48px",
            background: "#FFEEF0",
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img 
            src={process.env.PUBLIC_URL + "assets/trash-can.png"}
            style={{ 
              position: "absolute",
              top: "10px",
              left: "12px",
              height: "auto",
              width: "24px",
            }}
          />
        </div>
        <img 
          src={imageUrl}
          style={{ 
            height: "auto",
            width: "auto",
            maxWidth: "80vw",
            maxHeight: "40vh",
            display: "block",
            borderRadius: "4px",
          }}
        />
      </div>
    </Spacer>
  );
};

export default PhotoAndDelete;
