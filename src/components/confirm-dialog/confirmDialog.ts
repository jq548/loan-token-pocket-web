import { useState } from 'react';

export const useDialog = (initialMessage = '', initialStatus = 'success') => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [status, setStatus] = useState(initialStatus);

  const openDialog = (msg: string, statusType = 'success') => {
    setMessage(msg);
    setStatus(statusType);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return { isOpen, message, status, openDialog, closeDialog };
};
