import { useEffect, useState } from "react";
import { MessageTypes } from "../../enums";
import Button from "../inputs/Button";
import { SuccessIcon } from "../Icons";

const SuccessMessage = () => {
  const [message, setMessage] = useState<string | undefined>();

  const handleMessage = (event: Event) => {
    setMessage((event as CustomEvent).detail.message);
  };

  useEffect(() => {
    window.addEventListener(MessageTypes.SimpleSuccess, handleMessage);
    return () =>
      window.removeEventListener(MessageTypes.SimpleSuccess, handleMessage);
  }, []);

  return (
    <>
      {message && (
        <div className="fixed left-0 top-0 w-full h-full flex justify-center items-center transition-all duration-500">
          <div className="w-[400px] bg-white z-10 px-5 py-10 rounded flex flex-col">
            <div className="flex justify-center text-green-700">
              <SuccessIcon />
            </div>
            <div className="text-center text-neutral-800 py-6">{message}</div>
            <div className="flex justify-center">
              <Button onClick={() => setMessage(undefined)}>Close</Button>
            </div>
          </div>
          <div className="fixed left-0 top-0 w-full h-full bg-black opacity-40"></div>
        </div>
      )}
    </>
  );
};

export default SuccessMessage;
