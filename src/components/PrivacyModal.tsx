import React, { useState, useRef, useEffect } from "react";

import Text from "./base/Text";
import Spacer from "./base/Spacer";
import "./Modal.css";

const PrivacyModal = ({ setModalOpen, modalOpen }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = document.getElementById("privacyModal");
    if (modalOpen) {
      if (modal) modal.style.display = "flex";
    } else {
      if (modal) modal.style.display = "none";
    }
  }, [modalOpen])

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current !== null) {
        let containsElement = e.composedPath().includes(containerRef.current as EventTarget);
        if (!containsElement) {
            setModalOpen(false);
            // setClosable(false);
        }
      }
    }

    let timer;
    if (modalOpen) {
      timer = setTimeout(() => {
          window.addEventListener('click', handleClickOutside);
      }, 10);
    }
    return () => {
      clearTimeout(timer); // Ensure to clear the timeout if component unmounts before timeout completes.
      window.removeEventListener('click', handleClickOutside);
    };
}, [modalOpen]);
 
  return (
    <div id="privacyModal" className="modal">
      <div ref={containerRef} className="modalContent" style={{
        maxHeight: "50vh",
        overflowY: "scroll"
      }}>
        <Spacer gap={10} align="left">
        <Text color="black" size="16px" weight={400} align="left">
        Privacy Statement for Resell:
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Last Updated: November 18, 2023
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          1. Introduction
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Welcome to reselltool.com. We are committed to protecting your privacy and ensuring the security of the information you provide to us. This privacy statement explains how we collect, use, and share information in connection with our AI-powered clothing labeling service.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          2. Information We Collect
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          We collect and process the following types of information:
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Images Submitted: We collect images of clothing that you upload to our service for labeling.
          User Data: This includes your email address, username, and any other information you provide during registration or use of our service.
          Usage Data: Information on how you interact with our website, such as the types of clothing you upload, frequency of use, and preferences.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          3. How We Use Your Information
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          To Provide Our Service: To automatically label your clothing images using our AI technology.
          To Improve Our Service: We analyze usage patterns and feedback to enhance our AI algorithms and user experience.
          Communication: We may use your contact information to send service-related notices and promotional messages, subject to your consent.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          4. Sharing of Information
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          We do not sell or rent your personal data. Information may be shared with:
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Service Providers: Companies that assist us in running our service and improving our AI algorithms, bound by confidentiality agreements.
          Legal Obligations: When required by law or to protect our rights, we may disclose your information to authorities.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          5. Data Storage and Security
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          We implement robust security measures to protect your data. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          6. Your Rights
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing activities.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          7. International Transfers
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Your information may be transferred to and processed in countries outside of your jurisdiction, where data protection laws may differ.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          8. Children's Privacy
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Our service is not intended for individuals under the age of 18. We do not knowingly collect information from children.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          9. Changes to This Privacy Statement
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          We may update this privacy statement. We will notify you of any changes by posting the new privacy statement on this page.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          10. Contact Us
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          If you have any questions about this privacy statement, please contact us at matthew@milk-ai.com.
        </Text>
        </Spacer>
      </div>
    </div>
  )
};

export default PrivacyModal;
