import { useEffect, useState } from "react";
import { MessageTypes } from "@/enums";

const LoadingModal = () => {
  const [loading, setLoading] = useState(false);

  const handleMessage = (event: Event) => {
    setLoading((event as CustomEvent).detail.status);
  };

  useEffect(() => {
    window.addEventListener(MessageTypes.Loading, handleMessage);
    return () =>
      window.removeEventListener(MessageTypes.Loading, handleMessage);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-20 py-10 rounded-lg shadow-lg relative">
            <div className="w-8 h-8 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingModal;
