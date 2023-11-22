import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import LandingPage from "./LandingPage";
import Profile from "./Profile";

const App = () => { 
  return (
    <MantineProvider theme={{ /* your theme settings */ }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LandingPage /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
};

export default App;
