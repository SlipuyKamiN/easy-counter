import { useState } from "react";

export const useAPI = (method) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = async (payload) => {
    setIsLoading(true);
    setIsError(false);
    setData(null);

    try {
      const response = await method(payload);

      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
        setIsError(false);
      } else {
        setData({
          message: response.statusText || "Unknown error",
          status: response.status,
        });
        setIsError(true);
      }
    } catch (error) {
      setData({ message: error.message, status: error.status });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [dispatch, data, isLoading, isError];
};
