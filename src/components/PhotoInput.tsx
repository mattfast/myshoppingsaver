import React, { useEffect, useState, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';

import './PhotoOptions.css';
import OptionButton from './OptionButton';
import Spacer from './base/Spacer';
import Text from './base/Text';

const brandOptions = [
  { value: 'Adidas', label: 'Adidas' },
  { value: 'Aritzia', label: 'Aritzia' },
  { value: 'Brandy Melville', label: 'Brandy Melville' },
  { value: 'Carhatt', label: 'Carhatt' },
  { value: 'Dickies', label: 'Dickies' },
  { value: 'Dr. Martens', label: 'Dr. Martens' },
  { value: 'Free People', label: 'Free People' },
  { value: 'Harley Davidson', label: 'Harley Davidson' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Lululemon', label: 'Lululemon' },
  { value: 'New Balance', label: 'New Balance' },
  { value: 'Nike', label: 'Nike' },
  { value: 'Patagonia', label: 'Patagonia' },
  { value: 'Polo Ralph Lauren', label: 'Polo Ralph Lauren' },
  { value: 'Supreme', label: 'Supreme' },
  { value: 'The North Face', label: 'The North Face' },
  { value: 'Urban Outfitters', label: 'Urban Outfitters' },
  { value: 'Zara', label: 'Zara' },
  { value: 'Louis Vuitton', label: 'Louis Vuitton' },
  { value: 'Pacsun', label: 'Pacsun' },
  { value: 'Coach', label: 'Coach' },
  { value: 'Reformation', label: 'Reformation' },
  { value: 'Sephora', label: 'Sephora' },
]

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '300px',  // Set your desired width here
    fontFamily: 'Switzer'
  }),
  option: (provided) => ({
    ...provided,
    fontFamily: 'Switzer', // Set your desired font family
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: 'Switzer', // Ensure consistency in selected value
    color: 'blue'
  }),
};

const PhotoInput = ({ setBrand, isRare, setIsRare }) => {

  const onClickBox = () => {
    setIsRare(!isRare);
  };

  /*      <Text color="black" weight={400} size="30px">
        Fill out two quick things about this item...
      </Text>*/

  return (
    <Spacer gap={30}>
      <div className="photoOptions">
        <Spacer gap={8}>
          <Spacer gap={0}>
            <Text color="dark-gray" weight={400} size="20px">
              Brand
            </Text>
            <Text color="dark-gray" weight={400} size="12px">
              Type to create or select from the dropdown
            </Text>
          </Spacer>
          <div style={{ width: "100%"}}>
            <CreatableSelect isClearable onChange={setBrand} options={brandOptions} styles={customStyles} />
          </div>
        </Spacer>
        <Spacer gap={8}>
          <Text color="dark-gray" weight={400} size="20px">
            Is this item rare/unique?
          </Text>
          <input
            type="checkbox"
            checked={isRare}
            onChange={onClickBox}
            style={{
              height: "20px",
              width: "20px",
              backgroundColor: "white",
              border: "2px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </Spacer>
      </div>
    </Spacer>
  );
};

export default PhotoInput;
