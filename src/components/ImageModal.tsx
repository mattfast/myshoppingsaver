import React from 'react';
import './ImageModal.css';

const ImageModal = ({ imageSrc, showModal, setShowModal }) => {
  return (
    showModal && (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <img src={imageSrc} alt="modal" className="modal-image" />
      </div>
    )
  );
};

export default ImageModal;
