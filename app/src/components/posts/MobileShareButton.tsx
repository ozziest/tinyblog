import { useEffect, useRef, useState } from "react";
import { CloseIcon, ShareIcon } from "../Icons";
import { Props } from "./ShareInput";
import Avatar from "../user/Avatar";
import LexicalEditor from "../inputs/LexicalEditor";
import useAuthStore from "@/stores/authStore";
import { IPostApi } from "@/types/ApiTypes";
import ShouldLoginWarning from "../inputs/ShouldLoginWarning";
import classNames from "classnames";

const MobileShareButton = ({
  initialState = undefined,
  store,
  parent,
  onShared,
}: Props) => {
  const authStore = useAuthStore();
  const [isModalOpen, setModelOpen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = authStore.state.isLoggedIn;

  const handleShared = (post: IPostApi) => {
    setModelOpen(false);
    if (onShared) {
      onShared(post);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(event.target as Node)
    ) {
      setModelOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed md:hidden bottom-[100px] right-4 z-40 bg-indigo-900 text-white rounded-full p-4"
        onClick={() => setModelOpen(true)}
      >
        <ShareIcon size={28} />
      </button>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              ref={modalContainerRef}
              className={classNames(
                "bg-white w-11/12 md:w-full max-w-xl rounded-lg shadow-lg relative flex flex-col gap-2",
                { "p-4 pb-3": isLoggedIn },
                { "p-0": !isLoggedIn },
              )}
            >
              {isLoggedIn && (
                <>
                  <div className="font-semibold text-neutral-700 flex gap-2 items-center">
                    <Avatar src={authStore.state.user.avatar} size="sm" />
                    <div className="flex-grow">Share new post!</div>
                    <button type="button" onClick={() => setModelOpen(false)}>
                      <CloseIcon />
                    </button>
                  </div>

                  <div className="flex-grow">
                    <LexicalEditor
                      store={store}
                      parent={parent}
                      onShared={handleShared}
                      initialState={initialState}
                      initialLocation={authStore.state.user.location || "WW"}
                    />
                  </div>
                </>
              )}
              {!isLoggedIn && <ShouldLoginWarning />}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default MobileShareButton;
