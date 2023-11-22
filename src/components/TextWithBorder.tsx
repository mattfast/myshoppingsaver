import React, { useEffect, useState, useRef } from 'react';

import Text from './base/Text';

const TextWithBorder = ({ color, weight, size, children }) => {

  return (
    <div style={{
      display: "flex",
      padding: "15px 16px",
      alignItems: "flex-start",
      gap: "10px",
      borderRadius: "4px",
      border: "1px solid #E3E8EF",
      background: "var(--white, #FFF)",
      width: "100%"
    }}>
      <Text color={color} weight={weight} size={size}>
        {children}
      </Text>
    </div>
  );
};

export default TextWithBorder;
