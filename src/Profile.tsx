import React, { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Analytics } from '@vercel/analytics/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spacer from "./components/base/Spacer";
import Space from "./components/base/Space";
import Text from "./components/base/Text";
import { convertTimestampToDateStr } from "./utils";
import "./LandingPage.css";

import AppHeader from "./components/AppHeader";
import WideButton from "./components/WideButton";
import BottomBar from "./components/BottomBar";
import PaymentOption from "./components/PaymentOption";
import Divider from "./components/base/Divider";
import TextWithBorder from "./components/TextWithBorder";
import PrivacyModal from "./components/PrivacyModal";
import TermsModal from "./components/TermsModal";
import DeleteModal from "./components/DeleteModal";
import FeedbackModal from "./components/FeedbackModal";
import { UserType } from "./LandingPage";

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const [user, setUser] = useState<UserType | null>(null);
  const [maxGenerations, setMaxGenerations] = useState<string>("3");
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [termsModalOpen, setTermsModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<ReactNode | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);
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
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        closeOnClick: true,
        autoClose: false,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }, [successMessage])

  useEffect(() => {
    async function createOrRetrieveUser() {
      if (cookies['user-id']) {
        const response = await fetch(`${process.env.REACT_APP_BE_URL}/retrieve-user`, {
          method: "GET",
          headers: {
            'auth-token': cookies['user-id'],
          }
        })
        if (response.status !== 200) navigate("/");
        const respJson = await response.json();
        setUser({
          userId: respJson["user_id"],
          email: respJson["email"] ?? undefined,
          subscriptionTier: respJson["subscription_tier"] ?? undefined,
          generationsLeft: respJson["generations_left"] ?? undefined,
          subscriptionExpires: respJson["subscription_expires"] ?? undefined
        });
      } else {
        navigate("/");
      }
    }
    
    createOrRetrieveUser();
  }, [cookies])

  useEffect(() => {
    if (user?.subscriptionTier == "Free") setMaxGenerations("3");
    else if (user?.subscriptionTier == "Standard") setMaxGenerations("50");
    else if (user?.subscriptionTier == "Plus") setMaxGenerations("∞");
  }, [user])

  useEffect(() => {
    if (user?.subscriptionExpires) {
      setExpiryDate(convertTimestampToDateStr(user?.subscriptionExpires))
    }
  }, [user])

  console.log(user);
 
  return (
    <>
      <AppHeader user={user} setUser={setUser} setFeedbackModalOpen={setFeedbackModalOpen} isPortrait={isPortrait}/>
      <Space px="40px" />
      <Spacer gap={0}>
        <div style={{ width: "min(80vw, 560px)"}}>
          <Spacer gap={40}>
            <Spacer gap={9}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <Text color="light-gray" weight={500} size="14px">
                  LINKED EMAIL
                </Text>
              </div>
              <TextWithBorder color="dark-gray" weight={400} size={18}>
                {user?.email}
              </TextWithBorder>
            </Spacer>
            <Spacer gap={9}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <Text color="light-gray" weight={500} size="14px">
                  PLANS
                </Text>
                <Text color="light-gray" weight={500} size="14px">
                  {user?.subscriptionTier != "Plus" && `${user?.generationsLeft}/`}{maxGenerations}{user?.subscriptionTier == "Free" && " free" } generations left
                </Text>
              </div>
              <PaymentOption name="Free" currentPlan={user?.subscriptionTier} generations={3} price={0} expiring={expiryDate} />
              <PaymentOption name="Standard" currentPlan={user?.subscriptionTier} generations={50} price={4.99} expiring={expiryDate} />
              <PaymentOption name="Plus" currentPlan={user?.subscriptionTier} generations="Unlimited" price={8.99} expiring={expiryDate} />
              { expiryDate && <Text color="red" weight={400} size="14px">Your subscription will expire on {expiryDate}. Please click above to renew and not lose access!</Text>}
            </Spacer>
            <Divider />
            <Spacer gap={25}>
              <WideButton onClick={() => {
                removeCookie('user-id');
                navigate("/");
              }} color="light-blue" text="Log Out" />
              <WideButton onClick={() => setDeleteModalOpen(true)} color="red" text="Delete Account" />
            </Spacer>
          </Spacer>
        </div>
        <Space px="100px" />
      </Spacer>
      <BottomBar setPrivacyModalOpen={setPrivacyModalOpen} setTermsModalOpen={setTermsModalOpen} />
      <DeleteModal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} />
      <PrivacyModal modalOpen={privacyModalOpen} setModalOpen={setPrivacyModalOpen} />
      <TermsModal modalOpen={termsModalOpen} setModalOpen={setTermsModalOpen} />
      <FeedbackModal modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} setSuccessMessage={setSuccessMessage} />
      <Analytics />
    </>
  )
};

export default Profile;
