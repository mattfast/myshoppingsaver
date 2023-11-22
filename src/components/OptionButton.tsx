import React from 'react';

import Button from './base/Button';
import Text from './base/Text';

const OptionButton = ({ onClick, text }) => {

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      background: "#E5F0FF",
      whiteSpace: "nowrap"
    }} onClick={onClick}>
      <Button>
        <Text size="16px" weight={600} color="black">{text}</Text>
      </Button>
    </div>
  );
};

export default OptionButton;
