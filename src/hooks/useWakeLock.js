import { useEffect, useRef } from "react";

export const useWakeLock = () => {
  const wakeLock = useRef(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLock.current = await navigator.wakeLock.request("screen");
          console.log("Wake lock activated");
        } else {
          console.warn("Wake Lock API not supported in this browser");
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    requestWakeLock();

    const handleVisibilityChange = () => {
      if (wakeLock.current !== null && document.visibilityState === "visible") {
        requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      wakeLock.current?.release().then(() => {
        wakeLock.current = null;
        console.log("Wake lock released");
      });
    };
  }, []);
};

export default useWakeLock;
