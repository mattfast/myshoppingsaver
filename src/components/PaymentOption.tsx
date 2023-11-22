import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import './PaymentOption.css';
import Spacer from './base/Spacer';
import Text from './base/Text';

const PaymentOption = ({ name, currentPlan, generations, price, expiring }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const [isGreyedOut, setIsGreyedOut] = useState<boolean>(false);
  const [rightText, setRightText] = useState<string>("");

  const onClick = async () => {
    if (rightText == "UPGRADE") {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          'auth-token': cookies['user-id'],
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'from_generation': false,
          'subscription_tier': name
        })
      });
  
      const respJson = await response.json();
      console.log(respJson);
  
      if (respJson['url']) {
        window.open(respJson['url']);
      }
    } else if (rightText == "MANAGE" || rightText == "RENEW") {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/create-billing-portal-session`, {
        method: "POST",
        headers: {
          'auth-token': cookies['user-id'],
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'from_generation': false,
          'subscription_tier': name
        })
      });
  
      const respJson = await response.json();
      console.log(respJson);
  
      if (respJson['url']) {
        window.open(respJson['url']);
      }
    }
  }

  useEffect(() => {
    if (currentPlan == "Plus" && name != "Plus") setIsGreyedOut(true);
    else if (currentPlan == "Standard" && name == "Free") setIsGreyedOut(true);
    else setIsGreyedOut(false);
  }, [name, currentPlan])

  useEffect(() => {
    if (currentPlan == name && currentPlan != "Free") {
      if (expiring) setRightText("RENEW");
      else setRightText("MANAGE");
    }
    else if (currentPlan != name && currentPlan == "Free") setRightText("UPGRADE");
    else if (currentPlan == "Standard" && name == "Plus") setRightText("UPGRADE");
    else setRightText("");
  }, [name, currentPlan, expiring])

  return (
    <Spacer gap={10}>
      <div className="paymentOption" style={{
        border: currentPlan == name ? "1px solid #000" : "1px solid #E3E8EF"
      }} onClick={onClick}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "6px"
        }}>
          <Text color={ isGreyedOut ? "light-gray" : "dark-gray" } weight={400} size="18px">
            {name}: {generations} generations
          </Text>
          <Text color="light-gray" weight={400} size="16px">
            ${price} per month {name == currentPlan && "- Current plan"}
          </Text>
        </div>
        <div style={{ cursor: "pointer", marginTop: "15px"}}>
          <Text color="blue" size="14px" weight={600}>{rightText}</Text>
        </div>
      </div>
    </Spacer>
  );
};

export default PaymentOption;
