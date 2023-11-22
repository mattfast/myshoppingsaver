import React, { useEffect, useState, useRef } from 'react';

import './PhotoOptions.css';
import OptionButton from './OptionButton';
import Spacer from './base/Spacer';
import Text from './base/Text';
import { uploadToS3 } from '../utils';

const PhotoOptions = ({ userId, setImage, setFileType }) => {

  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const handleCapture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadToS3(file, setFileType, userId);
      setImage(file);
    }
  };

  const uploadButtonClick = () => {
    uploadInputRef.current?.click();
  }; 

  /*        <div style={{ marginTop: "15px" }}>
          <Text color="light-gray" weight={400} size="16px">or</Text>
        </div>
        <div style={{ marginBottom: "25px" }}>
          <OptionButton onClick={cameraButtonClick} text="TAKE A PHOTO"/>
        </div>*/

  return (
    <Spacer gap={10}>
      <div className="photoOptions">
        <input
          type="file"
          accept="image/*"
          onChange={handleCapture}
          ref={uploadInputRef}
          style={{ display: 'none' }}
        />
        <Spacer gap={6}>
          <OptionButton onClick={uploadButtonClick} text="UPLOAD IMAGE"/>
          <Text color="light-gray" weight={400} size="14px">1x JPG/PNG Image</Text>
        </Spacer>
      </div>
    </Spacer>
  );
};

export default PhotoOptions;
