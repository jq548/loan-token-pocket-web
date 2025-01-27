import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const openLoading = () => {
    setIsLoading(true);
  };

  const closeLoading = () => {
    setIsLoading(false);
  };

  return { isLoading, openLoading, closeLoading };
};
