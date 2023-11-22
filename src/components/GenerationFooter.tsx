import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import './PhotoOptions.css';
import OptionButton from './OptionButton';
import Spacer from './base/Spacer';
import { Status } from "../LandingPage";

const GenerationFooter = ({ user, setStatus }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const [nextTier, setNextTier] = useState<string>("Plus");

  useEffect(() => {
    if (user?.subscriptionTier == "Free") {
      setNextTier("Standard");
    } else if (user?.subscriptionTier == "Standard") {
      setNextTier("Plus");
    }
  }, [user])

  const enterStripe = async () => {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        'auth-token': cookies['user-id'],
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'from_generation': false,
        'subscription_tier': nextTier
      })
    });

    const respJson = await response.json();
    console.log(respJson);

    if (respJson['url']) {
      window.open(respJson['url']);
    }
  }

  return (
    <Spacer gap={10}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
        width: "min(460px, 70vw)"
      }}>
        <OptionButton onClick={() => setStatus(Status.PRE_GENERATION)} text="GENERATE AGAIN" />
        { user?.subscriptionTier !== "Plus" && <OptionButton onClick={enterStripe} text="BUY GENERATIONS" /> }
      </div>
    </Spacer>
  );
};

export default GenerationFooter;
