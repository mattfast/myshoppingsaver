import React from 'react';

import Button from './base/Button';
import Text from './base/Text';

const WideButton = ({ color, text, onClick, small }: {
  color: string,
  text: string,
  onClick?: () => void,
  small?: boolean
}) => {

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      width: small ? "min(560px, 80%)" : "min(560px, 80vw)",
      background: color == "blue" ? "#3B82F6" : color == "light-blue" ? "#E5F0FF" : color == "red" ? "#D51A30" : undefined,
      whiteSpace: "nowrap",
      cursor: "pointer"
    }} onClick={onClick ? onClick : undefined}>
      <Button>
        <Text size="16px" weight={600} color={ color == "light-blue" ? "black" : "white" }>{text}</Text>
      </Button>
    </div>
  );
};

export default WideButton;
