import React, { useState, useRef, useEffect } from "react";
import { useCookies } from 'react-cookie';

import Text from "./base/Text";
import WideButton from "./WideButton";
import "./Modal.css";

const DeleteModal = ({ setModalOpen, modalOpen }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const [page, setPage] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = document.getElementById("deleteModal");
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

const deleteAccount = async () => {
  const response = await fetch(`${process.env.REACT_APP_BE_URL}/delete-user`, {
    method: "POST",
    headers: {
      'auth-token': cookies['user-id'],
    },
  });

}
 
  return (
    <div id="deleteModal" className="modal">
      <div ref={containerRef} className="modalContent">
        <Text color="red" size="30px" weight={600}>
          Are you sure you want to delete your account?
        </Text>
        <Text color="black" size="16px" weight={600}>
          Your subscription and all your data will be removed.
        </Text>
        <WideButton onClick={deleteAccount} color="red" text="Delete Account" small={true} />
      </div>
    </div>
  )
};

export default DeleteModal;
