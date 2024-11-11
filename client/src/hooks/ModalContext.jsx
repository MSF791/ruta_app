import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const openModalLoad = () => setLoading(true);
  const closeModalLoad = () => setLoading(false);

  const openModalSuccess = () => setSuccess(true);
  const closeModalSuccess = () => setSuccess(false);

  const openModalFail = (message) => {
    setFailMessage(message);
    setFail(true);
  };
  const closeModalFail = () => {
    setFail(false);  // Esto debe cerrar el modal
  };

  return (
    <ModalContext.Provider
      value={{
        loading,
        success,
        fail,
        failMessage,
        openModalLoad,
        closeModalLoad,
        openModalSuccess,
        closeModalSuccess,
        openModalFail,
        closeModalFail,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
