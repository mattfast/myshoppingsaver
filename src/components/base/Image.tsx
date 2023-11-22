import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Image = ({ src, width, height }) => {

  return (
    <img src={ process.env.PUBLIC_URL + "assets/" + src } style={{ width, height }}/>
  )
};

export default Image;
