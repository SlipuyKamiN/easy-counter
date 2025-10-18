import { useState, useRef } from "react";

export const useAPI = (method) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const abortControllerRef = useRef(null);
  const isPendingRef = useRef(false); // блокування повторних викликів

  const dispatch = async (payload) => {
    // блокуємо новий запит, якщо попередній ще не завершився
    if (isPendingRef.current) return;

    // відміняємо попередній запит
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    isPendingRef.current = true;

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await method(payload, { signal: controller.signal });

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
      // axios abort видає CanceledError
      if (error.name === "CanceledError" || error.name === "AbortError") return;

      setData({ message: error.message, status: error.status });
      setIsError(true);
    } finally {
      setIsLoading(false);
      isPendingRef.current = false;
    }
  };

  return [dispatch, data, isLoading, isError];
};
