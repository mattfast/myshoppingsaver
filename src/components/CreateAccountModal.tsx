import React, { useState, useRef, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';

import "@fontsource/rubik";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";
import "@fontsource/figtree";
import "@fontsource/figtree/600.css";
import "./CreateAccountModal.css";

const CreateAccountModal = ({ closeModal, modalOpen, onSuccess }: {
  closeModal: () => void,
  modalOpen: boolean,
  onSuccess: (e: string) => void,
}) => {
  const [closable, setClosable] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = document.getElementById("modal");
    if (modalOpen) {
      if (modal) modal.style.display = "flex";
    } else {
      if (modal) modal.style.display = "none";
    }
  }, [modalOpen])

  useEffect(() => {
    setModalClose();
  }, [modalOpen])

  const setModalClose = async () => {
    if (modalOpen) {
      await new Promise(r => setTimeout(r, 200));
      setClosable(true);
    } else {
      setClosable(false);
    }
  }

  window.addEventListener('click', function(e) {
    if (containerRef !== null) {
      let containsElement = e.composedPath().includes(containerRef.current as EventTarget);
      //let containsButton = e.composedPath().includes(buttonRef.current as EventTarget);
      if (!containsElement && closable) {
        closeModal();
        setClosable(false);
      }
    }
  });
 
  return (
    <div id="modal" className="modal">
      <div ref={containerRef} className="modalContent">
        <GoogleLogin 
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  )
};

export default CreateAccountModal;
