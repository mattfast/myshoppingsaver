import React from 'react';
import { components } from 'react-select';
import CopyIcon from './CopyIcon';

import Text from './base/Text';

const MultiselectOption = props => {
  return (
    <components.MultiValue {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
        <Text size="18px" weight={400} color="black">
          {props.children}
        </Text>
        <div style={{ marginTop: '3px' }}>
          <CopyIcon text={String(props.children)}/>
        </div>
      </div>
    </components.MultiValue>
  );
};

export default MultiselectOption;

