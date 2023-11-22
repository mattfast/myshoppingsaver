import React, { useState, useRef, useEffect } from "react";

import Text from "./base/Text";
import Spacer from "./base/Spacer";
import "./Modal.css";

const TermsModal = ({ setModalOpen, modalOpen }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = document.getElementById("termsModal");
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
    <div id="termsModal" className="modal">
      <div ref={containerRef} className="modalContent" style={{
        maxHeight: "50vh",
        overflowY: "scroll"
      }}>
        <Spacer gap={10} align="left">
        <Text color="black" size="16px" weight={400} align="left">
          Terms of Service for Resell:
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Last Updated: November 18, 2023
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          1. Acceptance of Terms
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          By accessing or using Resell, you agree to be bound by these terms of service ("Terms"). If you do not agree to these terms, you may not use our service.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          2. Description of Service
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Resell provides an AI-powered service that automatically labels pictures of clothing uploaded by users. This service is provided "as is" and is subject to change or termination without notice.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          3. User Responsibilities
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Account Registration: You may be required to register an account to use certain features of our service.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Content Upload: You agree to only upload images that you have the right to use and that do not infringe on any third party's rights.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Acceptable Use: You must not use our service for any unlawful purposes or in any way that could damage, disable, or impair our service.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          4. Intellectual Property Rights
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Your Content: You retain all rights to the images you upload but grant us a license to use them for providing and improving our service.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Our Service: We (or our licensors) retain all rights to our service, including all related intellectual property.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          5. Privacy
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Your privacy is important to us. Please review our Privacy Statement to understand how we collect, use, and share your information.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          6. No Warranties
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Our service is provided "as is," and we make no warranties, expressed or implied, regarding the accuracy, reliability, or functionality of our AI labeling service.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          7. Limitation of Liability
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          Resell shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use our service.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          8. Modifications to Terms
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          We reserve the right to modify these Terms at any time. We will notify users of any changes by updating the date at the top of these Terms.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          9. Governing Law
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          These Terms shall be governed by the laws of the State of California, United States, without regard to its conflict of law principles.
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          10. Contact Us
        </Text>
        <Text color="black" size="16px" weight={400} align="left">
          For any questions or concerns about these Terms, please contact us at matthew@milk-ai.com.
        </Text>
        </Spacer>
      </div>
    </div>
  )
};

export default TermsModal;
