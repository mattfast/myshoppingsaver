import React, { useState, useRef, useEffect } from "react";
import { useCookies } from 'react-cookie';

import Text from "./base/Text";
import Spacer from "./base/Spacer";
import "./Modal.css";
import OptionButton from "./OptionButton";

const FeedbackModal = ({ setModalOpen, modalOpen, setSuccessMessage }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const [feedback, setFeedback] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = document.getElementById("feedbackModal");
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

  const onClick = async () => {
    await fetch(`${process.env.REACT_APP_BE_URL}/feedback`, {
      method: "POST",
      headers: {
        'auth-token': cookies['user-id'],
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        feedback: feedback
      })
    });

    setSuccessMessage("Thank you for your feedback! We appreciate it, and we'll reach out if we have any follow-up questions.");
  }

 
  return (
    <div id="feedbackModal" className="modal">
      <div ref={containerRef} className="modalContent" style={{
        maxHeight: "50vh",
        overflowY: "scroll"
      }}>
        <Spacer gap={10} align="left">
          <Text color="black" size="16px" weight={400} align="left">
            We'd love to hear your feedback! Tell us all about features you like, don't like, and ones you want to see :)
          </Text>
          <textarea style={{
            height: '3em',
            overflowY: 'scroll'
          }} onChange={e => setFeedback(e.currentTarget.value)}/>
          <div style={{ cursor: 'pointer'}}>
            <OptionButton onClick={onClick} text="Submit" />
          </div>
        </Spacer>
      </div>
    </div>
  )
};

export default FeedbackModal;
