import { useState } from "react";
import { useParams } from "react-router-dom";
import { filterPast } from "~/helpers/dashboard";

export const useAPI = (method) => {
  const { user } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = async (payload) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await method(payload);

      if (response.status >= 200 && response.status < 300) {
        const data = response.data.length
          ? response.data
              .filter(({ users }) => users?.includes(user))
              .map((item) => ({
                ...item,
                nextTour: filterPast(item.nextTour),
              }))
          : response.data;

        setData(data);
        setIsError(false);
      } else {
        setData({
          message: response.statusText || "Unknown error",
          status: response.status,
        });
        setIsError(true);
      }
    } catch (error) {
      console.warn(error);

      if (error.name === "CanceledError" || error.name === "AbortError") return;

      setData({ message: error.message, status: error.status });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [dispatch, data, isLoading, isError];
};
