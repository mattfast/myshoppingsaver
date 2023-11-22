import React, { FormEvent, useEffect, useState } from "react";
import { Elements, CardElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ nextClick }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [canMakePayment, setCanMakePayment] = useState<boolean>(false);

  const paymentRequest = stripe ? stripe.paymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
      label: 'Demo Order',
      amount: 1, // Example amount
    },
  }) : null;

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.canMakePayment().then((result) => {
        setCanMakePayment(!!result);
      });
    }
  }, [paymentRequest]);

  useEffect(() => {
    async function createPaymentIntent() {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "auth-token": cookies["user-id"],
        },
      });
      const respJson = await response.json();
      if (respJson && respJson["client_secret"]) {
        setClientSecret(respJson["client_secret"]);
      } else {
        setError("Failed to initialize payment");
      }
    }

    createPaymentIntent();
  }, []);

  useEffect(() => {
    if (paymentRequest) {
      const handlePaymentMethod = async (ev) => {
        if (!stripe || !clientSecret) return;
  
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          clientSecret, { payment_method: ev.paymentMethod.id }
        );
  
        if (error) {
          ev.complete('fail');
          setError(error.message || "");
        } else if (paymentIntent.status === 'requires_action') {
          ev.complete('success');
          // Handle the additional required steps
          const result = await stripe.confirmCardPayment(clientSecret);
  
          if (result.error) {
            setError(result.error.message || "payment unsuccessful");
          } else {
            console.log("Payment successful after additional actions!");
          }      
        } else {
          ev.complete('success');
          console.log("Payment successful with Apple Pay!");
          nextClick();
        }
      };
  
      paymentRequest.on('paymentmethod', handlePaymentMethod);
  
      // Cleanup function
      return () => {
        paymentRequest.off('paymentmethod', handlePaymentMethod);
      };
    }
  }, [paymentRequest, stripe, clientSecret]);
    

  const handleCardSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.error("Client secret is not available");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (payload.error) {
      setError(payload.error.message || "payment unsuccessful");
    } else {
      console.log("Payment successful with card!");
      nextClick();
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: "300px", padding: "20px", maxWidth: "400px", margin: "0 auto", backgroundColor: "#f6f8fa", borderRadius: "8px" }}>
      {canMakePayment && paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}
      <form onSubmit={handleCardSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ fontSize: "18px", marginBottom: "10px" }}>Card Information:</label>
        <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <button type="submit" disabled={!stripe} style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;

