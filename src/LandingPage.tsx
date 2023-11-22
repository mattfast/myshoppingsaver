import React, { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Analytics } from '@vercel/analytics/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip'

import Spacer from "./components/base/Spacer";
import Space from "./components/base/Space";
import Text from "./components/base/Text";
import "./LandingPage.css";

import AppHeader from "./components/AppHeader";
import DisplayGeneration from "./components/DisplayGeneration";
import PhotoOptions from "./components/PhotoOptions";
import PhotoAndDelete from "./components/PhotoAndDelete";
import WideButton from "./components/WideButton";
import BottomBar from "./components/BottomBar";
import LoadingSpinner from "./components/base/Spinner";
import Login from "./components/Login";
import PhotoInput from "./components/PhotoInput";
import PrivacyModal from "./components/PrivacyModal";
import TermsModal from "./components/TermsModal";
import FeedbackModal from "./components/FeedbackModal";

export enum Status {
  PRE_GENERATION,
  GENERATING,
  LOGIN,
  GENERATIONS_EXCEEDED,
  POST_GENERATION
}

export type UserType = {
  userId: string;
  email?: string;
  subscriptionTier?: string;
  generationsLeft?: number;
  lastGeneration?: any;
  subscriptionExpires?: string;
}

const generation_static_data = {
  "Link": "https://resell.ai/off-white/01232342cnwrj23dcxi",
  "Product name": "Off-White, Anything Tee",
  "Description": "Up for auction is a lightly worn off-white t-shirt in great condition. This super soft shirt is made of 60% cotton and 40% polyester, providing both comfort and durability. It has a classic crew neckline and short sleeves."
}

const LandingPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const [searchParams, setSearchParams] = useSearchParams();

  const [image, setImage] = useState<Blob | null>(null);
  const [brand, setBrand] = useState<string>("");
  const [isRare, setIsRare] = useState<boolean>(false);
  const [fileType, setFileType] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(Status.PRE_GENERATION);
  const [generation, setGeneration] = useState<any>(generation_static_data);
  const [user, setUser] = useState<UserType | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [termsModalOpen, setTermsModalOpen] = useState<boolean>(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ReactNode | null>(null);
  const [successMessage, setSuccessMessage] = useState<ReactNode | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        closeOnClick: true,
        autoClose: false,
        pauseOnHover: true,
        draggable: true,
      });
    }

  }, [errorMessage])

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        closeOnClick: true,
        autoClose: false,
        pauseOnHover: true,
        draggable: true,
      });
    }

  }, [successMessage])

  useEffect(() => {
    async function verifySubscription() {
      const checkoutStatus = searchParams.get("checkout");
      if (checkoutStatus && checkoutStatus == "success") {
        const response = await fetch(`${process.env.REACT_APP_BE_URL}/retrieve-user`, {
          method: "GET",
          headers: {
            'auth-token': cookies['user-id'],
          }
        });

        const respJson = await response.json();

        if (response.status == 200 && respJson['generations_left'] != 0) {
          setGeneration(respJson['last_generation']);
          setStatus(Status.POST_GENERATION);
        }
      }
    }

    verifySubscription();
  }, [searchParams])

  useEffect(() => {
    async function createOrRetrieveUser() {
      let response;
      if (cookies['user-id']) {
        response = await fetch(`${process.env.REACT_APP_BE_URL}/retrieve-user`, {
          method: "GET",
          headers: {
            'auth-token': cookies['user-id'],
          }
        })
      } else {
        response = await fetch(`${process.env.REACT_APP_BE_URL}/create-user`, {
          method: "POST",
        })
      }

      const respJson = await response.json();
      setUser({
        userId: respJson["user_id"],
        email: respJson["email"] ?? undefined,
        subscriptionTier: respJson["subscription_tier"] ?? undefined,
        generationsLeft: respJson["generations_left"] ?? undefined
      });
      setGeneration(respJson['last_generation']);

      respJson["cookie"] && setCookie("user-id", respJson["cookie"]);
    }
    
    createOrRetrieveUser();
  }, [cookies])

  const generate = async () => {
    if (!brand) {
      setErrorMessage("Please select a brand");
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/list-image`, {
      method: "POST",
      headers: {
        'auth-token': cookies['user-id'],
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'url': `upload-${user?.userId}.${fileType}`,
        'is_unique': isRare,
        'brand': brand
      })
    });

    if (response.status !== 201) {
      setErrorMessage(
        <div>Our AI model is a bit overloaded with requests right now.<br /><br />Wait about 30 seconds, and give it another shot!</div>
      );
    } else {
      setStatus(Status.GENERATING);
    }

  }

  useEffect(() => {
    async function pollForGeneration() {
      while (status === Status.GENERATING) {
        const response = await fetch(`${process.env.REACT_APP_BE_URL}/retrieve-user`, {
          method: "GET",
          headers: {
            'auth-token': cookies['user-id'],
          }
        });

        const respJson = await response.json();

        console.log(respJson);

        if (respJson['last_generation']) {
          if (respJson['last_generation']['error']) {
            setErrorMessage(
              <div>Our AI model is a bit overloaded with requests right now.<br /><br />Wait about 30 seconds, and give it another shot!</div>
            );
            setStatus(Status.PRE_GENERATION);
          } else if (respJson['last_generation']['is_clothing'] === false) {
            setErrorMessage(
              <div>Your picture does not show the clothing quite clearly enough.<br /><br />Make sure the lighting is good, and try taking a photo with a neutral background!</div>
            );
            setStatus(Status.PRE_GENERATION);
          } else {
            setGeneration(respJson['last_generation']);
            console.log(respJson['last_generation']);

            if (user?.email) {
              if (user?.generationsLeft && user?.generationsLeft <= 0 && user?.subscriptionTier != "Plus") setStatus(Status.GENERATIONS_EXCEEDED);
              else setStatus(Status.POST_GENERATION);
            }
            else setStatus(Status.LOGIN);
          }

          break;
        } else {
          await new Promise(r => setTimeout(r, 500));
        }
      }
    }

    pollForGeneration();

  }, [status])

  useEffect(() => {
    if (status == Status.GENERATING) {
      const interval = setInterval(() => {
        setSecondsElapsed(prevSeconds => prevSeconds + 1);
      }, 1000); // Increment the seconds every 1000 milliseconds
  
      return () => clearInterval(interval);
    }
  }, [status]); 


  return (
    <>
      <AppHeader user={user} setUser={setUser} setStatus={setStatus} setFeedbackModalOpen={setFeedbackModalOpen} isPortrait={isPortrait} />
      { status == Status.PRE_GENERATION && (
        <Spacer gap={0}>
          <div style={{ maxWidth: "min(80vw, 560px)" }}>
            <Space px="28px" />
            <Spacer gap={0}>
              <Text color="dark-gray" weight={400} size="34px">
                Sell clothes faster with automatic descriptions and pricing.
                { false && "Automatic descriptions and pricing for selling clothes." }
              </Text>
              <Space px="15px" />
              <div data-tooltip-id="customComponentTooltip">
                <Text color="dark-gray" weight={400} size="16px">
                  Add a photo and Resell will do the rest. <img src={process.env.PUBLIC_URL + "assets/info.png"} style={{ height: "16px", width: "16px" }}></img>
                </Text>
              </div>
                <Tooltip id="customComponentTooltip" place={ isPortrait ? "bottom" : "right" } style={{ maxWidth: "200px", whiteSpace: "pre-wrap", zIndex: 4000 }}>
                 Resell uses cutting-edge AI models to generate everything you need to sell clothes online (description, price, and over 15 more fields). Just upload a photo of your item and click "Generate" to get started.
                </Tooltip>
            </Spacer>
            <Space px="32px" />
            { !image && (
              <PhotoOptions userId={user?.userId} setImage={setImage} setFileType={setFileType} />
            )}
            { image && (
              <>
                <PhotoAndDelete imageUrl={URL.createObjectURL(image)} onDelete={() => setImage(null)} />
                <Space px="32px" />
                <PhotoInput setBrand={setBrand} isRare={isRare} setIsRare={setIsRare} />
                <Space px="40px" />
                <Spacer gap={0}>
                  <WideButton onClick={generate} color="blue" text="Generate" />
                </Spacer>
                <Space px="24px" />
                <Text color="light-gray" weight={400} size="14px">
                  { user?.subscriptionTier != "Plus" && (
                    <div style={{ display: 'inline' }}>
                      You have {user?.generationsLeft ?? "3"}x free generations left. 
                      <div
                        style={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        { !user?.email && (
                          <Login setUser={setUser} onSuccess={() => navigate("/profile")}>
                            Need more? Buy credits
                          </Login>
                        )}
                        { user?.email && (
                          <div onClick={() => navigate("/profile")}>
                            Need more? Buy credits
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Text>
                <Space px="100px" />
              </>
            )}
          </div>
        </Spacer>
      )}
      { status == Status.GENERATING && (
        <Spacer gap={0}>
          <div style={{ maxWidth: "min(80vw, 560px)" }}>
            <Space px="25vh" />
            <LoadingSpinner />
            <Space px="24px" />
            <Text color="light-gray" size="16px" weight={400}>
              {secondsElapsed < 30 && 
                "We’re generating the information for this product. Hold tight, it shouldn’t take longer than 30s. If it does, refresh the page and try again."
              }
              { secondsElapsed >= 30 && 
                "Hmm, our backend seems to be taking a while. Feel free to keep waiting, but you might wanna reload and try again."
              }
            </Text>
            <Text color="light-gray" size="16px" weight={400}>
              Time elapsed: {secondsElapsed}s
            </Text>
          </div>
        </Spacer>
      )}
      { status == Status.LOGIN && (
        <Spacer gap={0}>
          <div style={{ maxWidth: "min(80vw, 560px)" }}>
            <Space px="28px" />
            <Spacer gap={20}>
              <Text color="light-gray" size="16px" weight={400}>
                Your generation is ready! To view it, sign in with Google.
              </Text>
              <Login setUser={setUser} onSuccess={() => {
                if (user?.generationsLeft && user?.generationsLeft <= 0 && user?.subscriptionTier != "Plus") setStatus(Status.GENERATIONS_EXCEEDED);
                else setStatus(Status.POST_GENERATION);
              }}>
                <WideButton color="blue" text="Log in" />
              </Login>
            </Spacer>
          </div>
        </Spacer>
      )}
      { status == Status.GENERATIONS_EXCEEDED && (
        <Spacer gap={0}>
          <div style={{ maxWidth: "min(80vw, 560px)" }}>
            <Space px="28px" />
            <Text color="light-gray" size="16px" weight={400}>
              You’re out of generations. To continue generating descriptions, please <div style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/profile")}>subscribe to a cheap plan</div>.
            </Text>
          </div>
        </Spacer>
      )}
      { status == Status.POST_GENERATION && (
        <div>
          <Space px="40px" />
          <DisplayGeneration generation={generation} user={user} setStatus={setStatus}/>
          <Space px="100px" />
        </div>
      )}
      <BottomBar setPrivacyModalOpen={setPrivacyModalOpen} setTermsModalOpen={setTermsModalOpen} />
      <TermsModal setModalOpen={setTermsModalOpen} modalOpen={termsModalOpen} />
      <PrivacyModal setModalOpen={setPrivacyModalOpen} modalOpen={privacyModalOpen} />
      <FeedbackModal setModalOpen={setFeedbackModalOpen} modalOpen={feedbackModalOpen} setSuccessMessage={setSuccessMessage} />
      <ToastContainer />
      <Analytics />
    </>
  )
};

export default LandingPage;
